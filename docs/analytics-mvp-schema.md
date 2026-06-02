# Nearspoke — Analytics MVP: Funnel Metrics Schema

**Status:** ✅ Functional (demo mode), 🔄 Production vendor TBD  
**Date:** 2026-05-30  
**Owner:** Ihor  

---

## Executive Summary

Nearspoke's MVP funnel tracking is **live and functional** using localStorage-based analytics. This document captures the complete MVP schema, tracks the five-stage booking funnel from page view to completion, and recommends next steps for production migration when business volume warrants it.

**Key Decision:** Do not integrate a paid analytics vendor (PostHog, Mixpanel, Plausible, etc.) until we hit ~10K+ page views OR revenue crosses $50K/mo — at that point, evaluate based on data depth vs. cost. For now, localStorage is sufficient and zero-cost.

---

## MVP Funnel Events

The five-stage booking funnel tracks where users drop off:

| Event | Type | Tracks | Why it matters |
|-------|------|--------|----------------|
| `page_view` | Always fires on smart link page load | Business slug, referrer (utm_source, utm_medium, google/callbook/phone), user_id (from cookie) | Top-of-funnel volume, source attribution |
| `booking_start` | Fires when owner clicks booking date | None yet (can add business_slug) | Intent signal — are visitors serious? |
| `funnel_date_selected` | Fires when owner picks a date/time slot | Business slug | First engagement with calendar |
| `funnel_service_selected` | Fires when owner selects service | Business slug | Deepening intent |
| `funnel_details_entered` | Fires when details form shows | Business slug | High-intent — booking imminent |
| `booking_complete` | Fires on submit (both success and failure) | `success: true/false`, business_slug, timestamp | Conversion rate + drop-off diagnosis |

---

## Dashboard Component

**Location:**  
`smart-link-app/src/components/BusinessAnalyticsDashboard.tsx`

**Features:**
- Funnel visualization (visual bars from top to bottom)
- Live conversion rate calculation
- Traffic source breakdown (Google/phone/callbook/etc.)
- Clear data button for testing/resetting
- Works in demo mode (localStorage) and live mode (fetches via API endpoint)

**Usage:** Drop into business owner's admin panel or append to their profile page. Demo mode requires no production endpoint — perfect for early-stage owners who don't want to pay yet.

---

## Migration Path: When to Switch Vendors?

**Trigger conditions for production analytics (choose one):**
1. **Volume threshold:** 10K+ monthly page views — localStorage becomes unwieldy, need aggregation
2. **Revenue threshold:** $50K/mo revenue — owners expect business intelligence, not just funnel bars
3. **Owner demand:** "Show me my customers" or "Where are my drop-offs?" — qualitative signal

**Recommended vendors (ordered by cost → insight depth):**

| Vendor | Cost | Data Depth | When to use |
|--------|------|-----------|-------------|
| Plausible | $99/mo | Basic (pages, sources, funnels) | Simple reporting, privacy-friendly |
| PostHog | $29/mo (growth plan) | Full funnel + product analytics + feature flags | If you'll iterate heavily post-launch |
| Mixpanel | $250/mo (starter) | Advanced cohorts + retention analysis | When retention is primary KPI |
| Custom Supabase + Postgres tables | Free → $0–$150/mo (depending on volume) | Full control, custom dashboards in your stack | Build yourself once you have dev team |

---

## Recommended Next Step: MVP Schema Freeze

**Recommendation:** Document this schema now and ship. Don't change the events or properties until we hit migration trigger conditions above. Adding new events later (e.g., geo-location, device type) can be done in post-migration via A/B comparison.

**Rationale:**
- MVP schema is lean and focused on conversion rate optimization (CRO)
- Funnel visualization + source attribution provides immediate value to early owners
- Zero cost allows rapid iteration on landing page copy and CTAs before committing to paid analytics

---

## Appendix: Event Property Schema

```typescript
// Page view event (fires on client-side)
{
  id: "sl-evt-abc123",           // client-generated ID
  event_type: "page_view",        // canonical event name
  timestamp: "2026-05-30T14:23:11.847Z",
  properties: {
    business_slug: "acme-towing-company",
    referrer: "https://google.com/",        // full URL + query params stripped
    utm_source: "google",                   // if present
    utm_medium: "cpc",                      // if present
    utm_campaign: "towing-ad-q2",          // if present
    user_id: "usr_8a7b6c5d4e3f",            // optional: from cookie/SSO
  }
}

// Booking complete event (fires on form submit)
{
  id: "sl-evt-def456",
  event_type: "booking_complete",
  timestamp: "2026-05-30T14:28:45.912Z",
  properties: {
    business_slug: "acme-towing-company",
    success: true,                          // false if validation error or backend failure
    user_id: "usr_8a7b6c5d4e3f",
    timestamp_iso: "2026-05-30T14:28:45.912Z",  // redundant for clarity
    duration_seconds: 325,                   // time from page_view to booking_complete
  }
}
```

---

## Blockers & Decisions

**Decision needed:**  
Do we add `business_slug` as a required property on all events? Currently only sent client-side. Recommendation: Yes — prevents aggregation errors when multiple businesses share same event ID format. Action: Add to `track()` call for all funnel events (not just page_view).

**Pending work (post-mvp):**  
- Geo-location extraction (client: navigator.geolocation or IP-to-country via API)
- Device type/OS detection (UA parsing library)
- Attribution windowing (30-day vs. 7-day cookie vs. session-only)

---

## Author

Ihor • Nearspoke MVP Team
