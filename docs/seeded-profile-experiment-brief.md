# Seeded-Profile Experiment Brief

**Status:** Conditional validation only  
**Parent:** t_04340a6e — GTM synthesis verdict: conditionally promising (pilot required)  
**Workspace:** `/opt/data/autonomous/smart-link`  

---

## 1. Verdict and Hypothesis

Seeded profiles are **not the primary GTM wedge** for Smart Link right now. They are only worth testing as a narrow, guarded validation experiment for owner-operated barbershops and salons with visible demand and weak booking presence.

**Hypothesis:** a manually reviewed, consent-safe seeded-profile workflow can produce real claim-interest or conversion signals from a small set of real barbershop/salon prospects without crossing trust, compliance, or product-reality boundaries.

**Null:** the experiment fails to produce enough claim-interest/conversion to justify deeper investment, or it creates trust/compliance risk that kills the motion.

---

## 2. ICP and Prospect Qualification

**Target ICP for this experiment:**
- Owner-operated barbershop or salon, or a small multi-chair local shop where the owner/operator is reachable.
- Visible customer demand signal already exists (for example: active Instagram, active Google Maps reviews, walk-in demand, or obvious booking intent).
- Weak booking presence: no clean booking flow, outdated website, no usable booking link, or fragmented contact path.
- Manually reviewable by a human in a small batch.

**Explicitly out of scope:**
- Venture-backed software companies and other startup ICPs that do not match local-service booking reality.
- Synthetic-only companies invented for testing.
- Any segment that does not match the current Smart Link MVP and concierge setup reality.

---

## 3. Experiment Shape

This is a **manual validation experiment**, not a growth system build.

**Sample size:**
- Start with 10 manually reviewed real prospects.

**Process constraints:**
- Manual review only.
- Use only manually reviewed public facts.
- No scraper.
- No bulk import.
- No automated prospect generation.
- No public profile publication before owner opt-in.
- No unconsented PII stored in public artifacts.

**Operating model:**
- A human reviews each prospect one by one.
- Any draft seeded-profile concept stays private/internal until owner opt-in exists.
- Outreach, if any, must stay human-controlled and aligned with approved copy/channel.

---

## 4. Consent, Trust, and Data Boundaries

**Required guardrails:**
- Do not imply business approval before approval exists.
- Do not publish a public profile before the owner opts in.
- Do not store unconsented PII in public artifacts, demo docs, or screenshots.
- Keep claim/correction and opt-out handling explicit if the experiment advances.
- Treat legal/compliance questions as unresolved until explicitly cleared.

**Allowed inputs:**
- Manually reviewed public business facts needed for internal validation.
- Internal notes limited to what is necessary for the experiment.

**Not allowed:**
- Scraped datasets.
- Bulk-imported business lists.
- Fake public profiles.
- Republishing owner/business identity in public artifacts before opt-in.

---

## 5. Outreach Boundary

No outreach should happen without human-approved first-touch copy and channel.

If outreach is attempted in the validation phase:
- it must be human-sent,
- it must use a human-approved first-touch message and channel,
- and it must preserve the owner opt-in boundary before any public profile goes live.

This experiment brief does not authorize sending outreach on its own.

---

## 6. Success Metric and Stop Rule

**Primary success threshold:**
- >=20% claim-interest/conversion threshold.
- Preserve the decision-memo framing: treat the experiment as promising only if it can reach that threshold after 20 attempts, or hit an equivalent small-sample signal strong enough to justify continuing.

**Kill threshold:**
- <5% conversion after 20 attempts.

**Small-sample handling:**
- The first 10 manually reviewed real prospects are an initial validation slice, not proof of scale.
- If early signals are clearly weak, stop instead of rationalizing noise.
- If early signals are clearly strong, continue carefully toward the 20-attempt decision boundary before calling this a viable wedge.

**Failure triggers beyond conversion:**
- Any trust/compliance breach.
- Any public publication before owner opt-in.
- Any unconsented PII showing up in public artifacts.

---

## 7. Non-goals

- No scraper.
- No bulk import.
- No fake public profiles.
- No outreach without human-approved first-touch copy/channel.
- Do not build profile generation.
- Do not create real seeded profiles.
- Do not modify product code.
- Do not treat seeded profiles as the main GTM motion.

---

## 8. Immediate Next Step

Create a lightweight operator checklist for manually reviewing 10 real barbershop/salon prospects against the ICP and guardrails above. Keep it human-driven, private, and reversible.

---

## 9. Verification Checklist

- [ ] Brief says seeded profiles are conditional, not the primary wedge.
- [ ] ICP is barbershop/salon, not startup/software-company ICP.
- [ ] Brief says no scraper and no bulk import.
- [ ] Brief preserves the >=20% success threshold and <5% kill threshold after 20 attempts.
- [ ] Brief forbids public profile publication before owner opt-in.
- [ ] Brief forbids unconsented PII in public artifacts.
- [ ] Brief forbids outreach without human-approved first-touch copy/channel.

**Doc path:** `/opt/data/autonomous/smart-link/docs/seeded-profile-experiment-brief.md`
