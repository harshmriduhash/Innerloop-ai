InnerLoop.ai – Full MVP
=======================

This repository contains the MVP implementation of **InnerLoop.ai** – a voice‑first, agentic AI companion with long‑term memory, built as a real B2C SaaS web application.

It includes:
- Marketing site (landing, features, pricing, blog, contact, legal)
- Auth (email + password), JWT, basic account views
- App shell with voice sessions, memory timeline, and weekly summary
- AI agents service (reflection + memory detection, pluggable with OpenAI)
- MongoDB persistence via Node.js gateway

## Product at a glance

- **What problem does it solve?**  
  Thinking, decisions, and emotions are fragmented across tools and have no continuity; current AI tools forget users, hallucinate, and give generic advice.

- **How does InnerLoop solve it?**  
  By offering a **voice-first, memory‑aware companion** that remembers only what you explicitly approve, organizes it into decisions/emotions/goals, and reflects your thinking back through daily sessions and weekly summaries.

- **Does it save time?**  
  Yes. Instead of re‑explaining context or re‑thinking the same decisions, InnerLoop reuses your own approved memory and surfaces patterns, shortening “catch‑up” time in each reflection session.

- **Does it save or justify money?**  
  For users, it can be a lower‑cost, always‑available alternative to ad‑hoc coaching/therapy‑adjacent sessions, and it reduces the need for juggling multiple journaling and note tools. For you, the stack is lean enough to support SaaS‑style margins from the first few dozen paying users.

## Structure

- `frontend/` – React 18 + TypeScript + Vite SPA/PWA using Tailwind CSS, shadcn-style components, React Router, TanStack Query, and a basic service worker.
- `gateway/` – Node.js/Express API gateway handling auth, voice, memories, and summaries against MongoDB and the agents service.
- `agents/` – Python FastAPI service that implements the reflection agent and memory candidate detection, with optional OpenAI integration.
- `docker-compose.yml` – Dev stack for MongoDB, gateway, and agents.

## Software architecture & system design (high level)

### Diagram (conceptual)

```text
   [ Browser / PWA ]
         |
         |  HTTPS (REST, JSON)
         v
 [ Frontend SPA (Vite/React) ]
         |
         |  /api/*
         v
 [ Node.js Gateway (Express) ]
         |
   +-----+------------------------+
   |                              |
   | Mongoose (ODM)               | HTTP (JSON)
   v                              v
[ MongoDB ]                 [ Agents Service (FastAPI) ]
  Users                       /reflect
  Memories                    (Listener + Reflection +
  WeeklySummaries              Memory candidate detection)
```

- **Frontend (SPA + PWA)**  
  - React 18 + TypeScript, Vite, Tailwind, shadcn-style UI.  
  - React Router for all public pages and authenticated app routes.  
  - TanStack Query for data fetching and caching.  
  - Service worker + manifest for installable PWA and offline shell.

- **Backend gateway (Node.js / Express)**  
  - Public REST API under `/api/*`.  
  - JWT‑based auth (email/password) and session endpoints.  
  - Routes for voice sessions, memories CRUD, and weekly summaries.  
  - Connects to MongoDB via Mongoose for `User`, `Memory`, and `WeeklySummary` models.  
  - Calls the agents service for reflection and memory candidate detection.

- **Agents service (Python / FastAPI)**  
  - Exposes `/reflect` endpoint that acts as Listener + Reflection + Memory‑candidate detection.  
  - Uses OpenAI (or another LLM) with a strict prompt to:  
    - Mirror user thoughts, ask clarifying questions.  
    - Never provide advice or external facts.  
    - Optionally flag messages as memory candidates.  
  - Designed so additional endpoints/agents (Safety, more advanced Memory) can be added later.

- **Data & events**  
  - MongoDB for durable storage of users, memories, summaries.  
  - Weekly summary generation is modeled as a batch over recent memories (can be moved to a worker/cron later).  
  - Vector DB and richer event bus are planned in the PRD but not required for this first MVP slice.

- **Security & privacy**  
  - JWT for authenticated API calls from the SPA.  
  - Memories are only persisted when explicitly confirmed by the user.  
  - Clear separation between public marketing pages and authenticated app shell.

## Prerequisites

- Node.js >= 20
- Python >= 3.11
- Docker (for the easiest local Mongo/gateway/agents setup)
- (Optional) `OPENAI_API_KEY` for higher‑quality reflections

## Running the backend (gateway + agents + Mongo)

From the repo root:

```bash
cd "/Users/harshmriduhash/Desktop/untitled folder/Innerloop-ai"

# Expose your OpenAI key to the agents service (optional but recommended)
export OPENAI_API_KEY=sk-xxxxxx

docker compose up
```

This will start:
- MongoDB on `mongodb://mongo:27017/innerloop`
- Gateway on `http://localhost:4000`
- Agents service on `http://localhost:8000`

## Running the frontend (SPA + PWA shell)

In a separate terminal:

```bash
cd "/Users/harshmriduhash/Desktop/untitled folder/Innerloop-ai/frontend"
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

The frontend is configured to proxy `/api/*` calls to the gateway at `http://localhost:4000`.

## Basic flows to test

- Sign up from `/signup`, then you will be redirected to `/app`.
- Use the **Voice** tab to type what you would normally say out loud; the agents service returns a reflective response and may suggest memory candidates.
- Approve memory suggestions and see them appear on the **Memory** timeline.
- Visit **Summary** to see weekly summaries as they accumulate.

## Deployment notes (high level)

- Frontend: build with `npm run build` and deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront, etc.).
- Gateway + agents: containerize via the existing `Dockerfile` setups (or add them) and deploy to a Node/Python‑friendly host (Railway, Render, Fly.io, AWS ECS, etc.) with:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `AGENTS_BASE`
  - `OPENAI_API_KEY`

## LAUNCH_CHECKLIST

- Landing page content finalized and live (hero, features, pricing, privacy, terms).
- `/signup` and `/login` work end‑to‑end with JWT auth.
- `/app` routes (Voice, Memory, Summary, Settings) load without errors.
- Voice page can send text, receive a reflective AI response, and optionally trigger a memory candidate.
- Confirmed memories appear in the Memory timeline, and deletions work.
- Weekly summary page shows at least one generated summary for a test user.
- Basic analytics (page views, signups) are wired (e.g., simple script or provider).
- Support/contact channel listed (email or form) and actually reaches you.

## MVP_LAUNCH_CHECKLIST

- Core product loop works: talk → reflect → capture memory → weekly summary.  
- Error states show friendly messages (e.g., AI down, network issues).  
- Onboarding path: landing → signup → first voice session is under 2 minutes for a new user.  
- At least one pricing plan is active and visible (even if payments are turned on later).  
- README and environment examples are accurate so you (and collaborators) can re‑deploy quickly.

## PRODUCTION_CHECKLIST

- Unique, strong `JWT_SECRET` and secure `MONGO_URI` configured for production.  
- HTTPS enforced at the edge (via your hosting provider).  
- Basic logging for gateway and agents (500s, timeouts, AI errors).  
- Resource limits and timeouts set for AI calls.  
- Backups or snapshots enabled for MongoDB in production.  
- Monitoring/alerting set up for uptime and error rates (even simple).

## SAAS_READY_CHECKLIST

- Clear pricing page with Free vs Pro value differentiation.  
- Basic churn/revenue metrics available (via Stripe dashboard or similar).  
- Terms of Service and Privacy Policy published and linked from footer + signup.  
- Export/delete account/memory policy defined (and technically possible, even if manual).  
- Support process: how users can reach you and how you track/respond.  
- Simple roadmap or “What’s next” page/post for prospective customers.

## EXECUTION_CHECKLIST (for you as founder)

- Talk to at least 10 target users (founders/engineers/overthinkers) and watch them use the product.  
- Iterate on copy in the hero, onboarding, and voice prompts based on real feedback.  
- Validate willingness to pay by actually charging at least a few early adopters.  
- Prioritize one acquisition channel (e.g., X/LinkedIn, founder communities, newsletters) and ship content weekly.  
- Keep infra lean—only upgrade hosting/LLM tiers once revenue justifies it.

## READY_CHECKLIST (before investor/user demos)

- Happy path demo works reliably on your laptop and in production.  
- You can walk through: problem → product story → quick live demo → basic metrics/revenue model.  
- At least a few real user quotes or anecdotes about clarity, reflection, or continuity.  
- Slides or a short one‑pager aligned with this README and the live product.


