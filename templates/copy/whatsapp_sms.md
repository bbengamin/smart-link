# WhatsApp/SMS Greeting Template for Nearspoke

## Platform Notes
- **WhatsApp:** First message has 2400 char limit (rich text, buttons supported)
- **SMS:** Keep under 160 chars per segment (costs multiply beyond that)
- Both use smartlink.app/business/{slug} as the primary CTA

## WhatsApp Template Structure
Use this as first contact/opening message from business owner:

```
Hi! 👋 Your name here from [Business Name]. 
We're at [Location/City] and help customers book appointments easily.

Check out our services & hours:
👉 smartlink.app/business/{slug}

OR tap the link below to book now:
[srclink]
```

**With buttons (if supported):**
- "Book Now" → `/business/{slug}/book`
- "Get Directions" → `maps.google.com/?q={location}`
- "Call Us" → `tel:{phone_number}`

## SMS Template Structure
Ultra-short, one-tap CTA for text message outreach:

```
👋 Hi! [Business] in [City]. Book now at smartlink.app/business/{slug} — we're open until {hours}. Reply HELP or STOP to unsubscribe.
```

OR (if character budget is tight):

```
Your local pro in {city}: smartlink.app/business/{slug}
```

## Ready-to-Use Variants

### WhatsApp Opening - Barbershop
```
Hi! 👋 This is Mike from Cut's Barbershop (Bronx, NY). 
We're helping customers book sharp cuts & fades easily.

Check our hours, services & location:
👉 smartlink.app/business/cuts-barbershop-bronx
```

### WhatsApp Opening - Salon  
```
Hi! 👋 This is Sarah from Luxe Salon (Manhattan, NY). 
Hair styling, coloring & treatments — book your style session:
👉 smartlink.app/business/luxe-salon-manhattan
```

### SMS Short Form - Barbershop
```
👋 Cut's Barbershop in Bronx. We're open until 8pm tonight! Book now: smartlink.app/business/cuts-barbershop-bronx Reply HELP or STOP to unsubscribe.
```

### SMS Short Form - Salon  
```
👋 Luxe Salon in Manhattan. Open until 7pm. Book your style session: smartlink.app/business/luxe-salon-manhattan Reply HELP or STOP to unsubscribe.
```

### WhatsApp Follow-Up - Booking Reminder
```
Hi again! Your appointment for [Service Name] on {date} at {time} is confirmed. 
Confirm details or need help? Tap here: 👉 smartlink.app/business/{slug}
```

## Best Practices
- **WhatsApp:** Use rich text, buttons for actions, include business name + location context
- **SMS:** One clear CTA only, keep under 160 chars if possible (one message segment = lower cost)
- Both: Always include smartlink.app/business/{slug} as primary link
- WhatsApp allows up to 5 pre-approved template links per business; SMS uses standard URL shortening

## Testing Checklist
- [ ] WhatsApp message renders buttons correctly (Test on iOS & Android)
- [ ] SMS stays under 160 chars (or acceptable multi-segment length)
- [ ] All links resolve to correct business profile
- [ ] Business name/location context is clear without needing the link
