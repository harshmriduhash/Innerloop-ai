# InnerLoop.ai – Product Requirements Document (PRD)

## Document Metadata
- Product Name: InnerLoop.ai
- Product Type: B2C AI SaaS Web Application
- Stage: Working MVP (Public Launch Ready)
- Author: Harsh
- Target Release: V1 (MVP)
- Platforms: Web (SPA + PWA)
- Users Supported (MVP): 100–500 active users
- Monetization: Subscription (Stripe)

---

## 1. Product Overview

### 1.1 Product Vision
InnerLoop.ai is a **voice-first, agentic AI companion with long-term memory** that helps users think clearly, reflect deeply, and make better decisions over time.

It is designed to be used **daily**, not occasionally.

### 1.2 Core Value Proposition
> “InnerLoop remembers what matters about you and helps you think — every day.”

### 1.3 What This Product Is NOT
- Not a ChatGPT wrapper
- Not a journaling app
- Not therapy
- Not a motivation app
- Not a productivity tool

### 1.4 Product Category
- Consumer AI
- Personal intelligence
- Mental clarity & reflection
- Voice-based AI

---

## 2. Problem Statement

### 2.1 Core Problem
People think, decide, and feel every day — but their thoughts:
- Have no continuity
- Have no memory
- Are fragmented across tools
- Get repeated without resolution

AI tools today:
- Forget users
- Give generic advice
- Hallucinate confidently
- Lack trust

### 2.2 Why This Matters
- Mental clarity directly impacts performance, health, and relationships
- Existing tools fail to create a **thinking loop with memory**
- Users are willing to pay for clarity, reflection, and continuity

---

## 3. Target Users

### 3.1 Primary Persona
- Age: 22–45
- Profile: Engineers, founders, PMs, consultants, creators
- Traits:
  - High cognitive load
  - Overthinkers
  - Comfortable with AI
  - Seeking clarity, not dopamine

### 3.2 User Jobs-to-be-Done
- “I want to think clearly.”
- “I want to talk things out.”
- “I want to remember what I felt or decided.”
- “I want patterns in my life surfaced.”

---

## 4. Success Metrics (MVP)

### 4.1 Activation
- User completes first voice session

### 4.2 Habit
- 3+ sessions within first 7 days

### 4.3 Trust
- % of memory confirmations accepted

### 4.4 Revenue
- Free → Pro conversion rate
- First-month paid users

---

## 5. Product Scope (MVP)

### 5.1 Included Features

#### 5.1.1 Voice-First Conversations
- Push-to-talk interface
- Real-time transcription
- Streaming AI responses
- Session-based conversations
- Support for pauses and silence

#### 5.1.2 Long-Term Memory (Opt-In)
- AI detects memory-worthy moments
- Explicit confirmation modal:
  - “Do you want me to remember this?”
- Memory categories:
  - Decisions
  - Emotions
  - Goals
- Memory timeline UI
- Edit / delete memory

#### 5.1.3 Memory-Grounded AI (RAG)
- AI responses grounded only in:
  - Current conversation
  - User-approved memory
- No internet knowledge in MVP
- Confidence threshold enforcement
- Explicit “I don’t know” responses

#### 5.1.4 Reflection Agent
- Reflective responses
- Clarifying questions
- No unsolicited advice
- Encourages slower thinking

#### 5.1.5 Daily Check-In Flow
- Morning prompt
- End-of-day reflection prompt
- Push notifications (PWA)

#### 5.1.6 Weekly Summary
- Auto-generated every 7 days
- Emotional trends
- Repeated themes
- Delivered inside app

#### 5.1.7 Authentication
- Email + password
- Google OAuth
- Secure session handling

#### 5.1.8 Monetization
- Stripe integration
- Free & Pro plans
- Feature gating
- Subscription management

---

### 5.2 Explicitly Out of Scope (V1)
- Mobile native apps
- Multi-language support
- External integrations
- Coaching or advice engine
- Community features
- Enterprise features

---

## 6. Pages & Navigation (Full Web App)

### 6.1 Public Pages
- Landing Page (SEO + conversion)
- Features Page
- Pricing Page
- Contact Page
- Blog (SEO)
- Privacy Policy
- Terms of Service

### 6.2 Authenticated Pages
- App Home (Dashboard)
- Voice Session Page
- Memory Timeline Page
- Weekly Summary Page
- Account Settings

### 6.3 Navbar
- Logo
- Features
- Pricing
- Blog
- Login / Get Started
- Dark mode toggle

### 6.4 Footer
- Company info
- Legal links
- Contact
- Social links

---

## 7. UI / UX Requirements

### 7.1 Design System
- Tailwind CSS
- shadcn/ui
- Dark-first design
- Glassmorphism (subtle)
- Soft blur backgrounds
- Rounded corners
- Calm color palette

### 7.2 Loading & Feedback Components (Mandatory)
- Shimmer UI (page skeletons)
- Pulse loaders (AI processing)
- Spinners (API calls)
- Circular loaders (long responses)
- Progress bars (weekly summary)
- Dots loader (thinking state)
- Blur-up image loading
- Progressive image loading
- Content placeholders

### 7.3 UX Principles
- Zero cognitive overload
- Clear trust signals
- Predictable behavior
- Transparent memory handling

---

## 8. SPA + PWA Requirements

### 8.1 SPA
- No full page reloads
- Client-side routing
- Streaming responses
- Optimistic UI updates

### 8.2 PWA
- Installable
- Offline app shell
- Cached last sessions
- Background sync for queued voice notes
- Push notifications

---

## 9. AI & Agent Architecture

### 9.1 Agents

#### Listener Agent
- Parses voice input
- Detects intent
- Routes to other agents

#### Reflection Agent
- Mirrors thoughts
- Asks clarifying questions
- Avoids advice

#### Memory Agent
- Detects memory candidates
- Requests confirmation
- Stores vector + metadata

#### Safety Agent
- Enforces confidence thresholds
- Prevents hallucination
- Declines unsafe requests

### 9.2 Anti-Hallucination Rules
- RAG only from user memory
- No external facts
- Confidence-based refusal
- Explicit uncertainty responses

---

## 10. Technical Architecture

### 10.1 Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Service Workers

### 10.2 Backend
- Node.js (API Gateway)
- Python + Django (AI Core)
- FastAPI (agent services)
- Redis (sessions + cache)
- MongoDB (users + memory)
- Vector DB (embeddings)

### 10.3 Event-Driven System
Events:
- VoiceSessionStarted
- MemoryCandidateDetected
- MemoryConfirmed
- WeeklySummaryGenerated

---

## 11. Security & Privacy

### 11.1 Security
- JWT + refresh tokens
- Rate limiting
- Input validation
- Encrypted memory storage
- Secure API gateways

### 11.2 Privacy
- Explicit memory consent
- User-controlled deletion
- No data selling
- Clear data usage explanation

---

## 12. Scalability & Reliability

- Dockerized services
- Horizontal scaling
- Async workers
- Queue-based processing
- Graceful degradation
- Error boundaries in UI

---

## 13. Deployment & Launch

### 13.1 Environments
- Development
- Staging
- Production

### 13.2 Launch Checklist
- SEO metadata
- Analytics
- Error tracking
- Payment testing
- Load testing (100 users)

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|----|-----------|
| Hallucinations | Strict RAG |
| Trust issues | Memory transparency |
| Overcomplexity | Tight MVP scope |
| Latency | Streaming + caching |

---

## 15. Future Roadmap (Post-MVP)
- Mobile apps
- Advanced pattern analytics
- Personal growth insights
- Multi-language
- Custom voices

---

## 16. Product Philosophy (Non-Negotiable)

- Trust > Intelligence
- Reflection > Advice
- Memory > Responses
- Calm > Dopamine
- Depth > Virality

---

## 17. Final Definition of Done (MVP)

✔️ Users talk daily  
✔️ AI remembers correctly  
✔️ No hallucinations  
✔️ Monetized  
✔️ Premium UX  
✔️ Handles real users  
✔️ Interview-defensible  

---

END OF DOCUMENT