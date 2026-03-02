import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import webPush from "web-push";
import { sql } from "@vercel/postgres";
import { ClerkExpressWithAuth, LooseAuthProp, clerkClient } from "@clerk/clerk-sdk-node";
import { IUser, IMemory, IWeeklySummary, IPushSubscription, IDailyCheckIn } from "./models";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Add Clerk Authentication Middleware
app.use(ClerkExpressWithAuth());

const AGENTS_BASE = process.env.AGENTS_BASE || "http://localhost:8000";
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    "mailto:founder@innerloop.ai",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
}

// Middleware to ensure user exists in our DB and attach id
async function ensureUser(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  const clerkId = req.auth?.userId;
  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if user exists, if not, create them
    const { rows } = await sql`SELECT id FROM users WHERE id = ${clerkId}`;
    if (rows.length === 0) {
      // Fetch user details from Clerk to get the email
      const clerkUser = await clerkClient.users.getUser(clerkId);
      const email = clerkUser.emailAddresses[0]?.emailAddress || "unknown@clerk.user";

      await sql`INSERT INTO users (id, email, subscription_status) VALUES (${clerkId}, ${email}, 'free')`;
      console.log(`Synced new user: ${email} (${clerkId})`);
    }
    req.userId = clerkId;
    next();
  } catch (err) {
    console.error("DB Error in ensureUser", err);
    res.status(500).json({ message: "Database error" });
  }
}

app.post("/api/auth/upgrade", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  await sql`UPDATE users SET subscription_status = 'pro' WHERE id = ${userId}`;
  res.json({ ok: true, subscriptionStatus: "pro" });
});

// Save push subscription
app.post("/api/push/subscribe", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const sub = req.body;
  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
    return res.status(400).json({ message: "Invalid subscription" });
  }

  await sql`
    INSERT INTO push_subscriptions (endpoint, user_id, p256dh, auth)
    VALUES (${sub.endpoint}, ${userId}, ${sub.keys.p256dh}, ${sub.keys.auth})
    ON CONFLICT (endpoint) DO UPDATE SET user_id = ${userId}, p256dh = ${sub.keys.p256dh}, auth = ${sub.keys.auth}
  `;

  res.json({ ok: true, vapidPublicKey: VAPID_PUBLIC_KEY || null });
});

// Daily check-in endpoints
app.get("/api/daily", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const { rows } = await sql`SELECT * FROM daily_checkins WHERE user_id = ${userId} AND date = ${today}`;
  const record = rows[0];
  res.json({
    date: today,
    morningText: record?.morning_text || "",
    eveningText: record?.evening_text || "",
    sessionsCount: record?.sessions_count || 0
  });
});

app.post("/api/daily/morning", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const { text } = req.body || {};
  await sql`
    INSERT INTO daily_checkins (user_id, date, morning_text)
    VALUES (${userId}, ${today}, ${text ?? ""})
    ON CONFLICT (user_id, date) DO UPDATE SET morning_text = ${text ?? ""}
  `;
  res.json({ ok: true });
});

app.post("/api/daily/evening", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const { text } = req.body || {};
  await sql`
    INSERT INTO daily_checkins (user_id, date, evening_text)
    VALUES (${userId}, ${today}, ${text ?? ""})
    ON CONFLICT (user_id, date) DO UPDATE SET evening_text = ${text ?? ""}
  `;
  res.json({ ok: true });
});

app.post("/api/voice", ensureUser, async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ message: "Text required" });
  try {
    const userId = (req as any).userId;
    const today = new Date().toISOString().slice(0, 10);

    const userRes = await sql`SELECT subscription_status FROM users WHERE id = ${userId}`;
    const user = userRes.rows[0];

    const dailyRes = await sql`SELECT sessions_count FROM daily_checkins WHERE user_id = ${userId} AND date = ${today}`;
    const currentSessions = dailyRes.rows[0]?.sessions_count || 0;

    if (user?.subscription_status === "free" && currentSessions >= 3) {
      return res.status(403).json({
        message: "Daily limit reached for free tier. Please upgrade to continue.",
        code: "LIMIT_REACHED"
      });
    }

    await sql`
      INSERT INTO daily_checkins (user_id, date, sessions_count)
      VALUES (${userId}, ${today}, 1)
      ON CONFLICT (user_id, date) DO UPDATE SET sessions_count = daily_checkins.sessions_count + 1
    `;

    const memoryRes = await sql`
      SELECT text, category, created_at FROM memories 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 20
    `;

    const payload = {
      text,
      memories: memoryRes.rows.map((m) => ({
        text: m.text,
        category: m.category,
        createdAt: m.created_at
      }))
    };

    const response = await axios.post(`${AGENTS_BASE}/reflect`, payload);
    res.json(response.data);
  } catch (err) {
    console.error("Agent error", err);
    res.status(500).json({ message: "AI unavailable" });
  }
});

app.get("/api/memories", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const { rows } = await sql`SELECT * FROM memories WHERE user_id = ${userId} ORDER BY created_at DESC`;
  res.json({
    memories: rows.map((m) => ({
      id: m.id,
      text: m.text,
      category: m.category,
      createdAt: m.created_at
    }))
  });
});

app.post("/api/memories", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const { text, category } = req.body || {};
  if (!text || !category) return res.status(400).json({ message: "Invalid memory" });
  const { rows } = await sql`
    INSERT INTO memories (user_id, text, category) 
    VALUES (${userId}, ${text}, ${category}) 
    RETURNING id
  `;
  res.json({ id: rows[0].id });
});

app.delete("/api/memories/:id", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  await sql`DELETE FROM memories WHERE id = ${id} AND user_id = ${userId}`;
  res.json({ ok: true });
});

app.get("/api/summaries", ensureUser, async (req, res) => {
  const userId = (req as any).userId;
  const { rows } = await sql`
    SELECT * FROM weekly_summaries 
    WHERE user_id = ${userId} 
    ORDER BY week_start DESC 
    LIMIT 4
  `;
  res.json({
    summaries: rows.map((s) => ({
      id: s.id,
      weekStart: s.week_start,
      text: s.text,
      score: s.score
    }))
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Gateway running on http://localhost:${port}`);
});

