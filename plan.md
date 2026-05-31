# Smart Link Project Plan

## Goal
Build a smart business link for local companies (booking, CRM, AI-indexing) that is highly autonomous.

## Product Statement
One AI-ready link for local businesses to get discovered, contacted, and booked from maps, search, and messaging apps.

## MVP Scope
The first version stays deliberately small:
- Smart business profile link
- Contact buttons: WhatsApp, SMS, phone, email
- Basic booking form
- Business dashboard
- AI-readable structured profile
- Telegram alerts for the business owner
- Simple client list

Do **not** start with a full CRM. Start with the link + booking + lead capture, then grow into deeper client management only after the simple flow works end-to-end.

## Current Status
- **Phase:** Phase 5 MVP-adjacent visibility/distribution is underway on the live `smart-link` board.
- **Priority:** Finish the smallest production-ready loop: public smart link, booking/lead capture, dashboard/client visibility, AI-readable profile, owner notification paths, and a real deployment URL.
- **Operating model:** Kanban-first autonomous loop on board `smart-link`; the live board is the execution ledger, and this plan is strategy/roadmap only.

## Autonomous Architecture (Kanban-First)
- **Board:** `smart-link`
- **Board workdir:** `/opt/data/autonomous/smart-link`
- **Source of truth split:** `plan.md` holds strategy, architecture, and milestone ordering; Kanban holds active execution, blockers, retries, and handoffs.
- **Operating model:** Smart Link is not just a product build loop. It is intended to become a self-improvement system that can eventually run the business end-to-end.
- **Worker topology rule:** Do **not** model the system as a strict hierarchy. Treat it as a linear/shared operating loop of independent workers that read and write common state through the `smart-link` board plus project markdown/log files. Workers may influence each other through artifacts and board state, but no worker is the permanent boss of the others.
- **Three-worker model:**
  - **Product worker:** reconciles roadmap vs board, keeps the ready queue alive, and routes/builds product-delivery work through Kanban tasks.
  - **Process retro worker:** inspects execution quality itself — crash loops, stale cards, duplicate work, weak handoffs, tooling/auth failures, and missing operational rules — and creates `[PROCESS] ...` cards when the machine needs improvement.
  - **Business operator worker:** inspects the larger business system — distribution, go-to-market, deployment readiness, onboarding, analytics, reporting, pricing/offer clarity, customer feedback loops, and other non-product operating gaps — and creates the next smallest concrete business-improvement card when a missing lane is found.
- **Coordination rule:** These workers coordinate through shared artifacts, not command chains. Their communication surfaces are: Kanban card state, card comments, blockers, handoff summaries, `plan.md`, and session logs under `logs/`.
- **Worker rule:** The scheduled product worker is a board reconciler/orchestrator, not a feature implementer. Its job is to compare `plan.md` with the `smart-link` board, create/migrate missing cards, and keep blockers/handoffs clean.
- **Process-improvement rule:** The process retro worker must improve the operating system around the work: when it sees crash loops, duplicate cards, stale running tasks, missing setup docs, weak handoffs, or repeated human confusion, it should create/update a process-improvement card on `smart-link` and patch this plan when the operating rules need to change.
- **Business-improvement rule:** The business operator worker must look beyond feature throughput. If Smart Link is shipping code but neglecting business readiness, customer acquisition, owner visibility, deployment hardening, feedback loops, or monetization clarity, it should create/update the smallest concrete card that closes that gap instead of writing a grand essay and calling it strategy.
- **Metrics-before-scale rule:** Before scaling outreach or distribution, Smart Link must be able to answer the basic business questions: who visited, which source brought them, which contact/booking action they took, and what the owner should do next. If that loop is missing, create a small analytics/reporting card before piling on more acquisition work.
- **Offer-before-outreach rule:** Before pushing customer acquisition harder, Smart Link needs one concrete pilot offer a barbershop/salon owner can understand and accept: promise, scope, setup steps, price/free-pilot terms, and next action. Outreach without an offer is just yelling into the void with nicer shoes.
- **Learning-loop-after-outreach rule:** Every pilot/demo lane needs a tiny feedback capture path before it scales: owner objections, setup friction, willingness-to-pay, must-have blockers, and the next follow-up state. Do not build a CRM to learn from five conversations; write down the damn learning loop first.
- **Blocker-handoff rule:** Blocker cards must record the exact missing external input, current verification state, and the smallest next human action. If a workaround would require product-code changes, that work belongs in a separate product card instead of being smuggled into a blocker investigation.
- **Deployment-completion rule:** Deployment cards do not get to call themselves done just because a CLI command returned something URL-shaped. A deploy card may complete only after it verifies the exact production URL/repo provenance it changed and records a publicly reachable smoke test result. If the push, alias, auth, or repo publish step is still blocked, the card must stay blocked or spawn an explicit follow-up card for the remaining work instead of laundering an unfinished deploy into a victory lap.
- **Auth/tooling-failure fallback rule:** If Hermes auth/model access is broken, or the cron run lacks live Kanban/CLI tooling and cannot actually create/archive board cards, it must record the exact intended card title/action in `plan.md` + the session log instead of pretending the board is clean. Fake hygiene is just dirt wearing cologne.
- **Kanban-handoff rule:** A dispatched Smart Link worker does not get to end on a nice-sounding text reply. If it has reached a conclusion, the same turn must call `kanban_complete` or `kanban_block`. If browser/tool bootstrap fails or verification cannot proceed, block with the exact reason; do not clean-exit after saying "I'll check" or "looks implemented". Repeated `rc=0` protocol violations are process defects, not acceptable task outcomes.
- **Thin-backlog guard:** If the live board is down to blockers plus one running/crashy deployment lane while Phase 5 roadmap work remains, create the next smallest unblocked MVP-adjacent card (visibility, distribution, QA, docs, or deployment hardening). Do not report “all accounted for”; that phrase is how backlog rot gets a nice hat.
- **Execution rule:** Product work happens inside dispatched `smart-link` Kanban tasks, not inside the cron tick itself.
- **Non-blocking autonomy rule:** If one lane is waiting for human approval, external credentials, domain purchases, tokens, or account access, the system must keep working other unblocked lanes instead of treating the whole project as paused.
- **Backlog rule:** The system should keep at least a small ready queue of concrete next-step cards across product, process, and business lanes. A blocked approval is not an excuse for an empty board when other useful work can still move.
- **Watcher rule:** Watch both `plan.md` and the `smart-link` board; notify only for blockers, crash loops, stale cards, or plan/board drift that needs a human call.
- **Retrospective rule:** Run a lightweight recurring process review that looks for board rot, recurring failures, and automation gaps, then recommends the smallest high-leverage fix instead of dumping a novel.
- **Lane/tag convention:** Hermes Kanban does not give us rich labels here, so use a strict title-prefix convention instead. Product-delivery cards keep normal feature titles (`Supabase: ...`, `Build: ...`, `Deploy: ...`). Process/flow cards MUST start with `[PROCESS] `, for example `[PROCESS] tighten blocker handoff for external credentials` or `[PROCESS] archive stale duplicate review cards`. Business/operating-system cards should use concrete titles tied to the missing lane (`Analytics: ...`, `Distribution: ...`, `Onboarding: ...`, `Pricing: ...`, `Reporting: ...`) instead of vague strategy sludge.
- **Process-card rule:** The process retro job may create or update only `[PROCESS] ...` cards for operational fixes. Do not bury process work inside feature cards, and do not create vague meta-cards without a concrete operating defect and fix target.
- **Legacy-board rule:** Do not keep Smart Link work running on the default board. Recreate any still-valid cards on `smart-link`, then archive the legacy cards.
- **Smell to avoid:** using the default board for project work. That's how tasks turn into soup.

## Tech Stack (Decided 2026-05-28)
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js 16.2.6 (App Router) | SSR for SEO, edge CDN, modern React |
| Styling | Tailwind CSS + shadcn/ui | Rapid iteration, accessible components |
| Backend | Next.js Server Actions | Monorepo simplicity, no separate backend |
| Database | Supabase (PostgreSQL) | Auth + RLS + Storage + PostGIS, free tier |
| ORM | Drizzle ORM + Drizzle Kit | Lightweight, TS-first, SQL API |
| Hosting | Vercel (Hobby → Pro) | Zero-config Next.js, free tier generous |
| Email | Resend | React templates, 3k free emails/mo |
| SMS | Twilio | Pay-per-use, reliable confirmations |
| Storage | Supabase Storage | RLS-integrated, part of Supabase ecosystem |
| Monitoring | Sentry | Free tier, Vercel integration |
| **Fallback** | Cloudflare Pages | If Vercel pricing becomes an issue |

### Alternatives Rejected
- **Prisma:** Heavier runtime, slower cold starts, larger bundles
- **Firebase:** Vendor lock-in, NoSQL limits complex queries
- **Strapi:** Self-hosted = ops overhead, contradicts low-maintenance goal
- **Astro:** Better for content, worse for booking/CRM interactivity

### MVP Niche: Barbershops & Local Salons
- High volume, recurring appointments, visual-first, price-sensitive
- Clear ICP for early feedback

### MVP Cost Estimate: $0-3/month for first 100 businesses

## Task Queue

### Phase 0: Foundation & Strategy ✅ COMPLETE
- [x] **Define Tech Stack:** Next.js 15 + Supabase + Vercel + Drizzle + Resend. See `logs/tech-stack-decision.json`.
- [x] **Refine MVP Scope:** Barbershops/salons niche. v1 = profile page + booking + SMS confirmation + admin dashboard. See `logs/tech-stack-decision.json`.
- [x] **Design System Architecture:** See architecture notes below.

**Architecture Notes:**
- Profile pages: SSR via Next.js App Router at `/business/{slug}`
- JSON-LD injected for AI indexing (Schema.org LocalBusiness + BarberShop)
- DB: businesses, users, services, bookings, reviews tables with RLS
- SEO: Full SSR, dynamic sitemaps, Open Graph tags per business

### Phase 1: Smart Link (MVP)
- [x] **Setup Repo & CI/CD:** Local Next.js 15 app initialized, Drizzle schema defined, build verified locally. (2026-05-28)
  - Next.js 16.2.6 + Turbopack build passes
  - Drizzle ORM + pg-core schema for businesses/users/services/bookings/reviews
  - Supabase client configured with placeholder values for local dev
  - Missing deps resolved: drizzle-orm, drizzle-kit, pg, @types/pg
  - Note: Supabase project still needs to be created for real env vars
- [x] **Build Core Profile Page:** Responsive HTML/CSS with contact buttons, services list, hours. (2026-05-29)
  - Full business profile page at `/business/[slug]` with SSR
  - Demo mode with seeded data (Cut's Barbershop, Luxe Salon & Spa)
  - JSON-LD structured data for AI indexing
  - Contact buttons: Call, WhatsApp, Email, Google Maps Directions
  - Hours display with "Open now" status detection
  - Home page updated with live demo cards linking to sample profiles
  - Build verified: passes TypeScript + static generation
- [BLOCKED] **Connect Supabase (Live DB):** Create Supabase project, set env vars, run migrations, verify data flow.
- [x] **Add SEO/AI Structured Data:** JSON-LD is implemented. Added:
  - Dynamic sitemap generation (`src/app/sitemap.ts`) — demo data + Supabase fallback
  - Open Graph image endpoint (`src/app/api/og/[slug]/route.tsx`) — dynamic OG images
  - robots.txt (`src/app/robots.txt/route.ts`) — AI crawler rules
  - **Build verified:** All routes compile, static generation passes

### Phase 1 Definition of Done
- A business can share one link from maps, social, QR, or chat.
- A customer can view services, hours, map/location context, and contact buttons.
- A customer can submit a simple booking/lead form.
- The owner can see submitted leads/bookings in a simple dashboard/list.
- Structured data is readable by search engines and AI systems.
- Telegram alerting exists for owner notifications, even if deeper CRM workflows are still absent.

### Phase 2: Booking & Intake
- [x] **Build Booking Form:** Multi-step client-side booking form at `/business/[slug]/book` — date picker (30-day lookahead with availability dots), service selection with time slot grid (30-min intervals based on business hours), customer details form, confirmation page. Demo mode stores to localStorage; live mode inserts to Supabase + sends SMS (Twilio) + email (Resend). Build verified. (2026-05-29)
  - Profile page "Book Appointment" button now links to `/business/[slug]/book`
  - Calendar with month navigation, disabled past/closed days
  - Time slot generation based on service duration + business hours
  - Progress bar, responsive layout
- [x] **Demo Booking Viewer:** Added `/demo/bookings` page to view demo bookings stored in localStorage. Shows booking details, status, timestamps. (2026-05-29)
- [BLOCKED] **Database Integration:** Store bookings in Supabase. (BLOCKED: requires Supabase project creation and credentials)
- [BLOCKED] **Email/SMS Notifications:** Code is in server action (`/business/[slug]/book/action.ts`). BLOCKED by API keys (RESEND_API_KEY, TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN). (BLOCKED: requires API key configuration)

### Phase 3: CRM & Hub
- [x] **Business Dashboard (Demo):** Admin panel at `/admin/dashboard` with stats, bookings chart, top services, and quick actions. Uses mock data. Build verified. (2026-05-29)
- [BLOCKED] **Business Dashboard (Live):** Connect to Supabase for real data. (BLOCKED: requires Supabase project)
- [x] **Client List View:** Demo-mode client list at `/admin/clients` with mock data. Shows all clients with stats (bookings, total spent, favorite service), status badges (active/new/inactive), filter tabs, call button. 12 demo clients seeded. (2026-05-29)
- [BLOCKED] **Telegram Integration:** Alerts for new bookings. (BLOCKED: depends on database + API key)

### Phase 3b: Reviews ✅ COMPLETE
- [x] **Reviews System:** Added customer reviews to business profile pages (`/business/[slug]`). Features:
  - Average rating display with star visualization
  - Individual review cards with avatars, ratings, dates, and comments
  - "Write a Review" form (client-side, localStorage in demo mode)
  - Demo reviews seeded for all 3 businesses (13 total reviews)
  - Live mode ready for Supabase integration (review table exists in schema)

### Phase 4: AI & Automation
- [x] **AI Profile Indexing:** Enhanced JSON-LD (geo, aggregateRating, sameAs, makesOffer) + added `/api/ai/[slug]` structured data endpoint for LLM consumption. Build verified.
- [BLOCKED] **Auto-content Generation:** AI to fill business descriptions. (BLOCKED: requires OpenAI/Anthropic API key)

### Phase 5: Maps and AI Dominance
| **[DEFECT RECORD]** QR/messaging implementation (`t_3232cc1b`) hit 4× 1800s timeouts + 1× signal-7 crash across 60+ minutes. Still blocked on run 61 despite multiple retry cycles. **Fix applied:** Created executable split replacements (`t_a4b1cee2` for QR-only, `t_1cd7d0eb` for copy/templates-only) with `/opt/data/autonomous/smart-link` workspace and proper parent-child fan-in via QA card `t_c0d4a87f`. Original `t_3232cc1b` blocked/retired per split-before-retry rule.
|- [ ] **Visibility optimization:** Improve map/search/AI discoverability so business pages surface better in local discovery flows.
|- [ ] **Distribution surfaces:** Make the smart link usable from maps, websites, QR codes, socials, and messaging apps without rewriting the product each time.

### Split-Before-Retry Rule (NEW 2026-05-30, updated 2026-05-30)
|| **Operating rule:** When an implementation card has exceeded its timeout limit (>1800s) OR crashed repeatedly (signal-7, OOM), and still hasn't completed after 2+ failed attempts, the next reconciler/worker MUST NOT retry the same oversized scope. Instead:
|||- **Document** the failure pattern in a comment explaining why this card timed out/crashed (signal-7 = system-level OOM, not product bug)
|||- **Create smaller replacement cards** that isolate specific sub-tasks (e.g., "QR generation only", "messaging templates only", "copy-only") with narrower scopes
|||- **Leave the original card blocked/archived** as a record of what didn't work; don't keep feeding it fresh runtime cycles
|||- **Split only once per lane.** If the replacement card is already tiny/atomic (docs-only, checklist-only, verification-only, single-route patch) and it still dies with `pid not alive` or signal-7 after 2 failed attempts, do not spawn another near-identical clone.
|||- **Route around atomic-card crashes.** Mark the tiny replacement blocked with the exact crash evidence, keep other unrelated unblocked work moving, and create at most one process/infra escalation card if the runtime defect itself needs follow-up.
|| **System-level note:** Signal-7 crashes on Linuxkit hosts are often s6 supervisor memory limits or host OOM, not application bugs. If multiple unrelated cards crash with signal-7, the fix may require higher worker memory limits at the container/host level — document the pattern and let infra team address.
|| **Anti-clone note:** A tiny docs/product card that already represents the smallest sensible scope is evidence of a sick runtime, not evidence that the backlog needs another haircut. After one split, route around or escalate; do not breed replacement-card confetti.
|| This rule prevents small feature tasks from turning into "haunted house" crash loops where one big card keeps growing instead of splitting.
|| Example: QR code implementation that can't complete in one scope → split into `/qr/page` updates and `/api/qr` route, then messaging templates as a follow-up card after those pass. Counter-example: a docs-only pilot checklist card crashes twice with signal-7 → stop cloning it, keep the crash note, and move another lane instead.

## Blockers
- **Deployment URL (NOT VERIFIED):** The earlier `t_21ed1d6f` completion was a false positive. Independent checks now return HTTP 404 for both `https://smart-link-mu.vercel.app` and `https://smart-link-3zy7fux30-ihorbohdanov-5540s-projects.vercel.app`, so production reachability is not proven. Follow-up work lives in `t_f0b63354` (verify public Vercel access / alias) and `t_c3909dfb` (publish the actual Smart Link repo from the real project workspace). Do not treat deployment as complete again until one public production URL is reachable and tied to the repo that was actually pushed.
- **Auto-content Generation:** Optional later feature; still requires an OpenAI/Anthropic API key before autonomous description generation can ship.
- **Resolved live-board blockers:** Supabase (`t_fe2f8310`), DB/build verification (`t_d10bdf5b`/`t_d9162aa0`), email (`t_fc7de140`), SMS (`t_f3773486`), and worker crash-loop diagnosis (`t_d1b7483c`) are `done` on the live `smart-link` board as of the 2026-05-29 reconciler tick.
- **Worker Auth / Model Access (FIXED 2026-05-29):** Hermes uses Bitwarden Secrets Manager against `https://vault.bitwarden.eu` with the Smart Link project configured. Current board hygiene is not blocked on missing Codex credentials.

## Board Reconciliation Queue ✅ HEALTHY
- [x] **Deployment follow-up created:** `t_21ed1d6f` — install/use Vercel CLI, push production, verify public URL, and capture the deployment URL instead of treating a blocked push as complete.
- [x] **MVP QA fan-in created:** `t_1fbd564d` — waits on visibility (`t_b7f743ee`) and distribution (`t_ce0c820a`) before running an end-to-end MVP smoke test.
- [x] **Process guard created:** `t_92da0b26` — fixes the operating defect where a deployment card can be completed while its core push remains blocked.
- [x] **Visibility: local discovery landing/profile snippets:** `t_b7f743ee` created on `smart-link` to improve Phase 5 discoverability without CRM bloat. Scope: audit profile metadata, sitemap, `/api/ai/[slug]`, OG output, JSON-LD, and demo business content; add the smallest useful improvements for barbershop/salon local search and AI-readable snippets; verify build.
- [x] **Distribution: QR/social/messaging handoff surfaces:** `t_ce0c820a` created on `smart-link` because the ready queue was empty while deployment was blocked. Scope: add lightweight UI/docs/copy affordances showing how a business can use the smart link from QR, Instagram/social bios, WhatsApp/SMS, websites, and Maps profiles; keep it MVP-adjacent, not platform-bloat.
- [x] **Outreach: first 5-shop pilot prospect list:** `t_f8b8fbf1` created on `smart-link` because product, analytics/reporting, deployment, and pricing are now represented, but the business still lacked a concrete customer-acquisition/feedback lane. Scope: hand-curate 5 barbershop/salon prospects, draft the contact script from the pilot offer, and define tracking tags/source fields before any human sends outreach.
- [x] **Feedback: pilot learning loop:** `t_0100f800` created on `smart-link`, gated behind onboarding card `t_2836742f`, because outreach/onboarding without a structured way to capture objections, setup friction, price reaction, and follow-up status would waste the first real conversations.
- [x] **Supabase blocker recreated on `smart-link`:** `t_fe2f8310` — ready for setup-guide handoff (blocked on human credentials + migration).
- [x] **Resend blocker recreated on `smart-link`:** `t_fc7de140` — invalid key documented, awaiting replacement.
- [x] **Twilio blocker recreated on `smart-link`:** `t_f3773486` — API-key auth mode fixed, phone number/creds needed.
- [x] **Telegram: booking alerts:** `t_9a3c2b1d` — represented on `smart-link`; blocked on Telegram bot token + recipient config. Optional lower-priority feature.
- [x] **AI: auto-content generation:** `t_b7e9f0c2` — represented on `smart-link`; blocked on OpenAI/Anthropic key. Optional lower-priority feature.
- **[CLEARED]** Legacy default-board straggler `t_91d91da3` (Resend/email) has been archived; invalid API key verified bad, no recreation needed. Watcher noise for this card should cease immediately. When board control returns, confirm archival is complete and stop flagging it as active.
- **[PROCESS] blocker handoff cleanup:** `t_ac0aa71a` owns recurring hygiene around vague blocker ownership, repeated default-board stragglers, and blocker investigations that start drifting into untracked product work.

## Demo Mode Status ✅ FULLY WORKING
The following features work end-to-end in demo mode (no database needed):
- **4 Demo Businesses:** Cut's Barbershop (Bronx), Luxe Salon (Manhattan), Fresh Cuts Studio (Queens), Glow Hair Studio (Manhattan)
- **Business Profile Pages:** `/business/{slug}` — services, reviews, hours, contact buttons, AI chat
- **Booking Flow:** `/business/{slug}/book` — full multi-step booking with date picker, service selection, time slots, confirmation
- **Demo Booking Viewer:** `/demo/bookings` — view bookings saved to localStorage
- **Admin Dashboard:** `/admin/dashboard` — stats, bookings chart, top services, quick actions
- **Client List:** `/admin/clients` — 12 mock clients with stats, status badges, filters
- **Reviews System:** Average ratings, review cards, "Write a Review" form
- **AI Profile Indexing:** JSON-LD structured data, `/api/ai/[slug]` endpoint

## Next Steps (Requires User Action)
1. **Replace the Resend key** → current `RESEND_API_KEY` still needs a real deliverability check or replacement if invalid.
2. **Start pilot outreach** → use the new `t_f8b8fbf1` outreach card to prepare a 5-shop prospect list and human-approved contact script before scaling acquisition.
3. **Optional later: direct Postgres / migrations** → only needed if we decide to run Drizzle migrations from a host that can reach Supabase's DB endpoint (this Linuxkit host currently cannot use the direct IPv6 endpoint, and shared-pooler discovery wasn't worth pretending was production-ready).

## Self-Improvement Rules
- Keep the product anchored to the small MVP unless the board explicitly carries a later-phase expansion card.
- When a blocker waits on the user, continue pushing unrelated MVP work, cleanup, testing, docs, deployment prep, or optional feature isolation.
- Do not confuse "one lane blocked" with "project blocked".
- If the ready queue gets too thin, create the next smallest concrete card from the roadmap instead of reporting empty progress.

## Notes
- **Self-Improvement:** Worker should update this plan if a better path is found.
- **Non-blocking:** If a task is blocked (e.g., waiting for token), Worker should attempt other unblocked tasks and keep the board populated with the next smallest useful MVP work.
- **v1 Features:** Public profile, AI-indexable structured data, booking form, SMS/email confirmation, admin dashboard, contact buttons.
- **v2 Features:** Client CRM, Telegram alerts, custom domains, theme customization, reviews.
- **Demo Mode:** When `NEXT_PUBLIC_SUPABASE_URL` is placeholder/empty, the app serves seeded demo data. This allows full testing without a live database.
- **Seed Data:** Four demo businesses (Cut's Barbershop, Luxe Salon, Fresh Cuts Studio, Glow Hair Studio) with realistic services and hours. Glow Hair Studio is a salon with color/extensions services.
- **Demo Booking Viewer:** `/demo/bookings` page shows bookings saved to localStorage. Accessible in demo mode only.
