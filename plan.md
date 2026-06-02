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
  - **Product planner/specifier (GPT):** reconciles roadmap vs board, keeps the ready queue alive, and turns fuzzy goals into sharp Kanban packets that local workers can execute without mind-reading.
  - **Process retro worker:** inspects execution quality itself — crash loops, stale cards, duplicate work, weak handoffs, tooling/auth failures, and missing operational rules — and creates `[PROCESS] ...` cards when the machine needs improvement.
  - **Business operator worker (GPT):** inspects the larger business system — distribution, go-to-market, deployment readiness, onboarding, analytics, reporting, pricing/offer clarity, customer feedback loops, and other non-product operating gaps — and creates the next smallest concrete business-improvement card when a missing lane is found.
- **Coordination rule:** These workers coordinate through shared artifacts, not command chains. Their communication surfaces are: Kanban card state, card comments, blockers, handoff summaries, `plan.md`, and session logs under `logs/`.
- **Worker rule:** The scheduled GPT product worker is a board reconciler/specifier, not a feature implementer. Its real job is to compare `plan.md` with the `smart-link` board, decompose the next move into crisp task packets, and keep blockers/handoffs clean before local workers touch the work.
- **Routing rule:** Use GPT-class models for planning, decomposition, ambiguity-killing, parent/child task shaping, and strategic backlog decisions. Use the cheaper local default workers for bounded execution, verification, docs edits, route-specific fixes, and other tasks that already have a concrete acceptance target.
- **Promotion rule:** If a card still contains open design choices, cross-cutting architecture uncertainty, or a scope description that would force a local worker to invent the plan while implementing it, do not dispatch it as normal execution work yet. Promote it back to the GPT planner/specifier first and split or rewrite it.
- **Task-packet rule:** Every execution card should state, in the body or latest comment: the exact outcome, target files/routes/surfaces, verification command or observable check, key constraints/non-goals, and any dependency or parent card. If those pieces are missing, the card is not ready — it is still planning sludge.
- **Atomicity rule:** Prefer cards that a local worker can finish in one focused run with one clear proof of done. If a task wants to touch many unrelated surfaces, needs exploratory reasoning before code, or mixes implementation plus broad QA plus docs plus deploy, split it before dispatch.
- **Backlog-shaping rule:** Keep a small queue of spec-ready cards, not just a pile of ideas. The planner should maintain a few ready execution cards across product, process, and business lanes so the local workers always have something concrete to chew on.
- **Parent-card rule:** When work is legitimately multi-step, create a parent/fan-in card plus several child cards with narrower scopes instead of one heroic omnibus task. Big-sounding cards are where local models go to get lost.
- **Skill-assisted planning rule:** The GPT planner/specifier and business-operator workers should explicitly borrow strong skill patterns before emitting work: `to-prd` to turn fuzzy opportunities into crisp problem/solution language, `to-issues` to split approved directions into thin vertical slices, and `triage` to decide whether an item is still `needs-info`/planning versus actually ready for an AFK local worker. The spirit of `grill-me` / `grill-with-docs` also matters, but in headless cron mode that means pressure-testing assumptions against `plan.md`, board state, logs, and repo artifacts — not pretending a live human answered questions that were never asked.
- **Process-improvement rule:** The process retro worker must improve the operating system around the work: when it sees crash loops, duplicate cards, stale running tasks, missing setup docs, weak handoffs, weak task packets, or repeated human confusion, it should create/update a process-improvement card on `smart-link` and patch this plan when the operating rules need to change.
- **Business-improvement rule:** The business operator worker must look beyond feature throughput. If Smart Link is shipping code but neglecting business readiness, customer acquisition, owner visibility, deployment hardening, feedback loops, or monetization clarity, it should create/update the smallest concrete card that closes that gap instead of writing a grand essay and calling it strategy.
- **Metrics-before-scale rule:** Before scaling outreach or distribution, Smart Link must be able to answer the basic business questions: who visited, which source brought them, which contact/booking action they took, and what the owner should do next. If that loop is missing, create a small analytics/reporting card before piling on more acquisition work.
- **Offer-before-outreach rule:** Before pushing customer acquisition harder, Smart Link needs one concrete pilot offer a barbershop/salon owner can understand and accept: promise, scope, setup steps, price/free-pilot terms, and next action. Outreach without an offer is just yelling into the void with nicer shoes.
- **Learning-loop-after-outreach rule:** Every pilot/demo lane needs a tiny feedback capture path before it scales: owner objections, setup friction, willingness-to-pay, must-have blockers, and the next follow-up state. Do not build a CRM to learn from five conversations; write down the damn learning loop first.
- **First-wave queue rule:** Do not let one approval-blocked prospect become the whole acquisition strategy. The first 5-shop pilot wave needs a durable outreach-state log with one state and one next action per prospect, so workers can skip, approve, follow up, or advance the next candidate without turning sales ops into archaeology.
- **Inbound-conversion rule:** The public homepage cannot be a pretty brochure with no next action. Before broad distribution, it needs one honest pilot-interest CTA that matches the current offer and does not overclaim self-serve signup, custom domains, deposits, or fully automated alerts.
- **Blocker-handoff rule:** Blocker cards must record the exact missing external input, current verification state, and the smallest next human action. If a workaround would require product-code changes, that work belongs in a separate product card instead of being smuggled into a blocker investigation.
- **Deployment-completion rule:** Deployment cards do not get to call themselves done just because a CLI command returned something URL-shaped. A deploy card may complete only after it verifies the exact production URL/repo provenance it changed and records a publicly reachable smoke test result. If the push, alias, auth, or repo publish step is still blocked, the card must stay blocked or spawn an explicit follow-up card for the remaining work instead of laundering an unfinished deploy into a victory lap.
- **Auth/tooling-failure fallback rule:** If Hermes auth/model access is broken, or the cron run lacks live Kanban/CLI tooling and cannot actually create/archive board cards, it must record the exact intended card title/action in `plan.md` + the session log instead of pretending the board is clean. Fake hygiene is just dirt wearing cologne.
- **Kanban-handoff rule:** A dispatched Smart Link worker does not get to end on a nice-sounding text reply. If it has reached a conclusion, the same turn must call `kanban_complete` or `kanban_block`. If browser/tool bootstrap fails or verification cannot proceed, block with the exact reason; do not clean-exit after saying "I'll check" or "looks implemented". Repeated `rc=0` protocol violations are process defects, not acceptable task outcomes.
- **Atomic-QA dispatch rule:** QA cards must be tiny before dispatch. Prefer one of three scopes only: HTTP-only checks for a handful of public URLs, route-group checks for one surface (for example booking flow routes only, AI endpoint only, or sitemap/robots only), or docs-only follow-up that records already-verified results. Do not create or retry broad all-in-one smoke cards that mix app routes, APIs, metadata files, docs updates, and exploratory browsing in a single task.
- **QA fan-in rule:** If a larger milestone needs “full smoke coverage,” represent that as a parent/fan-in card waiting on several atomic QA children instead of one hero card. Broad smoke tasks are where clean-exit bullshit and iteration-burn go to breed.
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
- **Deployment URL (REGRESSED 2026-06-01):** `t_f0b63354` originally recovered public Vercel access, but `t_8a872aa3` later verified the vanity URL `https://smart-link-mu.vercel.app/` now returns HTTP 404 because it points at the wrong Vercel project/deployment. The updated pilot CTA is verified live on the app deployment `https://smart-link-app-swart.vercel.app/`; use that as the honest public demo URL until the vanity alias is repaired.
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

## Next Steps (Human Gates + Business Ops)
1. **Keep acquisition moving without pretending approval happened** → first-wave approval state is durable in `docs/outreach-log.md`; all five first-wave prospects remain human-gated. The 20-prospect synthesis now recommends narrowing priority to the top 3 (`Gerritsen`, `Kings`, `Percy's`) before any send. No worker should auto-send until a prospect state is explicitly approved.
2. **Keep the seeded-profile GTM wedge evidence-based before execution** → `docs/seeded-profile-experiment-synthesis.md` now records the completed 20-prospect decision: **Narrow**, not broad scale. Continue only with stricter visible-demand filters, no scraping, no public seeded profiles, and no unapproved outreach.
3. **Refresh owner visibility after the GTM decision** → `t_af7cd3c0` is ready on the live `smart-link` board to reconcile `docs/business-operator-status.md` and `docs/pilot-launch-gate-checklist.md` against the completed 20-prospect synthesis, verified demo URL, broken vanity alias, and real human gates.
4. **Publish and verify the homepage conversion fix** → the honest pilot-interest CTA is verified live on `https://smart-link-app-swart.vercel.app/`; the vanity URL `https://smart-link-mu.vercel.app/` is still blocked because it points at the wrong Vercel project/deployment.
5. **Finish board hygiene before pretending launch ops are clean** → live `smart-link` still has stale scratch-workspace Phase 5 duplicates and product/process blockers; `t_61499b9f` is running to retire duplicate scratch cards, and `t_af7cd3c0` should clean stale owner-facing business docs. Do not scale pilot touches while the board/docs are lying about what is current.
6. **Decide and lock the rebrand before public momentum hardens** → re-check `nearspoke.app`/`.com`, buy them if approved and available, then record the registrar/result so follow-up handle/DNS cards can be created.
7. **Keep public URL claims honest** → use the verified Vercel public URL from the deployment notes, but do not claim a custom domain, healthy vanity alias, or fully live owner reporting until QA/docs cards confirm it.
8. **Optional later: direct Postgres / migrations** → only needed if we decide to run Drizzle migrations from a host that can reach Supabase's DB endpoint (this Linuxkit host currently cannot use the direct IPv6 endpoint, and shared-pooler discovery wasn't worth pretending was production-ready).

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
