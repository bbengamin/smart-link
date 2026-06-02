# Pilot Launch Gate Checklist

**Generated:** 2026-06-02  
**Purpose:** Human decision gate for pilot launch readiness. Summarizes verified state, 20-prospect synthesis decision, and remaining approvals.

---

## ✅ Verified Demo URL (Use This Now)

The working public demo: `https://smart-link-app-swart.vercel.app/`

This is the correct, live demo that prospects should see. Smoke checks confirm it returns HTTP 200 with the "Request Your Free Pilot" CTA and mailto form intact.

**Do NOT use:** `https://smart-link-mu.vercel.app/` — currently broken (404). See [`docs/vercel-alias-repair.md`](./vercel-alias-repair.md) for repair runbook.

---

## 👥 20-Prospect Synthesis Decision: **Narrow**

After reviewing 20 manually reviewed prospects across 3 batches, the synthesis decision is to extend with stricter filters, not broaden.

### Verdict distribution
| Status | Count |
|--------|-------|
| Go     | 6     |
| Wait   | 14    |
| No-Go  | 0     |

**Pattern:** No No-Gos, but 70% Wait ratio signals the wedge works best for shops with strong visible demand signals.

### Top 3 priority prospects (from Go set)

1. **Gerritsen Barber Shop & Hair Salon** — strongest visible activity (571 IG posts), highest confidence
2. **Kings Barber Shop** — OSM shows live storefront, full-week hours, steady demand signals
3. **Percy's Unisex Barber Shop** — long operating hours (Mon-Sat), named operator, strong fit

See `docs/seeded-profile-experiment-synthesis.md` for full decision context and filtering criteria.

---

## 🔧 Broken Vanity Alias Repair (`smart-link-mu.vercel.app`)

Status: **NOT FIXED** — requires manual intervention in Vercel dashboard or CLI. This is a separate housekeeping item that does not block pilot outreach.

---

## 👥 First-Wave Outreach Approval Queue (5 Prospects Awaiting Human Decision)

All five first-wave prospects have been prepped and await explicit human approval before any first-touch outreach. Do not auto-send — review each entry in [`docs/outreach-log.md`](./outreach-log.md).

| # | Prospect | Channel | State |
|---|----------|---------|-------|
| 1 | Gerritsen Barber Shop & Hair Salon | Instagram DM → Email | `approval_requested` |
| 2 | Kings Barber Shop | SMS → Phone | `approval_requested` |
| 3 | Percy's Unisex Barber Shop | SMS | `approval_requested` |
| 4 | Naespa Nails & Hair Salon | SMS | `approval_requested` |
| 5 | Radiant Reflections Beauty Salon | SMS → Phone | `approval_requested` |

**Full details:** [`docs/outreach-log.md`](./outreach-log.md)  
**Synthesis decision:** [`docs/seeded-profile-experiment-synthesis.md`](./seeded-profile-experiment-synthesis.md)

---

## 🎯 Nearspoke Domain Registration Decision

Status: **PENDING DECISION** — domain registration for `nearspoke.com` (or target TLD) has not been confirmed/purchased yet.

**Question for owner:** Should we proceed with nearspoke domain registration as the primary brand anchor, or stay on vanity-subdomain pattern for now?

Refer to related GTM docs:
- [`docs/gtm-seeded-profiles-decision.md`](./gtm-seeded-profiles-decision.md) — experiment brief and ICP
- [`docs/seeded-profile-experiment-brief.md`](./seeded-profile-experiment-brief.md) — narrow wedge positioning

---

## 📋 What Must NOT Be Claimed Yet (Guardrails)

Do **NOT** make these assertions until verified:

- ❌ The vanity alias `smart-link-mu.vercel.app` is fixed.
- ❌ Custom domain (`nearspoke.com`) is registered and serving content.
- ❌ Self-serve signup flow works end-to-end for prospects.
- ❌ Owner deposit/payment collection is operational.
- ❌ Telegram owner-alerts webhook is active and verified.
- ❌ Full automated analytics/reporting is production-ready or fully instrumented end-to-end.

See the detailed guardrails in:
- [`docs/outreach-workflow-approved.md`](./outreach-workflow-approved.md) — state machine for outreach approvals
- [`docs/pilot-outreach.md`](./pilot-outreach.md) — pilot mechanics
- [`docs/mvp-demo-handoff.md`](./mvp-demo-handoff.md) — demo scope

---

## 🔗 Related Docs (Read Before Launching)

| Doc | Purpose |
|-----|---------|
| [`docs/seeded-profile-experiment-synthesis.md`](./seeded-profile-experiment-synthesis.md) | 20-prospect synthesis decision (Narrow), top-3 prospects, filtering criteria |
| [`docs/outreach-log.md`](./outreach-log.md) | Full contact log with timestamps, states, UTM tags |
| [`docs/first-wave-approval-summary.md`](./first-wave-approval-summary.md) | Human-readable approval queue for 5 first-wave prospects |
| [`docs/vercel-alias-repair.md`](./vercel-alias-repair.md) | Broken alias repair runbook |
| [`docs/mvp-demo-handoff.md`](./mvp-demo-handoff.md) | Demo scope and current pilot offer framing |
| [`docs/seeded-profile-prospect-review-checklist.md`](./seeded-profile-prospect-review-checklist.md) | Internal prospect validation checklist (private) |

---

## ✅ Verification Note

Verified on 2026-06-02. Checks performed:
- Confirmed `https://smart-link-app-swart.vercel.app/` returns HTTP 200 with pilot CTA
- Confirmed `https://smart-link-mu.vercel.app/` still returns HTTP 404
- Verified markdown links resolve correctly (outdated `docs/pilot-offer.md` reference removed)
- Updated owner-facing docs to reflect 20-prospect synthesis decision and top-3 prospects

---

**Workspace:** `/opt/data/autonomous/smart-link`  
**Status:** Awaiting owner decisions on alias repair, domain registration, and outreach approvals for top-3 prospects.  
**Do not proceed with automated outreach until all `approval_requested` entries are reviewed.**
