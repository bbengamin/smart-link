# Nearspoke — Business Operator Status

Date: 2026-06-02
Audience: Nearspoke business owner/operator
Purpose: Operator snapshot for the project and pilot motion. This is not the future in-app salon dashboard.

## 1) Executive snapshot

The product is still real: demo-mode MVP flows exist for profile pages, booking, client list, admin dashboard, reviews, AI-readable profile data, and distribution surfaces.

Business operations are now structured with a completed 20-prospect seeded-profile synthesis (`docs/seeded-profile-experiment-synthesis.md`) showing a **Narrow** decision: extend to 5-8 more targets but only when they show strong visible demand signals (active Instagram, public reviews, booking links). The demo URL is verified live at `https://smart-link-app-swart.vercel.app/`, though the vanity alias `smart-link-mu.vercel.app` remains broken.

The blocked lane (18 cards) includes real human gates plus stale review/superseded junk that should be archived instead of haunting the board. See task queue below for actionable items.

## 2) Current public / conversion truth

Verified on 2026-06-02:
- `https://smart-link-app-swart.vercel.app/` -> HTTP 200 (working demo with CTA)
- `https://smart-link-mu.vercel.app/` -> HTTP 404 (broken vanity alias)

Operator truth:
- Nearspoke has a live public homepage with pilot CTA on the app deployment.
- The vanity URL is still broken — don't claim it's healthy until repointed.
- Top-3 outreach targets from synthesis: Gerritsen, Kings, Percy's (all Batch 1 Go prospects).

## 3) Board state (`smart-link`)

From 2026-06-02 snapshot:
- archived: 19
- blocked: 18
- done: 98
- ready: 4
- running: 1
- todo: 5

Interpretation: Machine still moving (98 done, 4 ready, 1 running), but 18 blocked is too much. Several are review leftovers or superseded outreach lanes that should be archived.

## 4) Human gates that actually matter

### A. First-touch outreach approval still blocks real pilot motion

From `docs/outreach-log.md` — 5 prospects awaiting human approval:
- Gerritsen Barber Shop & Hair Salon: `approval_requested` (IG DM → Email)
- Kings Barber Shop: `approval_requested` (SMS → Phone)
- Percy's Unisex Barber Shop: `approval_requested` (SMS)
- Naespa Nails & Hair Salon: `approval_requested` (SMS)
- Radiant Reflections Beauty Salon: `approval_requested` (SMS → Phone)

Smallest human action: Approve or reject the prepared first-touch templates for top-3 targets (Gerritsen, Kings, Percy's).

### B. Nearspoke domain ownership is still a human-only gate

Track: docs-only (pending registrar action)

Current truth:
- Rebrand direction effectively GO
- Actual registrar action and recording for `nearspoke.app` and `nearspoke.com` not done yet

Smallest human action:
- Re-check domain availability
- Buy if desired

### C. Demo URL / outreach verification is live

Track: docs-only (verified public demo at smart-link-app-swart.vercel.app/)

Current truth:
- Local build/typecheck passed
- Working demo live at `https://smart-link-app-swart.vercel.app/`
- Vanity alias still broken (404) due to wrong Vercel project pointer

Smallest human action:
- Repoint vanity alias or explicitly bless the working app URL as operator-facing demo URL

## 5) Outreach approval state

The outreach state is now durable in `docs/outreach-log.md`. First-wave queue is prepared but no first touch has been approved/sent yet. The machine has stopped losing outreach state — it hasn't crossed into actual approved contact yet.

## 6) What is not the main problem right now

- Product is not the main problem — enough MVP surface exists
- Another giant planning rewrite is not the blocker today
- Pricing tweaks are not the main issue
- Real business gaps: approval, clean public URL truth, domain ownership

## 7) Next 1–3 unblocked moves (if machine keeps moving)

1. `t_6ec145c8` — Assess strategic fit of free seeded profiles as GTM wedge
2. `t_5f4cce17` — Identify legal, compliance, and operational risks
3. `t_08f0af29` — Design a thin validation experiment for the wedge

## 8) Blunt operator takeaway

Nearspoke is short on three specific forms of reality:
- approved first outreach
- owned brand domains
- one trustworthy public demo URL (we have that at `smart-link-app-swart.vercel.app/`)

That is the state. Not catastrophic, not launch-ready, and definitely not something to sugarcoat.
