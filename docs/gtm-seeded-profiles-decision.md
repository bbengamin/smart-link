# GTM Decision: Seeded Profiles as Acquisition Wedge

## Verdict: Not yet (as primary wedge)

Seeded profiles are **conditionally promising** but too early to adopt as the main GTM motion. Current Smart Link product reality — concierge-heavy, owner-approved services/pricing/hours, MVP demo-level owner reporting — means broad seeded profiles will get ahead of product and feel creepy or spammy.

## Upside (3 bullets)

- Makes demand/booking gap concrete for weak-web-presence shops
- Lowers first-contact friction by showing an existing profile artifact
- Can improve reply rates as a direct outreach accelerant

## Biggest risks (3 bullets)

1. **Product-motion mismatch**: Smart Link still needs owner approval for services/pricing; seeded profiles get ahead of reality unless fast claimed/corrected
2. **Legal/compliance/reputation**: Public-data sourcing accuracy, consent, and identity/ownership issues are counsel-sensitive and unresolved
3. **Trust damage**: Unsolicited prebuilt profiles may feel creepy or deceptive if facts are wrong or approval is implied

## Fit with current product/motion

Partial fit only. Works as a narrow outreach accelerant for barbershops/salons with visible demand and weak booking presence, but not as the core acquisition engine. Manual pilot outreach with fast setup sells the actual transformation more honestly than an unsolicited prebuilt artifact.

## Single best next step

Run the guided manual validation experiment:

- Sample size: 10 prospects
- Segment: owner-operated or small multi-chair barbershops/salons with visible demand but weak web presence (Instagram/Google Maps active, no clean booking link)
- Channel: single lane via LinkedIn DM (or equivalent direct outreach)
- Process: manual profile creation via browsing/outreach, fast concierge setup within days of claim
- Success threshold: ≥20% conversion or claim-interest after 20 attempts
- Kill criteria: <5% conversion after 20 attempts

No scraper/bulk import buildout until wedge scales. CSV import/one-click scrape only if validation succeeds and demand materializes.

## Guardrails

- No scraper or bulk import workflow before validation
- Use only manually reviewed public facts
- Make claim/correction and opt-out paths obvious
- Do not imply business approval before approval exists
- Treat counsel-sensitive questions as unresolved until answered

---

**Parent tasks synthesized:**

- `t_08f0af29`: Thin validation experiment design (sample 10, manual creation, LinkedIn DM, ≥20% success / <5% kill)
- `t_5948b155`: Final synthesis recommendation (`not-yet` for primary wedge, yes for guarded pilot)
- `t_5f4cce17`: Risk register (legal/compliance/operational risks with hard blockers vs manageable)
- `t_6ec145c8`: GTM fit memo (conditionally promising, product-motion mismatch, best segments defined)
