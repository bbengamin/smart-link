# First-Wave Pilot Outreach: Approval Queue Summary

**Generated:** 2026-06-02  
**Status:** Awaiting human review/approval  
**Do not send automatically** — see `docs/outreach-log.md` for full details and `docs/outreach-workflow-approved.md` for the approval process.

---

## Quick Status Overview

Five prospects in first-wave pilot (NYC) are currently awaiting human approval before any first-touch outreach:

| # | Prospect | Channel | State | Action Needed |
|---|----------|---------|-------|---------------|
| 1 | Gerritsen Barber Shop & Hair Salon | Instagram DM → Email | `approval_requested` | Review and approve/reject |
| 2 | Kings Barber Shop | SMS → Phone | `approval_requested` | Review and approve/reject |
| 3 | Percy's Unisex Barber Shop | SMS | `approval_requested` | Review and approve/reject |
| 4 | Naespa Nails & Hair Salon | SMS | `approval_requested` | Review and approve/reject |
| 5 | Radiant Reflections Beauty Salon | SMS → Phone | `approval_requested` | Review and approve/reject |

**Campaign:** NYC Pilot Wave 1 (`nyc_pilot_wave1_2026-05-30`)  
**Demo link for prospects:** https://smart-link-app-swart.vercel.app/

---

## Prospect Details

### 1. Gerritsen Barber Shop & Hair Salon
- **Channel:** Instagram DM (fallback: email)
- **State:** `approval_requested` (linked to board card `t_f8d691ba`)
- **Context:** OpenStreetMap Nominatim lookup; has Instagram presence, no booking link. Ideal for "one link in bio" pitch.
- **Action:** Approve/reject first Instagram DM touch pending human review.

---

### 2. Kings Barber Shop
- **Channel:** SMS (fallback: phone)
- **State:** `approval_requested` (linked to board card `t_46d74279`)
- **Context:** Bensonhurst, Brooklyn; no website/social handle — Nearspoke replaces phone-tag. Pitch: "less phone-tag, more direct bookings."
- **Draft SMS:** "Hi — I'm running a free 30-day Nearspoke pilot for neighborhood barbershops. We set up one mobile-friendly link for your services, hours, and booking/contact flow so customers spend less time on phone-tag. Want a short preview?"
- **Action:** Approve/reject SMS first touch; confirm phone follow-up after 48h of silence is acceptable.

---

### 3. Percy's Unisex Barber Shop
- **Channel:** SMS (no fallback)
- **State:** `approval_requested` (linked to board card `t_15462536`)
- **Context:** Unionport, Bronx; has phone (+1-718-822-9313), no booking funnel. Single link + reminders likely to perform well.
- **Draft SMS:** "Hi — I'm running a free 30-day Nearspoke pilot for barbershops/salons. We set up one mobile-friendly link with services, prices, hours, and booking/contact flow so clients stop bouncing between DMs, texts, and phone-tag. Want a short preview?"
- **Action:** Approve/reject SMS to Percy's Unisex Barber Shop (+1-718-822-9313); verify demo link before sending.

---

### 4. Naespa Nails & Hair Salon
- **Channel:** SMS (no fallback)
- **State:** `approval_requested` (linked to board card `t_62ecb132`)
- **Context:** Astoria, Queens; has phone (+1-347-894-6190), no booking link. Service menu + appointment reminders benefit from one easy mobile link.
- **Draft SMS:** "Hi — I'm running a free 30-day Nearspoke pilot for barbershops/salons. We set up one mobile-friendly link with your services, pricing, hours, and booking/contact flow so clients stop bouncing between DMs, texts, and phone-tag. Want a short preview?"
- **Demo URL:** https://smart-link-app-swart.vercel.app/ (verified public demo)
- **Action:** Approve/reject SMS to Naespa Nails & Hair Salon (+1-347-894-6190); confirm demo link inclusion.

---

### 5. Radiant Reflections Beauty Salon
- **Channel:** SMS (fallback: phone)
- **State:** `approval_requested` (linked to board card `t_6cfa9adc`)
- **Context:** Harlem, Manhattan; phone-only contact (+1-347-899-7266), minimal online footprint. Strong fit for "private pilot" offer.
- **Draft SMS:** "Hi — I'm running a free 30-day Nearspoke pilot for barbershops/salons. We handle setup for you and give you one mobile-friendly link for services, hours, and booking/contact flow. You just approve the details. Want a short preview?"
- **Demo URL:** https://smart-link-app-swart.vercel.app/ (verified public demo)
- **Action:** Approve/reject SMS to Radiant Reflections Beauty Salon (+1-347-899-7266); confirm demo link inclusion and phone follow-up after 48h.

---

## Important Notes

### ⚠️ DO NOT SEND OUTREACH AUTOMATICALLY
All five prospects are in `approval_requested` state. Workers may prepare messages and verify channels, but **sending requires explicit approval** (state change to `approved`) or documented auto-approval rule. See `docs/outreach-workflow-approved.md` for the full process.

### Verification Checklist
Run this to confirm all entries exist:
```bash
grep "Gerritsen Barber Shop" docs/outreach-log.md && \
  grep "Kings Barber Shop" docs/outreach-log.md && \
  grep "Percy's Unisex Barber Shop" docs/outreach-log.md && \
  grep "Naespa Nails & Hair Salon" docs/outreach-log.md && \
  grep "Radiant Reflections Beauty Salon" docs/outreach-log.md && \
  echo "✓ All five first-wave outreach entries present"
```

### Further Reading
- Full contact details, timestamps, and state machine: [`docs/outreach-log.md`](./outreach-log.md)
- Workflow and channel capabilities: [`docs/outreach-workflow-approved.md`](./outreach-workflow-approved.md)
- GTM decision memo: [`docs/gtm-seeded-profiles-decision.md`](./gtm-seeded-profiles-decision.md)

---

**Summary location:** `docs/first-wave-approval-summary.md`  
**Linked from:** [`docs/outreach-log.md`](./outreach-log.md#first-wave-pilot-outreach-queue-summary)
