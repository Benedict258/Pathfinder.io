# Pathfinder.io

# Development Plan

**Version:** 1.0  
**Date:** April 2026  
**Confidential:** Pathfinder.io Development Team

---

## 1. Overview

This document outlines the technical development plan for **Pathfinder.io**, an AI-powered career guidance and digital skills platform.

It covers the recommended technology stack, team structure, development phases, milestones, and risks.

The plan is designed to be executed by a small team and is structured to deliver a working MVP within **3 months**.

---

## 2. Recommended Technology Stack

| Layer                    | Technology                                      | Rationale                                                             |
| ------------------------ | ----------------------------------------------- | --------------------------------------------------------------------- |
| **Frontend**             | Next.js (React)                                 | SSR for SEO + fast load; Tailwind CSS for rapid styling               |
| **Backend**              | Node.js + Express **or** Python FastAPI         | Both are lightweight and AI-friendly                                  |
| **Database**             | PostgreSQL + Redis                              | PostgreSQL for user data and progress; Redis for caching and sessions |
| **AI / LLM**             | Anthropic Claude API                            | Conversational path discovery + roadmap explanations                  |
| **Authentication**       | Auth0 or Supabase Auth                          | OAuth 2.0, email/password, Google login                               |
| **CMS / Content**        | Sanity.io or Notion API                         | Manage roadmap content without code                                   |
| **News / Opportunities** | Custom RSS aggregator + curated manual feed     | For v1 opportunity discovery                                          |
| **Hosting**              | Vercel (frontend) + Railway or Render (backend) | Affordable and scalable                                               |
| **CI / CD**              | GitHub Actions                                  | Automated testing and deployment pipelines                            |
| **Monitoring**           | Sentry + PostHog or Mixpanel                    | Error tracking + analytics                                            |

---

## 3. Recommended Team Structure

The minimum viable team for v1 is **3 people**. An ideal team is **5**.

| Role                      | Responsibilities                                    | Priority             |
| ------------------------- | --------------------------------------------------- | -------------------- |
| **Product Lead / PM**     | Vision, roadmap, stakeholder communication, testing | Required             |
| **Full-Stack Developer**  | Frontend + backend core, API integration            | Required             |
| **AI / Backend Engineer** | AI prompt design, Claude API, recommendation logic  | Required             |
| **UI/UX Designer**        | Wireframes, visual design system, user flows        | Strongly recommended |
| **Content Curator**       | Roadmap content, resource links, news curation      | Nice to have (v1)    |

---

## 4. Development Phases

### Phase 1 — Foundation

**Goal:** Set up the project infrastructure, authentication, and basic user flows.

**Tasks:**

- Initialize repository (GitHub), project structure, CI/CD pipeline
- Set up Next.js frontend with Tailwind CSS design system
- Set up backend (Node/FastAPI), PostgreSQL database schema
- Implement authentication (Supabase Auth / Auth0) email + Google
- Build user onboarding flow (basic form-based, pre-AI)
- Deploy staging environment on Vercel + Railway
- Define and document all API contracts

---

### Phase 2 — AI Core

**Goal:** Build the AI path discovery engine and roadmap system, the heart of Pathfinder.

**Tasks:**

- Design and iterate on AI conversation prompts (Claude API)
- Build conversational onboarding multi-step path discovery flow
- Implement recommendation engine logic (background + interests + goals)
- Build roadmap data model and CMS integration (Sanity or Notion API)
- Develop interactive roadmap UI visual node-based layout
- Attach curated resources (explanation + link) to each roadmap node
- Implement **"Go Deeper"** toggle for optional extra resources
- Run user testing with 10–15 target users; iterate on AI prompts

---

### Phase 3 — Secondary Features

**Goal:** Add progress tracking, news feed, and field-based recommendations.

**Tasks:**

- Build progress tracking system (mark nodes complete, streak counter)
- Implement field-of-study recommendation logic
- Build tech news and opportunities feed (RSS aggregator + manual curation)
- Add emerging technologies tracks to roadmap library
- Implement reskilling mode (skill gap analysis flow)
- Polish UI/UX across all screens based on user testing feedback
- Perform performance optimisation audit (load times, lazy loading)
- Run security audit (penetration testing basics, data encryption check)

---

### Phase 4 — Launch Prep | Weeks 13–14

**Goal:** Prepare for public beta launch.

**Tasks:**

- Bug fixes and QA sweep across all features
- Set up monitoring (Sentry, PostHog analytics)
- Prepare onboarding email sequence for new users
- Write user documentation and FAQs
- Soft launch to Nihub community (closed beta)
- Collect feedback, fix critical issues, then open public beta
- Set up social media and community presence for growth

---

## 5. Key Milestones

| Week        | Milestone           | Deliverable                                              |
| ----------- | ------------------- | -------------------------------------------------------- |
| **Week 1**  | Project Kickoff     | Repo live, team aligned, design system started           |
| **Week 4**  | Foundation Complete | Auth working, staging deployed, DB schema finalised      |
| **Week 6**  | AI MVP              | Path discovery flow working end-to-end with Claude API   |
| **Week 8**  | Roadmap v1          | At least 5 skill tracks live with curated resources      |
| **Week 10** | Beta Feature Set    | Progress tracking, news feed, field recommendations live |
| **Week 12** | Feature Freeze      | All v1 features complete; QA begins                      |
| **Week 13** | Closed Beta         | Nihub community beta launch, 50–100 test users           |
| **Week 14** | Public Beta         | Pathfinder.io open to all; growth phase begins           |

---

## 6. Risks & Mitigations

| Risk                                            | Level  | Mitigation                                                             |
| ----------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| AI recommendations feel generic or off-target   | High   | Iterative prompt engineering with real user testing in Week 6–7        |
| Team bandwidth is small relative to broad scope | High   | Strict phase gating; cut secondary features if Phase 2 slips           |
| Claude API costs at scale                       | Medium | Implement response caching; throttle AI calls; monitor usage           |
| Content quality for roadmaps                    | Medium | Manual curation by product lead before launch; community feedback loop |
| Low initial user retention                      | Medium | Focus onboarding quality; use Nihub network for early user base        |
| No dedicated mobile app (v1)                    | Low    | Fully responsive web design covers mobile use; native app in v2        |

---

## 7. Post-Launch Roadmap (v2 and Beyond)

- Native iOS and Android apps
- Multi-language support: Yoruba, Hausa, Igbo, French (West Africa expansion)
- Institution / team mode: Nihub and other schools onboard cohorts
- Mentorship marketplace: connect learners with tech professionals
- Freemium business model: premium tracks, certificates, career services
- Community features: peer learning, discussion boards, project showcases

---

## 8. Guiding Principle

**Build the path. Guide the journey.**
