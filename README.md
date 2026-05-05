# Pathfinder.io

**Connecting Ambition to Direction**

An AI-powered career guidance and digital skills platform built for students and professionals seeking to find or grow a path in technology. Pathfinder.io solves the direction problem—not the resource problem—by providing AI-driven path discovery, clean learning roadmaps with one curated resource per concept, and personalized guidance based on field of study and career goals.

**Vision**: Make technology accessible by solving the direction problem, not the resource problem.

---

## 🎯 Product Overview

### Core Problem We Solve

Most people trying to enter tech don't have a resource problem—they have a **direction problem**. Existing tools overwhelm users with 5+ resources per concept and offer no personalization. Pathfinder.io delivers:

- **ONE focused path** for each learner
- **ONE curated resource** per learning concept
- **AI-powered discovery** that understands who you are before offering guidance

### Target Users

| User Type            | Profile                                                    | Primary Need                                                               |
| -------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Non-Tech Student** | Studying Law, Medicine, Business, Arts, Mass Communication | Find a digital skill that complements their degree and career              |
| **Tech Student**     | Studying CS, Engineering, IT                               | Clear, focused roadmap with one resource per concept (not a resource dump) |
| **Career Switcher**  | Working professional from any background                   | Structured reskilling path, career guidance, and job opportunities         |

**Focus Market (v1)**: Nigeria + West Africa  
**Global Expansion**: Planned for v2

### Primary Goals

1. Provide **AI-powered path discovery** that helps any user identify the right digital skill based on their background
2. Deliver **clean, focused learning roadmaps** with one curated resource per concept

### Secondary Goals

1. Recommend digital skills based on **field of study** (e.g., data analysis for Business students, UX design for Fine Arts students)
2. Surface relevant **technology opportunities** (scholarships, internships, events, news)
3. Support **emerging technologies** as continuously updated learning tracks
4. Enable **progress tracking**, learning streaks, and topic revisiting

---

## 📚 Tech Stack

| Layer                  | Technology                           | Rationale                                            |
| ---------------------- | ------------------------------------ | ---------------------------------------------------- |
| **Frontend**           | Next.js 15 + React 19 + Tailwind CSS | SSR for SEO + fast load times; rapid styling         |
| **Backend**            | Node.js + Express                    | Lightweight, AI-friendly, JavaScript ecosystem       |
| **Database**           | PostgreSQL (Supabase)                | Reliable, scalable; Supabase adds auth + hosting     |
| **Caching & Sessions** | Redis                                | Session management, response caching for Claude API  |
| **Authentication**     | Supabase Auth (preferred) or Auth0   | OAuth 2.0, email/password, Google login              |
| **CMS**                | Sanity.io or Notion API              | Roadmap content management without code changes      |
| **AI / Agentic Layer** | **Anthropic Claude API**             | Conversational path discovery + roadmap explanations |
| **Monitoring**         | Sentry + PostHog/Mixpanel            | Error tracking + user analytics                      |
| **Hosting**            | Vercel (frontend) + Render (backend) | Affordable, scalable, seamless deployments           |
| **CI/CD**              | GitHub Actions                       | Automated testing and deployment pipelines           |

---

## 🤖 Agentic AI Architecture

Pathfinder.io is designed as an **agentic AI application**, not just a static AI wrapper.

The backend AI layer should be organized so the system can reason about a user request, plan the next step, route to the right capability, and compose a clear response without leaking AI logic into the frontend.

### Agentic Layers

| Layer                     | Responsibility                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **Intake Layer**          | Collect and normalize onboarding inputs such as background, interests, goals, and time commitment |
| **Planner**               | Break the user problem into smaller steps and determine what kind of recommendation is needed     |
| **Tool Router**           | Decide whether to use roadmap data, recommendation logic, search, or memory                       |
| **Memory / Context**      | Preserve session context so the assistant stays consistent across turns                           |
| **Recommendation Engine** | Produce the actual path suggestions and explain why they fit                                      |
| **Response Composer**     | Turn internal reasoning into clean user-facing output                                             |
| **Guardrails**            | Prevent unsafe, irrelevant, or overly complex responses                                           |

### Agentic Principle

- AI logic lives in the backend
- The frontend only sends user input and renders output
- The AI layer is isolated enough to evolve from mock → Claude → richer agent workflows
- Keep the MVP explainable and simple, even if the architecture is agentic-ready

---

## 📁 Project Structure

```
pathfinder.io/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                 # Pages (home, onboarding, roadmaps, profile)
│   │   ├── components/          # Reusable UI components
│   │   ├── lib/                 # API client, Supabase config, utilities
│   │   ├── styles/              # Global CSS (Tailwind)
│   │   └── hooks/               # Custom React hooks
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── backend/                     # Express API + AI service layer
│   ├── src/
│   │   ├── controllers/         # Route handlers (http logic)
│   │   ├── routes/              # API endpoint definitions
│   │   ├── services/            # Business logic
│   │   │   ├── ai/              # Agentic AI boundary (planner, tools, memory, orchestration)
│   │   │   ├── recommendations/ # Path recommendation logic
│   │   │   ├── roadmaps/        # Roadmap management
│   │   │   └── progress/        # Progress tracking
│   │   ├── middleware/          # Error handling, auth, validation
│   │   ├── config/              # Environment, database, Redis setup
│   │   ├── data/                # Roadmap data, schema definitions, seeds
│   │   └── types/               # Shared TypeScript types
│   ├── package.json
│   └── tsconfig.json
│
├── Initialize/                  # Project context (not committed)
│   ├── AI_INSTRUCTIONS.md       # Engineering guidelines
│   ├── Starter.md               # Getting started notes
│   ├── Pathfinder PRD.md        # Product requirements document
│   ├── Pathfinder DevPlan.md    # Development plan & phases
│   └── (PDFs archived)
│
├── .gitignore
├── package.json                 # Workspace root (concurrent dev)
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (via Supabase) or local instance
- Redis (for sessions & caching)
- Anthropic API key (for Claude; optional for Phase 1 with mock provider)

### Installation

```bash
# Install dependencies
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Environment Setup

**backend/.env** (Development)

```bash
# Environment
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database (Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
SUPABASE_ANON_KEY=your_supabase_anon_key

# Redis (Caching & Sessions)
REDIS_URL=redis://localhost:6379

# AI / Claude API
CLAUDE_API_KEY=your_anthropic_api_key
AI_PROVIDER=mock                # Use "mock" for Phase 1; switch to "claude" later

# CMS (Choose one: Sanity or Notion)
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
# OR
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_db_id

# Monitoring
SENTRY_DSN=your_sentry_dsn
POSTHOG_API_KEY=your_posthog_key
```

**frontend/.env.local** (Development)

```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Supabase (Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

### Development

```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately
npm run dev:backend  # Backend on http://localhost:4000
npm run dev:frontend # Frontend on http://localhost:3000
```

### Validation

```bash
npm run typecheck  # Type-check both frontend & backend
npm run lint       # Lint frontend
npm run build      # Build both frontend & backend
```

---

## 📋 API Endpoints

### Health Check

- **GET** `/api/health` → Backend status and service info

### Recommendations (Path Discovery)

- **POST** `/api/recommendations`
  - Body: `{ background, interests[], goal, timeCommitment }`
  - Returns: `{ recommendations[], engine, timestamp }`

### Roadmaps

- **GET** `/api/roadmaps` → List all available roadmaps
- **GET** `/api/roadmaps/:slug` → Get single roadmap with all nodes and resources

### Progress Tracking (Phase 3+)

- **POST** `/api/progress/mark-complete` → Mark a roadmap node as complete
- **GET** `/api/progress/user/:userId` → Get user's progress across roadmaps

---

## 📋 Development Phases (14 weeks)

### Phase 1: Foundation (Weeks 1–4)

**Goal**: Set up infrastructure, authentication, and basic user flows

**Tasks**:

- [ ] Initialize repository (GitHub), project structure, CI/CD pipeline
- [ ] Set up Next.js frontend with Tailwind CSS design system
- [ ] Set up backend (Node + Express), PostgreSQL database schema
- [ ] Implement authentication (Supabase Auth or Auth0) with email + Google
- [ ] Build user onboarding flow (form-based, pre-AI conversation)
- [ ] Deploy staging environment on Vercel + Render
- [ ] Define and document all API contracts
- [ ] Set up Redis instance and connection pooling
- [ ] Configure Sentry for error tracking

**Deliverable**: Authentication working, staging deployed, onboarding form complete

---

### Phase 2: AI Core (Weeks 5–10)

**Goal**: Build AI path discovery engine and roadmap system (heart of Pathfinder)

**Tasks**:

- [ ] Design and iterate on AI conversation prompts (Claude API)
- [ ] Build conversational onboarding (multi-step path discovery flow)
- [ ] Implement recommendation engine logic (background + interests + goals)
- [ ] Set up CMS integration (Sanity.io or Notion API) for roadmap management
- [ ] Build roadmap data model with node-based structure
- [ ] Develop interactive roadmap UI (visual node-based layout)
- [ ] Attach ONE curated resource + explanation per roadmap node
- [ ] Implement 'Go Deeper' toggle for optional extra resources
- [ ] User testing with 10–15 target users; iterate on AI prompts

**Deliverable**: At least 5 skill tracks live with curated resources; Claude API integration working end-to-end

---

### Phase 3: Secondary Features (Weeks 11–12)

**Goal**: Add progress tracking, field-based recommendations, and opportunities feed

**Tasks**:

- [ ] Build progress tracking system (mark nodes complete, streak counter)
- [ ] Implement field-of-study recommendation logic
- [ ] Build tech news and opportunities feed (RSS aggregator + manual curation)
- [ ] Add emerging technologies tracks to roadmap library
- [ ] Implement reskilling mode (skill gap analysis flow)
- [ ] Polish UI/UX across all screens based on user testing feedback
- [ ] Performance optimization audit (load times, lazy loading)
- [ ] Security audit (data encryption, penetration testing basics)
- [ ] Set up PostHog/Mixpanel for user analytics

**Deliverable**: Progress tracking, field recommendations, and opportunities feed live; all v1 features complete

---

### Phase 4: Launch Prep (Weeks 13–14)

**Goal**: Prepare for public beta launch

**Tasks**:

- [ ] QA sweep across all features; bug fixes and stability hardening
- [ ] Set up monitoring dashboards (Sentry, PostHog/Mixpanel)
- [ ] Prepare onboarding email sequence for new users
- [ ] Write user documentation and FAQs
- [ ] Soft launch to Nihub community (closed beta, 50–100 test users)
- [ ] Collect feedback, fix critical issues
- [ ] Open public beta; growth phase begins

**Deliverable**: Pathfinder.io open to public; beta user feedback loop active

---

## 📊 Key Milestones

| Week    | Milestone           | Deliverable                                                  |
| ------- | ------------------- | ------------------------------------------------------------ |
| Week 1  | Project Kickoff     | Repo live, team aligned, design system started               |
| Week 4  | Foundation Complete | Auth working, staging deployed, DB schema finalized          |
| Week 6  | AI MVP              | Path discovery flow working end-to-end with Claude API       |
| Week 8  | Roadmap v1          | At least 5 skill tracks live with curated resources          |
| Week 10 | Beta Feature Set    | Progress tracking, field recommendations, opportunities live |
| Week 12 | Feature Freeze      | All v1 features complete; QA begins                          |
| Week 13 | Closed Beta         | Nihub community beta (50–100 test users)                     |
| Week 14 | Public Beta         | Pathfinder.io open to all; growth phase begins               |

---

## 🤖 AI Integration Strategy

### Current (Phase 1): Mock Provider

- Simple keyword-based recommendations
- Allows frontend/backend development without API keys
- Easy to test and iterate

### Agentic Design Boundary

- Keep all planning, routing, memory, and response composition inside the backend AI layer
- Do not scatter AI prompts inside frontend components
- Keep each AI capability isolated so the system can evolve from mock → Claude → more agentic workflows

### Phase 2: Claude API Integration

- **When**: Week 5+ (Phase 2)
- **Where**: `backend/src/services/ai/` only (isolated, no frontend leakage)
- **What**: Conversational path discovery + roadmap explanations
- **Features**:
  - Multi-turn conversation for better understanding
  - Natural language roadmap node explanations
  - Field-of-study aware recommendations
  - Cache responses in Redis to manage costs
  - Planner/orchestrator flow for future agentic expansion

### Future: Additional Providers

- OpenAI GPT (alternative to Claude)
- Anthropic updates (as Claude evolves)

**Design Principle**: All AI logic lives in the backend service layer. Frontend never calls Claude directly.

---

## 🏗️ Development Workflow

### 1. Backend-First Approach

- Backend defines the API contracts (types, endpoints, validation)
- Frontend consumes the backend API
- Ensures consistency and easier testing

### 2. Feature-by-Feature Building

Each feature is built end-to-end:

1. **Database**: Schema definition in `backend/src/data/schema.sql`
2. **Backend Logic**: Service layer in `backend/src/services/`
3. **API Route**: Endpoint in `backend/src/routes/` + `backend/src/controllers/`
4. **Frontend UI**: Component in `frontend/src/components/` + page in `frontend/src/app/`

### 3. Type-Driven Development

- Shared types in `backend/src/types/`
- Frontend imports types from `frontend/src/lib/api.ts`
- Zod schemas validate all inputs
- TypeScript strict mode enforced across codebase

### 4. Testing Strategy

- Test endpoints manually with cURL or Postman
- Run type-check before commits: `npm run typecheck`
- User testing in Phase 2 (weeks 6–10) with 10–15 target users
- QA sweep in Phase 4

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check dependencies
npm install --prefix backend

# Verify TypeScript
npm run typecheck --prefix backend

# Check port conflicts
netstat -ano | findstr :4000  # Windows
```

### Frontend can't reach backend

- Verify `NEXT_PUBLIC_API_URL=http://localhost:4000/api` in `.env.local`
- Check backend is running on `http://localhost:4000`
- Verify CORS is configured in `backend/src/app.ts`

### Redis connection error

- Ensure Redis is running locally: `redis-cli ping` (should return PONG)
- Verify `REDIS_URL=redis://localhost:6379` in `.env`

### Type errors

```bash
npm run typecheck --prefix frontend
npm run typecheck --prefix backend
```

---

## 💡 Key Architectural Decisions

### 1. Service Layer Isolation (for AI)

- AI logic lives **only** in `backend/src/services/ai/`
- Prevents AI code creeping into controllers or frontend
- Makes it easy to swap AI providers (mock → Claude → OpenAI)

### 2. Type-Driven Development

- Shared types between frontend & backend
- Zod schemas validate all inputs at API boundaries
- TypeScript strict mode enforced
- Catches bugs at compile time, not runtime

### 3. Mock-First Data (Phase 1)

- Roadmaps stored in memory (`backend/src/data/roadmaps.ts`)
- Can persist to CMS (Sanity/Notion) later without API changes
- Keeps MVP moving without waiting for CMS setup

### 4. Minimal Dependencies

- Only core: Express, Next.js, Supabase, Zod, Tailwind, Anthropic SDK
- No unnecessary libraries
- Keeps bundle small, deployment fast, maintenance simple

### 5. Redis for Performance

- Cache Claude API responses (high token cost)
- Session management for authenticated users
- Prevents repeated recommendations for same user input

---

## 📖 Learning Resources

- **Express.js**: [Express Documentation](https://expressjs.com/)
- **Next.js**: [Next.js Learn](https://nextjs.org/learn)
- **React**: [React Docs](https://react.dev)
- **Supabase**: [Supabase Docs](https://supabase.com/docs)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/docs)
- **Claude API**: [Anthropic Docs](https://docs.anthropic.com/)
- **PostgreSQL**: [PostgreSQL Docs](https://www.postgresql.org/docs/)
- **Redis**: [Redis Docs](https://redis.io/documentation)

---

## 📝 Development Guidelines

See `Initialize/` for detailed guidance:

- **AI_INSTRUCTIONS.md**: Design philosophy, mentorship approach, MVP scope, coding guidelines
- **Pathfinder PRD.md**: Product requirements, target users, goals, problem statement
- **Pathfinder DevPlan.md**: 14-week development plan, phases, milestones, risks, team structure
- **Starter.md**: Getting started notes and quick reference

**Key Principles**:

- Mentorship-first approach (no code dumping)
- MVP scope boundaries strictly enforced
- Backend-first, feature-by-feature development
- Type safety and clean architecture

---

## 🚀 Deployment Checklist

### Before Deploying to Production

- [ ] Set all production env vars (Claude API key must be `claude`, not `mock`)
- [ ] Run full test suite and type checks
- [ ] Set up Sentry and PostHog monitoring
- [ ] Configure custom domain and HTTPS
- [ ] Set up email notifications (auth, progress milestones)
- [ ] Database backups automated (Supabase handles this)
- [ ] Redis persistence enabled for production
- [ ] Rate limiting configured on API endpoints

### Vercel (Frontend)

- Set `NEXT_PUBLIC_API_URL` to production backend URL
- Set monitoring env vars (Sentry, PostHog)
- Enable automatic deployments from GitHub

### Render (Backend)

- Deploy from GitHub, set all environment variables
- Enable auto-redeploy on push to production branch
- Configure health checks at `/api/health`

---

## 📞 Community & Support

- **Issues & Questions**: GitHub Discussions
- **Bug Reports**: GitHub Issues with `bug` label
- **Feature Requests**: GitHub Issues with `enhancement` label
- **Community**: Join Nihub's community for user feedback loops

---

## 📄 License

Proprietary. See LICENSE file for details.

---

**Status**: MVP Foundation ✅ | Phase 1 Ready ✅ | Building with Purpose 🚀

**Last Updated**: May 2026 | **Version**: 1.0

# Pathfinder.io

**An AI-powered learning platform that provides personalized career paths, curated roadmaps, and progress tracking for aspiring technologists.**

Pathfinder.io helps learners discover their ideal path in tech by analyzing their background, interests, goals, and time commitment—and recommends tailored learning roadmaps they can follow.

---

## 🎯 MVP Scope

This is the **Web App MVP** phase. Current features:

- **Path Discovery**: Onboarding form to collect learner background and goals
- **Recommendations**: AI-powered path suggestions based on learner signals
- **Roadmap Viewing**: Read-only learning roadmaps with curated resources
- **Progress Tracking**: Mark completion on roadmap nodes (database foundation)

**Post-MVP** (not included):

- User authentication & profiles
- Opportunity feed (jobs, internships, programs)

# Pathfinder.io

**Connecting Ambition to Direction**

An AI-powered career guidance and digital skills platform built for students and professionals seeking to find or grow a path in technology. Pathfinder.io provides AI-driven path discovery, clean learning roadmaps with one curated resource per concept, and personalized guidance based on field of study and career goals.

## **Vision**: Make technology accessible by solving the direction problem, not the resource problem.

## 📚 Tech Stack

| **Frontend** | Next.js 15 + React 19 + Tailwind CSS |
| **AI** | Mockable provider (ready for OpenAI/Anthropic later) |
| **Hosting** | Vercel (frontend) + Render (backend) |
│ ├── src/
│ │ ├── app/ # Pages (home, onboarding, roadmaps)
│ │ └── styles/ # Global CSS (Tailwind)
│ ├── package.json

## 📋 Development Phases (14 weeks)

│ ├── src/
│ │ ├── controllers/ # Route handlers
│ │ ├── routes/ # API endpoints
│ │ ├── services/ # Business logic (AI engine, recommendations)
│ │ ├── middleware/ # Error handling, validation
│ ├── Pathfinder PRD.pdf # Product requirements
│ └── Pathfinder DevPlan.pdf # Development plan

```
---

## 🚀 Quick Start

### Prerequisites
npm install
npm install --prefix frontend
npm install --prefix backend

### Environment Setup

Create `.env` files (copy templates):

SUPABASE_SERVICE_ROLE_KEY=  # Optional: your Supabase key
```

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SUPABASE_URL=   # Optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Optional
npm run dev
```

```bash
npm run dev:backend  # Backend on http://localhost:4000
npm run dev:frontend # Frontend on http://localhost:3000
```

### Validation

```bash
npm run typecheck  # Type-check both apps
npm run lint       # Lint frontend
npm run build      # Build both apps
```

## 📋 API Endpoints

### Health Check

### Recommendations

### Roadmaps

---

- Backend defines the contracts (types, API routes)
- Frontend consumes the backend API

### 2. Build Feature by Feature

Each feature has:

- **Database**: Schema in `backend/src/data/schema.sql`
- **Backend Logic**: Service layer (`backend/src/services/`)
- **API Route**: Route handler + controller (`backend/src/routes/`, `backend/src/controllers/`)
- **Frontend UI**: Component + page (`frontend/src/components/`, `frontend/src/app/`)

### 3. Type Safety

- Share types between frontend/backend in `backend/src/types/`
- Frontend re-exports types from `frontend/src/lib/api.ts`

### 4. Testing

- Test endpoints manually with cURL or Postman
- Run type-check before commits

---

## 🤖 AI Integration (Ready for Future)

The AI service layer is **design-first for LLM integration**:

- **Mock Provider** (default): Simple keyword-based recommendations
- **Production Ready**: Swap in OpenAI or Anthropic API keys
- **No Scattered AI Calls**: All AI logic lives in `backend/src/services/ai/`
- **Isolated Experiments**: Build & test new AI behaviours without touching frontend

---

## 📦 Current Data

### Roadmaps

1. **Frontend Development** (beginner) → HTML/CSS → JavaScript → React
2. **Data Analysis** (beginner) → Spreadsheets → SQL → Data Visualization
3. **UI/UX Design** (beginner) → User Research → Wireframing → Design Systems

Each roadmap:

- Clearly explains each node
- Links to one curated resource per node
- Designed for learners to follow linearly

---

## ✅ Implementation Checklist

### Phase 1: Onboarding Flow (Current)

- [x] Backend onboarding form validation
- [x] Mock recommendation engine
- [x] Recommendation API working
- [ ] Frontend form UI complete
- [ ] Frontend results display

### Phase 2: Roadmap Viewing

- [x] Roadmap data structure
- [x] Roadmap list API
- [x] Roadmap detail API
- [ ] Frontend roadmap list UI
- [ ] Frontend roadmap detail UI
- [ ] Node completion UI

### Phase 3: Data Persistence (Post-MVP)

- [ ] Supabase auth implementation
- [ ] User profile creation
- [ ] Onboarding response storage
- [ ] Progress tracking persistence

---

## 🔧 Deployment Readiness

- **Frontend → Vercel**: Set `NEXT_PUBLIC_API_URL` to production backend URL
- **Backend → Render**: Deploy from GitHub, set environment variables
- **Database**: Apply `backend/src/data/schema.sql` to Supabase PostgreSQL

---

## 📖 Learning Resources

- **Express.js**: [Express Documentation](https://expressjs.com/)
- **Next.js**: [Next.js Learn](https://nextjs.org/learn)
- **React**: [React Docs](https://react.dev)
- **Supabase**: [Supabase Docs](https://supabase.com/docs)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/docs)

---

## 📝 Development Guidelines

See `Initialize/AI_INSTRUCTIONS.md` for:

- Mentorship-first approach (no code dumping)
- MVP scope boundaries
- Architectural decisions
- Coding philosophy

---

## 💡 Key Architectural Decisions

1. **Service Layer Isolation**
   - AI logic lives in `backend/src/services/ai/`
   - Prevents AI code creeping into controllers or frontend
   - Makes it easy to swap AI providers

2. **Type-Driven Development**
   - Shared types between frontend & backend
   - Zod schemas validate all inputs
   - TypeScript strict mode enforced

3. **Mock-First Data**
   - Roadmaps stored in memory (`backend/src/data/roadmaps.ts`)
   - Can persist to database later without API changes
   - Keeps MVP moving without Supabase setup blocker

4. **Minimal Dependencies**
   - Only core: Express, Next.js, Supabase, Zod, Tailwind
   - No unnecessary libraries
   - Keeps bundle small and deployment fast

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check dependencies
npm install --prefix backend

# Verify TypeScript
npm run typecheck --prefix backend

# Check port conflicts
netstat -ano | findstr :4000  # Windows
```

### Frontend can't reach backend

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend is running on `http://localhost:4000`
- Verify CORS is configured in `backend/src/app.ts`

### Type errors in frontend

```bash
npm run typecheck --prefix frontend
```

---

## 📞 Support

For questions about:

- **Architecture**: See `Initialize/AI_INSTRUCTIONS.md`
- **Features**: See `Initialize/Pathfinder PRD.pdf`
- **Current blockers**: Check `Initialize/Pathfinder DevPlan.pdf`

---

**Status**: MVP Foundation ✅ | Ready to Build ✅
