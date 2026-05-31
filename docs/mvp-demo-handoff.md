# Smart Link — MVP Demo Handoff for Pilot Owners

Date: 2026-05-31
Audience: barbershop/salon owner, manager, or pilot tester
Purpose: show the current Smart Link MVP honestly, without pretending deployment or ops are farther along than they are.

## What this demo is
Smart Link currently proves the core idea in demo mode:
- a public business profile page
- contact buttons
- a booking flow
- a simple owner dashboard
- a simple client list
- AI-readable business data

It is good enough to walk an owner through the concept and collect pilot feedback.
It is not yet a verified public production launch.

## Start here
If you have the app running locally, open the home page first:
- `/`

From there, use one of the seeded demo businesses:
- `/business/cuts-barbershop`
- `/business/luxe-salon`
- `/business/fresh-cuts-studio`
- `/business/glow-hair-studio`

If you only test one, use `/business/cuts-barbershop`. It is the clearest barber-style walkthrough.

## Demo routes and what each one proves

### 1) Home page
Route:
- `/`

What it proves:
- Smart Link can present multiple demo businesses from one landing page.
- The product pitch is already framed around booking, business info, and AI discoverability.

What to look for:
- demo business cards
- clear jump into a public profile
- positioning for barbershops/salons/local services

### 2) Public business profile
Routes:
- `/business/cuts-barbershop`
- `/business/luxe-salon`
- `/business/fresh-cuts-studio`
- `/business/glow-hair-studio`

What it proves:
- one smart business page can show services, pricing, hours, reviews, and location context
- the page already exposes customer contact buttons
- the main booking CTA is obvious
- the page includes structured data intended to make the business readable by AI systems

What to click:
- `Book Appointment`
- `Get QR Code`
- `Call`
- `WhatsApp`
- `Email`
- `Directions`

What to look for:
- can a customer understand the shop in 10 seconds?
- are services and starting prices visible enough?
- would you trust this page as a link-in-bio or texted booking page?

### 3) Booking flow
Routes:
- `/business/cuts-barbershop/book`
- `/business/luxe-salon/book`
- `/business/fresh-cuts-studio/book`
- `/business/glow-hair-studio/book`

What it proves:
- customers can go from profile -> service selection -> booking details
- the MVP supports a real booking-shaped flow instead of just a brochure page

Important truth right now:
- in demo mode, bookings are stored locally in the browser
- they do not reach a real salon/barbershop system yet

Tester move:
- make one fake booking so you can inspect the next route below

### 4) Demo bookings viewer
Route:
- `/demo/bookings`

What it proves:
- the system can show captured booking submissions
- the owner/tester can inspect what the customer entered

Important truth right now:
- this is browser-local demo storage, not live backend ops
- clearing browser data wipes these demo bookings

Use it to answer:
- if a customer books, is the captured information enough to act on?
- is anything obviously missing from the booking request?

### 5) Simple owner dashboard
Route:
- `/admin/dashboard`

What it proves:
- Smart Link has an owner-facing view for bookings, revenue, and service activity
- there is already a skeleton for the “where do new leads/bookings show up?” question

Important truth right now:
- this page is demo/mock data
- it is useful for explaining the operator experience, not for claiming live reporting

Owner question to answer:
- if new demand started showing up here, would this be enough to run the first week of a pilot?

### 6) Simple client list
Route:
- `/admin/clients`

What it proves:
- Smart Link can show a lightweight client list with booking/value context
- there is already a simple retention/CRM direction, without pretending it is a giant platform

Important truth right now:
- this page is also demo/mock data

Owner question to answer:
- is this enough for a small shop to recognize repeat clients and follow up?

### 7) AI-readable business profile
Route:
- `/api/ai/cuts-barbershop`

You can swap the slug for the other demo businesses too.

What it proves:
- the business profile can be exposed as structured JSON for crawlers, assistants, or future agents
- Smart Link is not just pretty HTML; it is trying to make local business data machine-readable

What to look for:
- business identity
- hours
- services
- pricing
- schema fields

### 8) Distribution/copy surface
Route:
- `/distribution`

What it proves:
- the team has already thought about where the smart link gets shared: bio links, SMS/WhatsApp, maps, QR, etc.
- this helps the owner understand how the link would actually get used after setup

Important truth right now:
- parts of this page still use generic/example content from an older demo concept
- treat it as supporting explanation, not the polished pilot surface

## What is still blocked or not production-ready
These are the sharp edges. Better to say them now than bullshit people later.

### Not verified as live public production
Current project docs explicitly say there is no verified public production Smart Link URL yet.
Do not present this MVP as already live on a trusted public domain.

### Bookings are demo-mode, not real live ops
The booking demo stores data locally in the browser.
That means:
- no real business receives the booking
- no real dashboard pipeline is proven
- no real operational follow-up loop is proven yet

### Dashboard and client list are concept-valid, not ops-valid
`/admin/dashboard` and `/admin/clients` show the owner experience direction, but the numbers are mock/demo data.

### Telegram alerts should be described carefully
Owner expectation from the setup checklist:
- alerts are optional, not magic
- if Telegram/SMS/email alerts are configured, define exactly who receives them
- if alerts are not configured yet, the owner should still check the dashboard/list during pilot week

So the honest line is:
- Smart Link expects owner alerts to exist eventually
- real alert delivery for a live pilot is not yet confirmed in this MVP handoff

### QR/distribution surfaces are uneven
There is QR/distribution work in the app, but some of it still points at old example slugs/content instead of the seeded barber/salon demo set.
That means these surfaces are useful for the concept, but not yet clean enough to sell as the finished pilot path.

## Exact human next actions for a pilot owner/tester

### If you are an owner seeing the demo
1. Open `/business/cuts-barbershop`.
2. Decide whether the profile answers the basics fast enough: what you offer, what it costs, when you are open, how to contact/book.
3. Open `/business/cuts-barbershop/book` and submit one fake booking.
4. Open `/demo/bookings` and check whether the captured booking details are enough for your staff to act on.
5. Open `/admin/dashboard` and `/admin/clients` and decide whether those views are enough for pilot week one.
6. Give blunt feedback on what would block you from using this with real customers.

### If you are a Smart Link tester/operator
1. Use this demo to walk the owner through the happy path: profile -> booking -> bookings view -> dashboard -> client list.
2. Do not oversell deployment, alerts, or live reporting.
3. Capture objections and missing info with `docs/pilot-call-notes-template.md`.
4. Use `docs/pilot-setup-checklist.md` to collect the minimum business info if the owner wants to continue.
5. Use `docs/pilot-outreach.md` for the outreach/follow-up motion before or after the demo.

## What a pilot owner should send back after the demo
Keep feedback simple:
- Which route felt strongest?
- Which route felt fake or confusing?
- Would you trust the profile as your main booking link?
- What one thing is missing before you would test this with real customers?
- Who on your team would own follow-up for new bookings/messages?

## Related docs
- `docs/pilot-setup-checklist.md`
- `docs/pilot-call-notes-template.md`
- `docs/pilot-outreach.md`
- `docs/business-operator-status.md`
- `mvp-pilot-offer.md`

## Bottom line
This MVP is good enough to demo the business loop.
It is not honest to call it production-ready yet.
The clean pitch today is: “here is the customer and owner experience we can already show, and here is exactly what still needs to become real before public launch.”
