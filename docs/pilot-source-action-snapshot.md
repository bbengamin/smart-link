# Nearspoke Pilot — Source-to-Action Snapshot Template

*Operator-facing manual tracking for first-wave pilot. Do not claim automated analytics or live owner reporting.*

---

## Quick usage note (first 5-shops)

This doc tracks one prospect/shop from source approval → action observation. It's meant to be filled by an operator after human review of each pilot contact attempt and before outreach fires. For the first 5-shop wave, one snapshot per business keeps signal clear while we wait for live owner analytics verification.

**Reference inputs:**
- [`docs/outreach-log.md`](./outreach-log.md) — contact state & channel details
- [`docs/pilot-reply-packet.md`](./pilot-reply-packet.md) — demo/demo mode disclaimers
- [`docs/pilot-feedback-loop.md`](./pilot-feedback-loop.md) — feedback collection
- [`docs/analytics-mvp-schema.md`](./analytics-mvp-schema.md) — funnelling design

---

## Snapshot Table

| Column | Description | Example values |
|--------|-------------|----------------|
| prospect | Business/shop name (as approved publicly) | `Kings Barber Shop` |
| owner_name | Primary approver/manager | `Alex Johnson` |
| approval_state | Human decision state | `approval_requested`, `approved`, `rejected` |
| source_tag | Source reference or UTM if present | `utm_source=google&utm_medium=cpc` |
| demo_url_used | Public demo URL shown to prospect | `https://smart-link-app-swart.vercel.app/` |
| observed_action | What the prospect actually did (visit/contact/book) | `page_view_only`, `contacted_via_sms`, `booked_slot` |
| next_owner_action | Next step for operator/owner team | `send_follow_up_sms`, `schedule_setup_call` |
| confidence_score | Operator estimate 0–1 on data reliability | `0.9` |
| known_gaps | Notes, caveats, missing info | `no_google_business_profile_linked` |

---

## Example row (filled)

| prospect | owner_name | approval_state | source_tag | demo_url_used | observed_action | next_owner_action | confidence_score | known_gaps |
|----------|------------|----------------|------------|---------------|-----------------|-------------------|------------------|-------------|
| Kings Barber Shop | Alex Johnson | approved | utm_source=google&utm_medium=cpc | https://smart-link-app-swart.vercel.app/ | page_view_only | schedule_setup_call | 0.8 | shop_no_online_calendar, instagram_dm_sent_no_reply_yet |

---

## Manual-first disclaimer

This template is **manual/operator reporting** until live owner analytics is verified in production. Do not claim:
- Automated CRM dashboards
- Custom domain routing (`smartlink.app` is separate work)
- Fully live owner analytics or conversion attribution
- Guaranteed SMS/email delivery rates (fallbacks apply)

Frame all claims as demo/MVP mode unless you have explicit verification that the feature is production-ready.

---

## When to expand

Once live owner analytics are verified and we have enough data points (>50 completed conversions), migrate this manual snapshot pattern into an automated dashboard component backed by real events (see [`docs/analytics-mvp-schema.md`](./analytics-mvp-schema.md)) instead of operator-filled rows.

---

## Author

Ihor • Nearspoke MVP Team