# Smart Link — First 5-Shop Pilot Outreach Packet

Date: 2026-05-30
Prepared from public map/directory data (OpenStreetMap Nominatim lookups). Treat every phone/email/social handle as "verify once before sending" — directory data is useful, not gospel.

## Goal
Build a tiny, hand-curated first prospect list for the Smart Link barbershop/salon pilot, plus the first-contact copy and tracking tags.

## Selection rule
Picked shops that look like a fit for the current MVP offer:
- 2+ chair / neighborhood service businesses
- likely still running on phone + walk-in + social/manual booking habits
- weak or missing public booking link / website footprint
- public contact channel visible in map/directory data

## Recommended first 5 prospects

| Priority | Business | Area | Public contact channel(s) seen | Online presence gap | Why Smart Link fits | Best first channel |
|---|---|---|---|---|---|---|
| 1 | Gerritsen Barber Shop & Hair Salon | Gerritsen Beach, Brooklyn | Phone: +1-718-684-7811; Email: gerritseninstagram@gmail.com; Instagram: https://www.instagram.com/gerritsenbarbershop/ | Instagram + Gmail, but no public website or booking link found | Looks owner-operated, already using Instagram, easy to pitch as "one booking link for IG bio + texts" | Instagram DM or email |
| 2 | Kings Barber Shop | Bensonhurst, Brooklyn | Phone: +1-718-513-4171 | Public hours listed, but no website, no social handle, no booking flow found | Classic neighborhood barber profile; Smart Link can replace phone-tag and make walk-in overflow bookable | SMS or phone follow-up after text |
| 3 | Percy's Unisex Barber Shop | Unionport, Bronx | Phone: +1-718-822-9313 | Public phone + hours, but no website or booking funnel found | Unisex shop means broader service mix; a single booking link + reminders likely lands well | SMS |
| 4 | Naespa Nails & Hair Salon | Astoria, Queens | Phone: +1-347-894-6190 | Public phone + hours, but no website or booking link found | Salon services usually benefit from service menu + appointment reminders more than pure walk-ins | SMS |
| 5 | Radiant Reflections Beauty Salon | Harlem, Manhattan | Phone: +1-347-899-7266 | Phone only; no website, no social, no booking link found | Strong fit for a "private pilot, we set it up for you" offer because the current online stack looks thin | SMS or phone intro |

## Backup prospects if one of the top 5 looks dead/wrong
- Ambioris Estilo Unisex Barber Shop — Bushwick, Brooklyn — +1-718-452-5033
- Prestige Barber Shop & Unisex — Bushwick, Brooklyn — +1-718-574-7401
- La Joya Hair Salon — Corona, Queens — +1-917-832-6348
- Maria Beauty Salon — Upper West Side / Manhattan Valley — +1-212-222-8652
- Elegant Hair & Nail Salon — Gravesend, Brooklyn — +1-718-382-7299

## Best first prospect
Gerritsen Barber Shop & Hair Salon is the best first shot.

Why:
- it already has Instagram, which makes the Smart Link value painfully obvious: one link in bio, one shareable booking page, one place for services/hours/reviews;
- there is also a fallback email, so contact does not depend on one channel;
- the lack of a public website/booking flow is exactly the gap the MVP is built to fill.

## First-contact scripts

Keep the tone simple. No startup sludge. No fake hype. Just the gap, the offer, and one next step.

### 1) Instagram DM / WhatsApp opener
Hi — I’m reaching out because Gerritsen Barber Shop & Hair Salon already has the social presence, but I couldn’t find a simple booking link or service page for customers.

I’m working on a private Smart Link pilot for barbershops/salons: we set up one mobile-friendly booking page with your services, pricing, hours, and reminders so clients can book without phone-tag.

The pilot is free for 30 days, and if it doesn’t help generate real bookings, you walk away.

If you want, I can send a 2-minute preview and the short pilot outline.

### 2) SMS opener
Hi — I’m running a free 30-day Smart Link pilot for barbershops/salons. We set up one booking link for services, hours, and reminders. Want a short preview?

### 3) Email opener
Subject: quick idea for Gerritsen Barber Shop & Hair Salon

Hi,

I found Gerritsen Barber Shop & Hair Salon while looking for a few local shops for a private pilot.

The pitch is simple: Smart Link gives a shop one clean booking page with services, prices, hours, and reminders so customers can book without calling back and forth.

For pilot shops, setup is free for 30 days. The goal is to prove whether it drives real bookings before asking anyone to pay.

From your public presence, it looks like you already have enough demand and social activity for this to be useful — but not yet one obvious booking link customers can use.

If you want, I can send a short preview and the pilot outline.

Best,
[Name]

### 4) If they reply "send info"
Perfect — I’ll send the 2-minute preview plus the short pilot outline.

What’s included in the pilot:
- one booking link for your shop
- services/prices/hours setup
- reminder flow to cut no-shows
- source tracking so you can see where bookings came from

If it looks interesting, the next step is a 15-minute setup call.

## Channel-specific notes by prospect

### Gerritsen Barber Shop & Hair Salon
- Use Instagram DM first.
- If no reply in 48 hours, send the email version.
- If still no reply, one short phone follow-up is fair. More than that gets spammy fast.

### Kings Barber Shop
- Send SMS first.
- If no reply, one phone call during non-peak hours (around late morning weekday) is fine.
- Pitch angle: "less phone-tag, more direct bookings."

### Percy's Unisex Barber Shop
- Send SMS first.
- Pitch angle: "unisex services + reminders + fewer missed appointments."

### Naespa Nails & Hair Salon
- Send SMS first.
- Pitch angle: "service menu + appointment reminders + one easy mobile link."

### Radiant Reflections Beauty Salon
- Send SMS first, then a single phone follow-up if silent.
- Pitch angle: "we handle setup for you; you just approve services, prices, and hours."

## Tracking / analytics tags for outreach

Use one consistent campaign slug for this wave:
- `utm_source=outreach`
- `utm_campaign=nyc_pilot_wave1_2026-05-30`

Set `utm_medium` by channel:
- SMS: `utm_medium=sms`
- WhatsApp: `utm_medium=whatsapp`
- Email: `utm_medium=email`
- Instagram DM: `utm_medium=instagram_dm`
- Manual phone follow-up after message: `utm_medium=phone_followup`

Set `utm_content` per prospect + variant:
- `gerritsen_dm_v1`
- `kings_sms_v1`
- `percys_sms_v1`
- `naespa_sms_v1`
- `radiant_sms_v1`

## Funnel/source field mapping for MVP analytics

This matches the current analytics schema in `docs/analytics-mvp-schema.md`.

When sharing a preview/demo link, append UTMs so page views and eventual bookings can be traced back to the exact outreach touch.

Recommended mapping:
- `utm_source`: `outreach`
- `utm_medium`: channel (`sms`, `email`, `instagram_dm`, `whatsapp`, `phone_followup`)
- `utm_campaign`: `nyc_pilot_wave1_2026-05-30`
- `utm_content`: prospect + message variant (`gerritsen_dm_v1`)
- `referrer`: leave native if any; otherwise treat as direct/manual touch

## Manual funnel tracking sheet fields

Track each prospect manually even before product-side CRM exists:
- `prospect_name`
- `borough`
- `segment` (`barbershop` or `salon`)
- `contact_channel_first`
- `contact_value`
- `utm_medium`
- `utm_content`
- `outreach_status` (`not_sent`, `sent`, `replied`, `call_booked`, `declined`, `followup_due`)
- `first_touch_date`
- `last_touch_date`
- `owner_interest_notes`

## Guardrails
- Do not blast all 5 at once like a maniac.
- Start with 1 shop, learn from the reply pattern, then send the next 2.
- Verify the contact channel manually before sending.
- Keep the preview honest: this is a private pilot, not a finished public platform.

## Exact next human action
Approve Gerritsen Barber Shop & Hair Salon as prospect #1, verify the Instagram/email contact manually, then send the Instagram DM opener above as the first live outreach touch.
