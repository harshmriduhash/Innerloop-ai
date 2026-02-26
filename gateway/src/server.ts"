import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import webPush from "web-push";
import { Memory, User, WeeklySummary, PushSubscription, DailyCheckIn } from "./models";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/innerloop";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const AGENTS_BASE = process.env.AGENTS_BASE || "http://localhost:8000";
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    "mailto:founder@innerloop.ai",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error", err));

function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    (req as any).userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

app.post("/api/auth/logout", (_req, res) => {
  res.json({ ok: true });
});

// Save push subscription for notifications
app.post("/api/push/subscribe", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const sub = req.body;
  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
    return res.status(400).json({ message: "Invalid subscription" });
  }

  await PushSubscription.updateOne(
    { endpoint: sub.endpoint },
    {
      userId,
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth
      }
    },
    { upsert: true }
  );

  res.json({ ok: true, vapidPublicKey: VAPID_PUBLIC_KEY || null });
});

// Daily check-in endpoints
app.get("/api/daily", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const record = await DailyCheckIn.findOne({ userId, date: today });
  res.json({
    date: today,
    morningText: record?.morningText || "",
    eveningText: record?.eveningText || "",
    sessionsCount: record?.sessionsCount || 0
  });
});

app.post("/api/daily/morning", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const { text } = req.body || {};
  const record = await DailyCheckIn.findOneAndUpdate(
    { userId, date: today },
    { $set: { morningText: text ?? "" }, $setOnInsert: { sessionsCount: 0 } },
    { new: true, upsert: true }
  );
  res.json({ ok: true, record });
});

app.post("/api/daily/evening", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const today = new Date().toISOString().slice(0, 10);
  const { text } = req.body || {};
  const record = await DailyCheckIn.findOneAndUpdate(
    { userId, date: today },
    { $set: { eveningText: text ?? "" }, $setOnInsert: { sessionsCount: 0 } },
    { new: true, upsert: true }
  );
  res.json({ ok: true, record });
});


app.post("/api/voice", authMiddleware, async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ message: "Text required" });
  try {
    const userId = (req as any).userId;
    const today = new Date().toISOString().slice(0, 10);
    await DailyCheckIn.findOneAndUpdate(
      { userId, date: today },
      { $inc: { sessionsCount: 1 } },
      { upsert: true, new: true }
    );
    const memories = await Memory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    const payload = {
      text,
      memories: memories.map((m) => ({
        text: m.text,
        category: m.category,
        createdAt: m.createdAt
      }))
    };

    const response = await axios.post(`${AGENTS_BASE}/reflect`, payload);
    res.json(response.data);
  } catch (err) {
    console.error("Agent error", err);
    res.status(500).json({ message: "AI unavailable" });
  }
});

app.get("/api/memories", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const memories = await Memory.find({ userId }).sort({ createdAt: -1 });
  res.json({
    memories: memories.map((m) => ({
      id: m.id,
      text: m.text,
      category: m.category,
      createdAt: m.createdAt
    }))
  });
});

app.post("/api/memories", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const { text, category } = req.body || {};
  if (!text || !category) return res.status(400).json({ message: "Invalid memory" });
  const m = await Memory.create({ userId, text, category });
  res.json({ id: m.id });
});

app.delete("/api/memories/:id", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  await Memory.deleteOne({ _id: id, userId });
  res.json({ ok: true });
});

app.get("/api/summaries", authMiddleware, async (req, res) => {
  const userId = (req as any).userId;
  const items = await WeeklySummary.find({ userId }).sort({ weekStart: -1 }).limit(4);
  res.json({
    summaries: items.map((s) => ({
      id: s.id,
      weekStart: s.weekStart,
      text: s.text,
      score: s.score
    }))
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Gateway running on http://localhost:${port}`);
});

