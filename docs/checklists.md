# InnerLoop.ai Strategic Checklists

This document contains the essential checklists required to move InnerLoop from a local dev project to a revenue-generating production product.

---

## 🚀 LAUNCH_CHECKLIST
- [ ] **Custom Domain:** Connect `innerloop.ai` (or similar) to Vercel.
- [ ] **SSL/HTTPS:** Verify certificates are active for both Gateway and Frontend.
- [ ] **Legal:** Add Privacy Policy and Terms of Service (required for Clerk and Stripe).
- [ ] **Analytics:** Integrate Plausible or PostHog (privacy-focused) to track landing page conversions.
- [ ] **Error Tracking:** Set up Sentry for both Frontend and Backend to catch production bugs.

---

## 🏗️ PRODUCTION_CHECKLIST
- [ ] **Environment Variables:** Move all keys from `.env` to Vercel/Railway Dashboard.
- [ ] **Database Backups:** Enable automated daily snapshots for Vercel Postgres.
- [ ] **Rate Limiting:** Implement Express rate-limiting on the Gateway to prevent API abuse.
- [ ] **CORS:** Restrict Gateway CORS settings to only allow your production domain.
- [ ] **Clerk Production Mode:** Switch Clerk from "Development" to "Production" instance.

---

## ⚡ EXECUTION_CHECKLIST
- [ ] **Content Calendar:** Prepare 45 days of social media posts (see GTM Roadmap).
- [ ] **Beta Feedback Hub:** Set up a Discord or Slack for early adopters.
- [ ] **Daily Dash:** Monitor Vercel logs and OpenAI usage daily for the first 2 weeks.
- [ ] **Outreach:** Send 5 personalized DMs every morning to potential power users.
- [ ] **Iterate:** Ship one small improvement or bug fix every 24-48 hours.

---

## 🆕 MVP_LAUNCH_CHECKLIST
- [ ] **Core Loop:** Verify Voice -> Reflection -> Memory flow works 100% of the time.
- [ ] **Payments:** Integrate Stripe for the "Pro" tier (limit free users to 3 reflections).
- [ ] **Email Capture:** Set up a "Waitlist" or "Newsletter" for people not ready to sign up.
- [ ] **Onboarding:** Add a simple 3-step tour for first-time users.
- [ ] **Social Proof:** Place beta testimonials prominently on the landing page.

---

## ✅ READY_CHECKLIST
- [ ] **Mobile Performance:** Verify PWA works smoothly on iOS/Android Chrome.
- [ ] **Database Migrations:** All `schema.sql` changes are applied to production.
- [ ] **OpenAI Credits:** Ensure prepaid balance is sufficient for launch traffic.
- [ ] **Support Email:** Create `support@innerloop.ai`.
- [ ] **Final Walkthrough:** Perform one full reflection cycle as a "New User" in production.
