# InnerLoop.ai — Your Thoughts Deserve Memory

[![Clerk Authentication](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)
[![Vercel Postgres](https://img.shields.io/badge/Database-Vercel%20Postgres-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/storage/postgres)
[![FastAPI](https://img.shields.io/badge/Agent%20Core-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)

**InnerLoop.ai** is a premium, voice-first AI companion designed for deep reflection and long-term continuity. Built for founders, engineers, and overthinkers, InnerLoop remembers what matters about you and helps you think clearly—every day.

---

## ✨ Key Features

- **🎙️ Voice-First Reflection**: A calm, push-to-talk interface designed for daily thinking loops, not endless chatting.
- **🧠 Trust-Based Memory**: InnerLoop only remembers what you explicitly approve. Memories are organized into *Decisions*, *Emotions*, and *Goals*.
- **📊 Weekly Summaries**: Automatic, gentle reflections on your emotional and cognitive patterns delivered every 7 days.
- **🛡️ Zero Hallucination**: AI responses are grounded strictly in your actual conversations and approved memories.
- **🚀 Live Demo Mode**: Explore the full product experience instantly with pre-filled mock data—no signup required.

---

## 🏗️ Architecture

InnerLoop uses a sophisticated **Hybrid Architecture** to balance web reliability with AI flexibility:

- **Gateway (Node.js/Express)**: Handles authentication (Clerk), database operations (Vercel Postgres), and core API orchestration.
- **Agent Core (Python/FastAPI)**: Implements complex LLM logic, reflection agents, and memory candidate detection using the OpenAI ecosystem.
- **Frontend (React/Vite)**: A premium "Midnight Cyan" PWA with smooth animations (Framer Motion) and high-performance data fetching (TanStack Query).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, TanStack Query |
| **Backend Gateway** | Node.js, Express, Clerk SDK, @vercel/postgres |
| **AI Agent Core** | Python 3.11, FastAPI, OpenAI SDK |
| **Infrastructure** | Vercel (Frontend/DB), Railway/Render (Backend), Docker |

---

## 🚀 Local Development

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Clerk API Keys
- Vercel Postgres URL (or local Postgres)

### 1. Agent Core (Python)
```bash
cd agents
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8000
```

### 2. Backend Gateway (Node.js)
```bash
cd gateway
npm install
# Configure .env with CLERK_SECRET_KEY and POSTGRES_URL
npm run dev
```

### 3. Frontend (React)
```bash
cd frontend
npm install
# Configure .env with VITE_CLERK_PUBLISHABLE_KEY
npm run dev
```

---

## 📜 Deployment

InnerLoop is designed for modern cloud environments:
- **Frontend**: Deploy `dist/` to Vercel or Netlify.
- **Gateway**: Deploy to Railway, Render, or Fly.io.
- **Agent Core**: Deploy to Railway or AWS App Runner.

---

## 🔒 Privacy & Philosophy

- **Trust > Intelligence**: We never turn your thoughts into "content."
- **Reflection > Advice**: We mirror your thinking instead of prescribing fixes.
- **Depth > Virality**: No feeds, no dopamine loops. Just depth and continuity.

Built with ❤️ by [Harsh](https://github.com/harshmriduhash)


