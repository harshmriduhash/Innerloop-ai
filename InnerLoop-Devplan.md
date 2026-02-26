# cursor.md — InnerLoop.ai (Full Build Instructions)

## ROLE & EXPECTATION
You are a **senior full-stack AI engineer + product engineer**.
You are building a **real B2C AI SaaS web application**, not a demo.

This product must be:
- Production-ready
- Secure
- Scalable (100+ users)
- Monetized
- SEO-optimized
- Premium UI/UX
- SPA + PWA
- Voice-first
- Agentic AI with memory
- Zero hallucination by design

Do NOT create mock code or placeholders.
Everything must be functional.

---

## 1. TECH STACK (NON-NEGOTIABLE)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix)
- TanStack Query
- React Router
- Framer Motion
- PWA (Service Workers)
- Dark mode (default)

### Backend
- Node.js (API Gateway)
- Python 3.11
- Django (AI Core)
- FastAPI (Agent services)
- Redis (sessions, caching)
- MongoDB (users, memory metadata)
- Vector DB (Qdrant / Pinecone)

### AI
- LLM orchestration layer
- RAG over user memory only
- Vector embeddings
- Streaming responses
- Confidence thresholds
- Agent-based reasoning

### Infra
- Docker (all services)
- Async workers
- Event-driven processing
- Stripe (payments)

---

## 2. PRODUCT PAGES (BUILD ALL)

### PUBLIC (SEO)
1. `/` – Landing Page
2. `/features`
3. `/pricing`
4. `/contact`
5. `/blog`
6. `/privacy`
7. `/terms`

### AUTH
8. `/login`
9. `/signup`

### APP (AUTHENTICATED)
10. `/app` – Dashboard
11. `/app/voice`
12. `/app/memory`
13. `/app/summary`
14. `/app/settings`

---

## 3. LANDING PAGE CONTENT (SEO-READY)

### Hero
Headline:
> “Your thoughts deserve memory.”

Subheading:
> “A private, voice-first AI companion that remembers what matters and helps you think clearly—every day.”

Primary CTA:
- Start Talking (Signup)

Secondary CTA:
- See How It Works

---

### SEO KEYWORDS (USE NATURALLY)
- voice AI companion
- AI with memory
- AI journaling
- thinking partner AI
- personal AI assistant with memory

---

## 4. NAVBAR & FOOTER

### Navbar
- Logo (InnerLoop)
- Features
- Pricing
- Blog
- Login / Get Started
- Dark mode toggle

### Footer
- About
- Contact
- Privacy
- Terms
- Copyright

---

## 5. UI / UX SYSTEM (PREMIUM REQUIRED)

### Design Rules
- Dark-first
- Calm colors
- Glassmorphism panels
- Soft blur backgrounds
- Rounded corners
- Subtle animations
- No loud colors
- No clutter

---

### REQUIRED UI COMPONENTS
Implement ALL:

- Shimmer UI (page skeletons)
- Pulse loader (AI thinking)
- Spinner (API calls)
- Circular loader (long responses)
- Progress bar (weekly summary)
- Dots loader (“Thinking…“)
- Blur-up image loading
- Progressive image loading
- Content placeholder with shimmer
- Error boundaries
- Empty states

Use **Tailwind + shadcn/ui only**.

---

## 6. SPA REQUIREMENTS

- Zero page reloads
- Streaming AI responses
- Optimistic UI updates
- Cached routes
- React Query for data
- Global error handling

---

## 7. PWA REQUIREMENTS

- Installable app
- Offline shell
- Cache last 3 sessions
- Queue voice input offline
- Background sync
- Push notifications:
  - Daily check-in reminder
  - Weekly summary ready

---

## 8. AUTH & SECURITY

- Email + Google OAuth
- JWT + refresh tokens
- Rate limiting
- Encrypted memory storage
- User-controlled memory deletion
- Audit logs

---

## 9. CORE APP FEATURES

### Voice Conversations
- Push-to-talk
- Real-time transcription
- Streaming AI responses
- Session persistence
- Pause / resume supported

---

### Long-Term Memory
- Detect memory-worthy moments
- Explicit confirmation modal:
  “Do you want me to remember this?”
- Categories:
  - Decisions
  - Emotions
  - Goals
- Editable / deletable memory
- Timeline UI

---

### Memory-Grounded AI (NO HALLUCINATION)
- RAG ONLY from user memory
- No internet data
- Confidence threshold
- If unsure → say “I don’t know”

---

### Daily Flow
- Morning prompt
- End-of-day reflection
- Streak indicator (subtle)

---

### Weekly Summary
- Auto-generated
- Emotional trends
- Recurring themes
- Progress bar UI

---

## 10. AGENTIC AI ARCHITECTURE

### Agents (MUST IMPLEMENT)

#### Listener Agent
- Parses voice input
- Detects intent & emotion
- Routes request

#### Reflection Agent
- Mirrors thoughts
- Asks clarifying questions
- Avoids advice

#### Memory Agent
- Detects memory candidates
- Requests user consent
- Stores embeddings + metadata

#### Safety Agent
- Confidence scoring
- Declines unsafe / hallucinated responses

Agents communicate via events.

---

## 11. EVENT-DRIVEN SYSTEM

Define events:
- VoiceSessionStarted
- MemoryCandidateDetected
- MemoryConfirmed
- WeeklySummaryGenerated

Use async workers to process.

---

## 12. DATABASE SCHEMAS

### MongoDB
- Users
- Sessions
- Memory metadata
- Subscriptions

### Vector DB
- Memory embeddings
- Emotional state vectors

---

## 13. PAYMENTS

- Stripe subscriptions
- Free vs Pro plan
- Feature gating
- Billing page

---

## 14. PERFORMANCE & SCALE

- Handle 100–500 users
- Async AI processing
- Streaming responses
- Redis caching
- Graceful failures

---

## 15. ERROR HANDLING

- User-friendly error messages
- Retry logic
- Offline fallback
- Logging
- Monitoring hooks

---

## 16. DEPLOYMENT

- Dockerize all services
- Separate envs:
  - dev
  - staging
  - prod
- Env-based configs

---

## 17. DEFINITION OF DONE (NON-NEGOTIABLE)

- App is installable
- Voice works end-to-end
- Memory persists
- No hallucinations
- Payments work
- Premium UI everywhere
- SEO pages indexable
- Can onboard real users
- Interview-defensible

---

## 18. BUILD ORDER (FOLLOW STRICTLY)

1. Frontend scaffold (Vite + Tailwind + shadcn)
2. Auth & routing
3. Landing + SEO pages
4. App shell + SPA
5. Voice input
6. AI streaming
7. Memory system
8. Agent orchestration
9. Payments
10. PWA
11. Polish UI & loaders
12. Load testing

---

END OF CURSOR INSTRUCTIONS