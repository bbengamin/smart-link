# Seeded-Profile Experiment Synthesis

**Date:** 2026-06-02
**Review pass:** Full synthesis after 20 total manually reviewed prospects across 3 batches (Batch 1: rows 1-10, Batch 2A: rows 11-15, Batch 2B: rows 16-20)
**Scope:** NYC barbershop/salon manual review pilot

---

## Decision: **Narrow** — extend with stricter filters, not broader outreach

After reviewing all 20 prospects, the verdict distribution is:

| Verdict | Count |
|---------|-------|
| Go      | 6     |
| Wait    | 14    |
| No-Go   | 0     |

**No No-Gos — but a high Wait ratio (70%) signals the wedge works best only for shops with strong visible demand signals.** The booking-gap weakness is real across all batches, but Batch 2B's average confidence drifted down from Batch 1. To hit the decision boundary of 20 without bloating the experiment into a broad CRM strategy, we need to tighten filters.

**Continue? Yes — but narrow:** Extend to ~5-8 more targets, but **only** when they show:
- Active Instagram with visible posts/reels (not just profile placeholder)
- Public reviews on Google Maps/Apple (≥3 ratings)
- At least one explicit booking link or clear online ordering flow in OSM metadata

This keeps us under the 20-attempt cap while improving signal-to-noise.

---

## What drove the verdicts? (Pattern synthesis across all 3 batches)

### **Strongest demand signals (Go set, n=6)**

Shared traits across Batch 1 and late Batch 2B Go prospects:
- Active Instagram profiles with visible recent posts/reels (not just bio placeholder)
- Clear service/menu or hours in public metadata suggesting steady local traffic
- At least one explicit contact channel beyond phone-first handling (email, DM invite, Google Business messaging link)

**Batch 1 Go set:** Gerritsen, Kings, Percy's, Naespa — all showed richer social activity than the average directory listing.

**Late Batch 2B exceptions:** Studio Unisex and Cariba Beauty both had detailed OSM hours metadata and consistent operational signals despite lacking rich IG presence in this pass.

### **The Wait cluster (n=14)**

Most failures to make Go didn't mean weak ICP fit — they meant:
- Directory-level presence without proof of active customer engagement (no reviews, no social activity)
- Phone-first contact patterns with no visible online booking alternative
- OSM listings showing basic phone hours but no richer metadata signals

Batch 2A entirely fell into Wait territory; Batch 2B was mixed (2 Go, 3 Wait). This batch progression shows the filter is working — we're not accepting thin directory profiles anymore.

### **Risk profile**

Every prospect still showed:
- Booking-gap weakness (no clean flow to scheduling or payments)
- Fragmented contact paths (phone/SMS primary)
- Medium-to-medium-low confidence scores overall

That's why the Wait count is high — these aren't bad shops, they're just harder to reach and validate without stronger demand signals.

### **Compliance guardrails**

All sourcing stayed manual: public Instagram metadata (post counts, follower counts, bio content), OSM/Nominatim business listings with hours/contact data, no scrapers, no bulk imports, no private PII exposed.

---

## Top 3 candidate profiles for human review (actual names)

The parent handoff identified 6 "Go" prospects across 3 batches. For immediate first-wave approval, prioritize these top 3 from the Go set:

1. **Gerritsen Barber Shop & Hair Salon** — Batch 1; strongest visible activity with 571 IG posts, bio lists services/phone/address, highest confidence prospect
2. **Kings Barber Shop** — Batch 1; OSM shows live storefront with full-week hours plus card acceptance evidence of steady demand
3. **Percy's Unisex Barber Shop** — Batch 1; long operating hours (Mon-Sat) plus named operator, strong local-service fit

*(Alternative Batch 2B Go prospects if preferred: Studio Unisex Barber Shop or Cariba Beauty Salon Inc)*

See `docs/seeded-profile-prospect-review-checklist.md` for full prospect details and scoring.

---

## Approval gate (before any public seeded profile work)

Human sign-off required before:

1. **Outreach template approval:** Confirm first-wave message is approved; no unapproved templates
2. **Prospect list sign-off:** Approve top-3 outreach targets from the Go set by name
3. **Demo URL verification:** Ensure smart-link-app-swart.vercel.app is live and accessible via chosen channel

**Gate condition:** Do not proceed with outreach, profile publishing, scraping, or public experiment until human approves this synthesis + prospect list in one action.

---

## How to proceed (next smallest action: human-gated synthesis approval)

**Recommended action:** Extend experiment ~5-8 more attempts but **only** when prospects meet stricter visible-demand filters (IG activity + reviews + booking links). Do not expand beyond the 20-attempt decision boundary.

**Next smallest follow-up actions:**
- Review Go-set prospects in `docs/seeded-profile-prospect-review-checklist.md`
- Approve outreach targets and message template via human sign-off on this synthesis doc
- Verify demo URL is live and accessible via chosen channel
- Schedule first-wave outreach window for top-3 only (not batch)

**Note:** This synthesis replaces the earlier `t_11782647` decision point which was based on only 10 prospects. The 20-prospect view shows we must narrow, not broaden.

---

## Constraints / non-goals (preserved)

- No scraping of public or private data
- No publishing seeded profiles publicly
- No unapproved outreach to prospects
- No private PII in public-facing docs
- No expansion into CRM or broad acquisition strategy at this stage

---

**Workspace:** `/opt/data/autonomous/smart-link` (dir)  
**Sources used:** Public Instagram metadata; OSM/Nominatim listings from `docs/pilot-outreach.md`  
**Verification method:** Manual public facts only — no scraper or bulk import used

## Verification / proof of done

- [x] Synthesis explicitly uses all 20 reviewed prospects across 3 batches (not just first 10)
- [x] Includes Go/Wait/No-Go counts: 6 / 14 / 0
- [x] Pattern notes included for both strong and weak signals
- [x] Sharp continue/narrow call made with visible-demand filter criteria
- [x] Consent-safe constraints preserved (no outreach sent, no public profiles published, no scraping used)
- [x] Human-gated approval step identified (synthesis + prospect list sign-off)
- [x] Supersedes earlier `t_11782647` 10-prospect synthesis with updated decision
