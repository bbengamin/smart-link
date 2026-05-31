# Smart Link — First Pilot Onboarding Handoff

Date: 2026-05-30
Audience: internal operator running the first barbershop/salon pilot
Scope: MVP onboarding only — get one shop live fast, explain the loop clearly, avoid CRM nonsense.

## Goal
Get a pilot shop from "yes, I'm interested" to a live smart link they can share in under 10 days, with one owner walkthrough and a dead-simple distribution plan.

## What the owner is buying into
Smart Link is one shareable page for the shop:
- customers can see services, prices, hours, and contact details;
- customers can book without phone-tag;
- the owner can see where visits/bookings came from;
- the owner gets a simple dashboard instead of guessing whether Instagram/texts/Google are doing anything.

Do not pitch this like a full salon operating system. It isn't. For the pilot, it is one booking/contact loop with source tracking.

## The operator checklist

### 1) Qualify the shop before setup
- Confirm the shop actually wants appointments or lead capture, not pure walk-in chaos.
- Confirm one owner or manager can approve service list, prices, hours, and contact info.
- Confirm they can test the smart link on a phone during setup week.
- Confirm they understand the pilot is lightweight and fast: no CRM migration, no custom app build, no six-week implementation circus.

### 2) Collect the minimum business info/assets
Required:
- business name exactly as it should appear publicly;
- primary contact name;
- phone number for customer contact;
- email address for owner/admin contact;
- address or neighborhood;
- business hours;
- service list;
- starting prices for each service;
- booking preference: request/callback vs direct slot booking;
- one approval contact for launch sign-off.

Nice to have, not blockers:
- logo;
- brand colors;
- Instagram handle;
- Google Business Profile link;
- photos of the shop/work;
- preferred short description/tagline.

If the owner is missing half this stuff, do not freeze. Start with the required list and ship the first usable version.

### 3) Build the MVP profile
- Create the smart link profile with business name, contact info, hours, services, and prices.
- Make sure the page answers the obvious customer questions in under 10 seconds: what is this place, what can I book, how much, when are they open, how do I contact them?
- Wire source tracking on every distribution link with UTM tags.
- Verify the page is mobile-friendly first. Desktop polish can wait; salon owners and their customers live on phones.

### 4) Run owner approval
- Send the owner one preview link.
- Ask them to approve only these items: name, services, prices, hours, phone, booking CTA.
- Keep feedback bounded. If they start inventing a wish-list, park it for post-pilot notes.

### 5) Launch the first distribution surfaces
Priority order:
1. Google Business Profile website/appointment link
2. Instagram bio link
3. QR code at front desk / mirror / window
4. WhatsApp or SMS template for direct sharing

Do not spread across ten channels on day one. Start where intent already exists.

### 6) Train the owner in one short walkthrough
Owner should leave knowing exactly three things:
- where to send customers;
- how to tell whether people are clicking/booking;
- what to do when someone still messages or calls instead of booking.

## Recommended intake form fields
Use this as the bare-minimum onboarding form or call script:
- Business name
- Owner/manager name
- Best phone
- Best email
- Address or neighborhood
- Instagram handle
- Google Business Profile URL
- Services offered
- Starting prices
- Opening hours
- Booking method today (phone, DM, walk-in, booking app)
- Biggest pain right now (missed calls, no-shows, empty slots, too many DMs, etc.)
- Approval contact for launch

## Demo script for the first owner call
Goal: 10–15 minutes. Show the loop, get approval, don't drown them.

### 1) Open
"The whole point of Smart Link is simple: instead of customers bouncing between Instagram, Google, texts, and phone calls, you give them one place to book or contact you. Then you can actually see what's working."

### 2) Show the customer view
"This is the page your customer lands on from Google, Instagram, a text, or a QR code in the shop. They can see your services, starting prices, hours, and the main button to book or contact you."

### 3) Show the booking/contact fork
"Some customers are ready to book right now. They hit the booking flow. Others still want to ask a question first. They use the contact option. That's fine — the win is that both paths start from one link instead of getting lost across channels."

### 4) Show the owner dashboard loop
"On your side, the dashboard is where this should land: visits, source tags, and booking activity in one place. In the current MVP, that dashboard is still a demo/operator view, not proven live reporting yet — but it shows the exact loop we want to make real for the pilot. So instead of guessing whether Instagram or Google is doing anything, you get one place to check."

### 5) Explain distribution surfaces
"Once this is approved, we put the same smart link everywhere people already find you: Google Business Profile, Instagram bio, a QR code at the counter, and direct WhatsApp/SMS messages. Same destination, cleaner customer path."

### 6) Set expectations
"For the pilot, we're keeping this tight: one booking/contact flow, one dashboard loop, and a few high-intent distribution points. No CRM migration, no giant software rollout, no bullshit. We want proof that this gets you more real bookings."

### 7) Close with approval ask
"If the services, prices, hours, and contact details look right, we can launch the first version fast and start tracking traffic immediately."

## How to explain each distribution surface

### Google Business Profile
Pitch: "When someone searches your shop, the website or appointment link should take them straight to the smart link instead of making them hunt for booking details."
Action:
- place the smart link in the website field if that's the clearest path;
- if the profile supports appointment links cleanly, use that too;
- tag with `utm_source=google_business_profile`.

### Instagram bio
Pitch: "Your Instagram already gets attention. The bio link should do the real work instead of just sitting there looking pretty."
Action:
- replace or promote the bio link to the smart link;
- keep CTA copy blunt: `Book appointments here` or `Services + booking`;
- tag with `utm_source=instagram_bio`.

### QR at the counter / mirror / window
Pitch: "People already in the shop are the easiest humans on earth to get onto the link."
Action:
- print one clean QR code with `Scan to book next visit`;
- place it where clients wait, pay, or check out;
- tag with `utm_source=in_store_qr`.

### WhatsApp / SMS
Pitch: "When someone texts asking for hours, prices, or availability, staff should stop retyping the same answer every damn time."
Action:
- use a saved reply with the smart link;
- add one short sentence of context: `Book here or message us if you need help`;
- tag with `utm_source=direct_message_share` and `utm_medium=whatsapp` or `sms`.

## Suggested saved reply for staff
"Here you go — this link has our services, prices, hours, and booking options: [smart link]. If you want help choosing a service, just reply here."

## The booking/contact/owner-dashboard loop in one breath
1. Customer discovers the shop from Google, Instagram, QR, or a direct message.
2. They land on one smart link.
3. They either book now or contact the shop from that same page.
4. The owner sees which source drove the visit and whether it turned into booking activity.
5. The shop keeps pushing the same link on the channels that actually convert.

If the owner cannot repeat that loop back in plain English, the demo was too complicated.

## Pilot success checkpoints
By the end of setup week, confirm:
- live smart link approved by owner;
- at least 3 distribution surfaces live;
- owner knows where dashboard numbers come from;
- staff has one saved reply for WhatsApp/SMS;
- all launch links use source tagging.

## Recommended next internal action after outreach reply
Once a prospect says "send info" or agrees to a call:
1. send the pilot offer;
2. send the intake questions above;
3. book the 10–15 minute onboarding/demo call;
4. prepare a preview link before the call if enough info is available.

## References
- `mvp-pilot-offer.md`
- `docs/pilot-outreach.md`
- `docs/distribution-surfaces.md`
- `docs/analytics-mvp-schema.md`
