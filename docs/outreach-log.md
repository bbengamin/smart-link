1|# Nearspoke — Outreach Log (First-Pilot Contacts)
2|
3|\*\*Purpose:** Durable, structured tracking artifact for first-pilot prospects to move through the approval-only worker-send flow without relying on scattered Kanban comments. Workers prepare/send only after explicit approval state is present; no auto-fire for first touch.
4|
5|\*\*Quick summary:** See [`docs/first-wave-approval-summary.md`](./first-wave-approval-summary.md) for a human-readable overview of the current approval queue. Do not send outreach automatically — review first.

**Last updated:** 2026-06-01

---

## Contact Log Format

Each entry uses the following schema:

| Field | Description |
|-------|-------------|
| prospect | Business name |
| preferred_channel | Primary contact channel (e.g., `instagram_dm`, `sms`, `email`) |
| fallback_channel | Secondary channel if primary fails/unresponsive |
| approved_channel | Channel explicitly approved by human for sending (nullable) |
| utm_source | Always `outreach` for pilot waves |
| utm_medium | Contact method (`instagram_dm`, `sms`, `email`, `whatsapp`) |
| utm_campaign | Wave identifier (`nyc_pilot_wave1_2026-05-30`) |
| utm_content | Prospect-specific message variant (e.g., `gerritsen_dm_v1`) |
| current_state | Workflow state: `not_sent`, `approval_requested`, `approved`, `sent`, `waiting_for_reply`, `no_reply_in_48h`, `follow_up_due`, `closed` |
| last_action_timestamp | When last action was taken (ISO 8601) |
| next_action | Next step for worker/human (if any) |
| linked_board_card | Kanban task ID providing context/board linkage |

---
## Contact Entries

### Gerritsen Barber Shop & Hair Salon
```yaml
prospect: Gerritsen Barber Shop & Hair Salon
preferred_channel: instagram_dm
fallback_channel: email
approved_channel: null
utm_source: outreach
utm_medium: instagram_dm
utm_campaign: nyc_pilot_wave1_2026-05-30
utm_content: gerritsen_dm_v1
current_state: approval_requested
last_action_timestamp: 2026-06-01T10:03:16Z
next_action: Awaiting human approval for first Instagram DM touch; workers may prepare/send only after explicit approval in linked board card. Do not auto-fire.
linked_board_card: t_f8d691ba
```

**Context:**  
First-pilot prospect from manual selection (OpenStreetMap Nominatim lookup). Shop has Instagram presence but no public booking link — ideal for "one link in bio" pitch.

---

### Kings Barber Shop

```yaml
prospect: Kings Barber Shop
preferred_channel: sms
fallback_channel: phone
approved_channel: null
utm_source: outreach
utm_medium: sms
utm_campaign: nyc_pilot_wave1_2026-05-30
utm_content: kings_sms_v1
current_state: approval_requested
last_action_timestamp: 2026-06-01T20:44:33Z
next_action: Awaiting human approval to send the first-touch SMS below; if approved and no reply, place one non-peak phone follow-up after 48h.
linked_board_card: t_46d74279
```

**Context:**  
Neighborhood barber profile in Bensonhurst, Brooklyn with phone contact but no website/social handle — Nearspoke can replace phone-tag and make walk-in overflow bookable. Pitch angle: "less phone-tag, more direct bookings."

**Approval packet:**
- channel: `sms`
- fallback_channel: `phone`
- utm_source: `outreach`
- utm_medium: `sms`
- utm_campaign: `nyc_pilot_wave1_2026-05-30`
- utm_content: `kings_sms_v1`
- draft_copy: `Hi — I’m running a free 30-day Nearspoke pilot for neighborhood barbershops. We set up one mobile-friendly link for your services, hours, and booking/contact flow so customers spend less time on phone-tag. Want a short preview?`
- exact_human_approval_needed: Approve or reject this SMS first touch for Kings Barber Shop. If approving, confirm that SMS is the right opener and that one phone follow-up after 48h of silence is acceptable.

---

### Percy's Unisex Barber Shop

```yaml
prospect: Percy's Unisex Barber Shop
preferred_channel: sms
fallback_channel: null
approved_channel: null
utm_source: outreach
utm_medium: sms
utm_campaign: nyc_pilot_wave1_2026-05-30
utm_content: percys_sms_v1
current_state: approval_requested
last_action_timestamp: 2026-06-01T21:40:00Z
next_action: Awaiting human approval for first SMS touch; workers may prepare/send only after explicit approval in linked board card. Do not auto-fire.
linked_board_card: t_15462536
```

**Context:**  
Unisex shop in Unionport, Bronx with phone contact and no booking funnel — single booking link + reminders likely to perform well. Pitch angle: "unisex services + reminders + fewer missed appointments."

**Approval packet:**
- channel: `sms`
- fallback_channel: `null`
- utm_source: `outreach`
- utm_medium: `sms`
- utm_campaign: `nyc_pilot_wave1_2026-05-30`
- utm_content: `percys_sms_v1`
- draft_copy: `Hi — I’m running a free 30-day Nearspoke pilot for barbershops/salons. We set up one mobile-friendly link with services, prices, hours, and booking/contact flow so clients stop bouncing between DMs, texts, and phone-tag. Want a short preview?`
- exact_human_approval_needed: Approve or reject this SMS first touch to Percy's Unisex Barber Shop (+1-718-822-9313). If approving, confirm the SMS opener copy and that one verified demo link (`https://smart-link-app-swart.vercel.app/`) is appropriate before sending. No auto-fire pending your green light.

---

### Naespa Nails & Hair Salon

```yaml
prospect: Naespa Nails & Hair Salon
preferred_channel: sms
fallback_channel: null
approved_channel: null
utm_source: outreach
utm_medium: sms
utm_campaign: nyc_pilot_wave1_2026-05-30
utm_content: naespa_sms_v1
current_state: approval_requested
last_action_timestamp: 2026-06-01T10:05:00Z
next_action: Awaiting human approval to send first SMS; workers may prepare/send only after explicit approval in linked board card. Do not auto-fire.
linked_board_card: t_62ecb132
```

**Context:**  
Salon in Astoria, Queens with phone contact and no booking link — service menu + appointment reminders benefit from one easy mobile link. Pitch angle: "service menu + appointment reminders + one easy mobile link."

**Approval packet:**
- channel: `sms`
- fallback_channel: `null` (no configured alternate)
- utm_source: `outreach`
- utm_medium: `sms`
- utm_campaign: `nyc_pilot_wave1_2026-05-30`
- utm_content: `naespa_sms_v1`
- draft_copy: `Hi — I'm running a free 30-day Nearspoke pilot for barbershops/salons. We set up one mobile-friendly link with your services, pricing, hours, and booking/contact flow so clients stop bouncing between DMs, texts, and phone-tag. Want a short preview?`
- demo_url: `https://smart-link-app-swart.vercel.app/` (verified public demo; do not use the broken `smart-link-mu.vercel.app` alias)
- exact_human_approval_needed: Approve or reject this SMS first touch to Naespa Nails & Hair Salon (+1-347-894-6190). If approving, confirm the SMS opener copy and that including the verified demo link is appropriate. No auto-fire pending your green light.

---

### Radiant Reflections Beauty Salon

```yaml
prospect: Radiant Reflections Beauty Salon
preferred_channel: sms
fallback_channel: phone
approved_channel: null
utm_source: outreach
utm_medium: sms
utm_campaign: nyc_pilot_wave1_2026-05-30
utm_content: radiant_sms_v1
current_state: approval_requested
last_action_timestamp: 2026-06-02T00:18:00Z
next_action: Awaiting human approval to send first SMS touch; if approved and no reply, place one non-peak phone follow-up after 48h.
linked_board_card: t_6cfa9adc
```

**Context:**  
Beauty salon in Harlem, Manhattan with phone-only contact and minimal online footprint — strong fit for "private pilot, we set it up for you" offer. Pitch angle: "we handle setup; just approve services, prices, and hours."

**Approval packet:**
- channel: `sms`
- fallback_channel: `phone`
- utm_source: `outreach`
- utm_medium: `sms`
- utm_campaign: `nyc_pilot_wave1_2026-05-30`
- utm_content: `radiant_sms_v1`
- draft_copy: `Hi — I'm running a free 30-day Nearspoke pilot for barbershops/salons. We handle setup for you and give you one mobile-friendly link for services, hours, and booking/contact flow. You just approve the details. Want a short preview?`
- demo_url: `https://smart-link-app-swart.vercel.app/` (verified public demo; do not use the broken `smart-link-mu.vercel.app` alias)
- exact_human_approval_needed: Approve or reject this SMS first touch to Radiant Reflections Beauty Salon (+1-347-899-7266). If approving, confirm the SMS opener copy and that including the verified demo link is appropriate before sending. If no reply after 48h, confirm that one non-peak phone follow-up is acceptable.

---

## Notes

- **No auto-fire:** Workers may prepare messages and verify channels, but sending requires explicit approval state (`current_state: approved`) from a human or documented auto-approval rule.
- **Approval process:** See `docs/outreach-workflow-approved.md` for channel capability matrix, state machine, and where approval is required vs optional.
- **Board linkage:** All outreach entries are anchored to their Kanban board card (e.g., `t_f8d691ba`) so workers/humans can inspect the full thread, drafts, and decisions in one place.

---

**Verification checklist** (run from project root):
```bash
grep "Gerritsen Barber Shop & Hair Salon" docs/outreach-log.md && \
  grep "Kings Barber Shop" docs/outreach-log.md && \
  grep "Percy's Unisex Barber Shop" docs/outreach-log.md && \
  grep "Naespa Nails & Hair Salon" docs/outreach-log.md && \
  grep "Radiant Reflections Beauty Salon" docs/outreach-log.md && \
  grep "approval_requested" docs/outreach-log.md && \
  grep "not_sent" docs/outreach-log.md && \
  grep "nyc_pilot_wave1_2026-05-30" docs/outreach-log.md && \
  echo "✓ All five first-wave outreach entries present with required states and campaign slug"
```
