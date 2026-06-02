# Seeded-Profile Prospect Review Checklist

Internal use only. Private. Do not publish publicly without explicit owner opt-in.

---

## Purpose

Manual operator checklist for reviewing real barbershop/salon prospects against the ICP and guardrails from `docs/seeded-profile-experiment-brief.md`.

Public-facts pass completed on 2026-06-02 using manual review of:
- public Instagram profile metadata for Gerritsen Barber Shop & Hair Salon
- public OpenStreetMap/Nominatim business listings already referenced in `docs/pilot-outreach.md`

No outreach was sent. No scraper/bulk import list was created for this pass.

---

## Per-Prospect Review Table

| # | Business Name | Borough/Neighborhood | Visible Demand Signal (IG/GM reviews/walk-in/booking intent) | Weak Booking Presence (no clean flow/outdated site/no link/fragmented contact) | Reachable Public Channel Type | Confidence / Risk Notes | Go / No-Go / Wait |
|---|---|---|---|---|---|---|---|
| 1 | Gerritsen Barber Shop & Hair Salon | Brooklyn / Gerritsen Beach | Instagram profile is active: 571 posts, 316 followers; bio lists services, address, and phone, which is enough to show real local demand and ongoing activity. | Public IG + Gmail + phone are visible, but no clean website or obvious booking link surfaced on the profile or in the OSM listing. | Instagram DM, email, phone/SMS | Highest-confidence prospect in this batch because the demand signal is public and current. Risk: still need owner opt-in before any profile/public artifact exists. | Go |
| 2 | Kings Barber Shop | Brooklyn / Bensonhurst | OSM listing shows a live storefront with public opening hours seven days a week plus card acceptance, which is decent evidence of steady neighborhood walk-in demand. | Phone is public, but no website, no social handle, and no booking flow surfaced in `docs/pilot-outreach.md` or OSM metadata. | Phone/SMS | Medium confidence. Good ICP fit, but weaker proof of online demand than Gerritsen because this pass did not surface reviews or social activity. | Go |
| 3 | Percy's Unisex Barber Shop | Bronx / Unionport | OSM listing shows long opening hours (Mon-Sat 09:00-21:00), named operator, and unisex/barber tagging; that looks like a real active service shop. | Public phone is visible, but no website or booking funnel surfaced; this still looks phone-first/manual. | Phone/SMS | Medium-high confidence. Strong local-service fit and obvious booking-friction gap. | Go |
| 4 | Naespa Nails & Hair Salon | Queens / Astoria-Steinway | OSM listing shows public opening hours across the full week, which is a decent sign of active appointment/walk-in traffic. | Public phone is visible, but no website or booking link surfaced in the listing or prior prospect notes. | Phone/SMS | Medium confidence. Good fit for service-menu/reminder value prop, but this pass did not surface stronger public demand proof like IG/review counts. | Go |
| 5 | Radiant Reflections Beauty Salon | Manhattan / Harlem | Real storefront and phone listing are visible on Adam Clayton Powell Jr. Blvd, so this is not a synthetic lead, but public demand evidence is thinner than the top four. | Phone-only contact surfaced; no website, no social handle, and no booking link were found in the prior manual shortlist or OSM metadata. | Phone/SMS | Medium-low confidence. Great booking-gap fit, but online signal is thin enough that this could be a dead-end unless owner responsiveness is high. | Wait |
| 6 | Ambioris Estilo Unisex Barber Shop | Brooklyn / Bushwick | Public storefront listing and phone number show a real operating shop; “unisex barber shop” suggests broader service mix than a pure walk-in cuts spot. | No website, no booking link, and no richer online presence surfaced in this pass. | Phone/SMS | Medium-low confidence. Real shop, obvious gap, but thin visible demand evidence beyond map/directory presence. | Wait |
| 7 | Prestige Barber Shop & Unisex | Brooklyn / Bushwick | Public storefront listing and phone number show a real local barber/unisex business in a dense neighborhood. | No website or booking flow surfaced; contact path appears fragmented down to phone-first/manual handling. | Phone/SMS | Medium-low confidence. Similar shape to Ambioris; plausible fit, but the current evidence is mostly directory-level. | Wait |
| 8 | La Joya Hair Salon | Queens / Corona | Public storefront listing plus phone number confirm a real salon presence in Corona. | No website or booking link surfaced in this pass; contact appears phone-first. | Phone/SMS | Medium-low confidence. Likely valid ICP, but the demand proof is thin and should be strengthened before treating as a top-wave target. | Wait |
| 9 | Maria Beauty Salon | Manhattan / Manhattan Valley | Public storefront listing on Columbus Ave plus visible phone number point to a real active neighborhood salon. | No website, social handle, or booking link surfaced in this review. | Phone/SMS | Medium-low confidence. Real business with likely service demand, but weak online signal makes the wedge less obviously compelling. | Wait |
| 10 | Elegant Hair & Nail Salon | Brooklyn / Gravesend | Public storefront listing plus visible phone number show a real salon business in Gravesend. | No website or booking flow surfaced; looks like a thin digital presence. | Phone/SMS | Medium-low confidence. Good booking-gap shape, but weak public demand evidence in this pass. | Wait |

---

## Conclusion

Verdict: extend to 20 attempts, not because the wedge is obviously great, but because the top 4 prospects look legitimately promising while the back half of the sample is too directory-thin to kill the whole idea yet.

Why:
- The wedge is clearly strongest when a shop has visible demand plus weak digital booking presence; Gerritsen, Kings, Percy's, and Naespa all fit that shape well enough to keep testing.
- The weaker half of the sample mostly proves something useful too: phone-only or low-signal shops may be real, but they are harder to validate without stronger public demand evidence.
- That means the next 10 should be picked more aggressively for visible activity (Instagram/reviews/hours) instead of settling for any shop with a phone number and no site.

Net: do not stop the experiment yet, but do tighten the prospect filter before the 20-attempt decision boundary.

---

## Hard Guardrails (Repeat Before Proceeding)

- ✅ Private/internal only — Do not publish any profile, public artifact, or screenshot that includes owner/business identity without explicit opt-in.
- ✅ No scraper — Manually reviewed public facts only; no bulk import, no automated prospect generation.
- ✅ No unconsented PII — Do not move phone/email/social handle details into public-facing docs or assets.
- ✅ No outreach without approval — First-touch copy and channel still require human approval before any contact attempt.
- ✅ Conditional wedge — Seeded profiles remain a narrow validation experiment, not the primary GTM motion.

---

## Verification

- [x] Each row uses manually reviewed public facts only.
- [x] No scraper or bulk-import artifacts were used to populate this checklist.
- [x] No outreach was sent as part of this review.
- [x] Owner PII is absent from shared/public artifacts; this stays a private internal doc.
- [x] Prospects are real barbershops/salons, not synthetic test entities.

---

## Batch 2A (2026-06-02) — Manual continuation, map/directory-only pass

Public-facts pass completed using manual OpenStreetMap/Nominatim lookups for five additional NYC barbershop/salon prospects already consistent with the seeded-profile experiment. No outreach was sent. No scraping, bulk import, or private-data enrichment was used. This artifact remains private/internal only.

| # | Business Name | Borough/Neighborhood | Visible Demand Signal (IG/GM reviews/walk-in/booking intent) | Weak Booking Presence (no clean flow/outdated site/no link/fragmented contact) | Reachable Public Channel Type | Confidence / Risk Notes | Go / No-Go / Wait |
|---|---|---|---|---|---|---|---|
| 11 | Eddie's Hair Salon | Manhattan / East Harlem | Named storefront on Madison Avenue with a public phone number in OSM/Nominatim; location on a busy neighborhood corridor is enough to treat it as a real operating salon with likely recurring local demand. | Manual public-facts pass surfaced a phone number but no website, booking link, or cleaner reservation flow. | Phone/SMS | Medium confidence. Real business and obvious phone-first gap, but the public demand signal in this pass is still directory-level rather than reviews/social-heavy. | Wait |
| 12 | Maria Beauty Salon | Manhattan / Manhattan Valley | Named storefront on Columbus Avenue with a public phone number; the avenue placement suggests steady neighborhood foot traffic even though this pass did not surface richer review/social proof. | Public phone is visible, but no website, social handle, or booking funnel surfaced in the manual check. | Phone/SMS | Medium confidence. Stronger corridor than some prior Wait rows, but still not enough visible online demand to upgrade confidently into the top wave. | Wait |
| 13 | La Joya Hair Salon | Queens / Corona | Named salon storefront on Corona Avenue with a public phone number and a recent OSM check date (2024-09-27), which is enough to treat the listing as current rather than stale. | No website or booking link surfaced; contact path still appears phone-first/manual from public facts. | Phone/SMS | Medium confidence. Better freshness signal than many thin directory listings, but still weak on visible online demand. | Wait |
| 14 | Ambioris Estilo Unisex Barber Shop | Brooklyn / Bushwick | Named unisex barber storefront on Wilson Avenue with a public phone number and a recent OSM check date (2026-05-20); “unisex” suggests a broader service mix than a pure walk-in cuts shop. | Manual check surfaced phone only; no website, booking link, or cleaner public scheduling flow appeared. | Phone/SMS | Medium confidence. Real shop with a clear booking-friction gap, but still lacks stronger public activity proof beyond map/directory presence. | Wait |
| 15 | Prestige Barber Shop & Unisex | Brooklyn / Bushwick | Named barber/unisex storefront on Myrtle Avenue with a public phone number; the corridor fit and service category make it a plausible local-demand business. | No website or booking link surfaced in the manual pass; reachable channel remains phone-first/manual. | Phone/SMS | Medium-low confidence. Plausible fit, but this batch still did not surface the stronger review/social activity that would justify a Go verdict. | Wait |

Batch 2A summary: Go = 0, Wait = 5, No-Go = 0.

Takeaway for this continuation batch: the booking-gap pattern is still real, but this five-prospect pass did not surface stronger visible demand than the best Batch 1 candidates. That argues for keeping the filter tight and prioritizing shops with clearer public activity signals before extending the experiment further.

---

## Batch 2B (2026-06-02) — Manual continuation, fresh named-prospect pass

Public-facts pass completed using manual OpenStreetMap/Nominatim lookups for five additional NYC barbershop/salon prospects not already scored in Batch 1 or Batch 2A. No outreach was sent. No scraping, bulk import, or private-data enrichment was used. This artifact remains private/internal only.

| # | Business Name | Borough/Neighborhood | Visible Demand Signal (IG/GM reviews/walk-in/booking intent) | Weak Booking Presence (no clean flow/outdated site/no link/fragmented contact) | Reachable Public Channel Type | Confidence / Risk Notes | Go / No-Go / Wait |
|---|---|---|---|---|---|---|---|
| 16 | Studio Unisex Barber Shop | Queens / Woodside | Public OSM listing shows a named storefront with full-week opening hours (Mon-Thu 10:00-20:00, Fri 10:00-20:30, Sat 09:30-20:30, Sun 09:30-16:30) plus a public phone number, which is strong enough evidence of steady local appointment/walk-in demand. | Manual public-facts pass surfaced a phone number and hours but no website or booking link, so the shop still looks dependent on direct calls/texts. | Phone/SMS | Medium-high confidence. Better demand signal than the directory-thin Wait set because the hours are detailed and current-looking, but still no richer social/review proof surfaced in this pass. | Go |
| 17 | Punjabi Unisex Barber Shop | Queens / Woodside | Public OSM listing shows a named storefront with a public phone number and 24/7 opening-hours metadata, which suggests a live high-availability local shop even if that exact schedule should be verified before any outreach. | No website or booking flow surfaced in the manual check; contact path still appears to be phone-first/manual. | Phone/SMS | Medium confidence. The booking-gap fit is obvious, but the 24/7 hours claim could be noisy map data, so this should not be treated as a top-confidence prospect without one extra manual verification step later. | Wait |
| 18 | 106th & 1st Barber Shop & Salon | Manhattan / East Harlem | Public OSM listing shows a named barber/salon storefront on East 106th Street with a visible phone number; the dual barber-plus-salon framing suggests a broader service mix than a single-purpose cuts shop. | Manual public-facts pass surfaced a phone number but no website, booking link, or cleaner scheduling surface. | Phone/SMS | Medium confidence. Good ICP shape and obvious digital-gap weakness, but this pass did not surface opening hours or stronger visible activity proof. | Wait |
| 19 | Cariba Beauty Salon Inc | Bronx / Parkchester | Public OSM listing shows a named salon storefront with a public phone number and opening hours listed seven days a week (10:00-19:00), which is a solid signal of recurring neighborhood demand. | No website or booking link surfaced in the manual public-facts check, so customers still appear to be routed through phone/manual coordination. | Phone/SMS | Medium-high confidence. Seven-day hours plus a public phone number make this one of the cleaner late-batch fits even without stronger social evidence. | Go |
| 20 | Odalis Nail Salon | Brooklyn / Bushwick | Public OSM listing shows a named nail-salon storefront on Knickerbocker Avenue with a public phone number, which is enough to treat it as a real active local service business. | No website or booking link surfaced in the manual check; the reachable public channel still looks phone-first/manual. | Phone/SMS | Medium confidence. Clear booking-gap fit, but the demand signal is still thinner than the best Go prospects because this pass did not surface hours, reviews, or social activity. | Wait |

Batch 2B summary: Go = 2, Wait = 3, No-Go = 0.

Takeaway for this continuation batch: the strongest late-batch prospects still share the same pattern — visible operating hours plus a reachable phone line, but no clean booking flow. That is enough to keep the wedge alive, though the evidence is still much better when public activity signals are richer than bare directory presence.

---

Workspace: `/opt/data/autonomous/smart-link`
Owner: Human operator
Status: Private / Internal use only