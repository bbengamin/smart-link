# Distribution Surfaces for Nearspoke Links

Nearspoke links are designed to be easily shared across all major distribution channels. This document outlines the surfaces and implementation details for how local businesses can share their smart link via QR codes, social media bios, messaging apps, websites, and Maps profiles.

## Overview

A smart link is a single URL that encapsulates a local business's complete digital presence: booking system, client management, reviews, services & pricing, and AI-powered discovery. The challenge isn't the data itself—it's making it discoverable without forcing customers to hunt across multiple platforms.

Distribution surfaces are the practical affordances that bridge this gap: QR codes on receipts, canonical links in social bios, rich cards in chat apps, embedded widgets on websites, and verified listings on Maps profiles.

This implementation focuses on MVP-adjacent touches—no bloated marketing platform, no CRM overhead. Just lightweight UI/docs/copy that show a business exactly how to use the smart link from each channel.

---

## 1. QR Code Surfaces

QR codes are the primary physical distribution surface. A printed QR code pointing to `/business/{slug}` gives customers instant access without typing or scanning a URL bar manually.

### Implementation Details

- **Location**: Nearspoke business profile pages include a QR code display section at the top of the page
- **Dynamic generation**: QR codes are generated on-demand using server-side libraries (e.g., `qrcode` npm package)
- **Static assets fallback**: Pre-generated QR images for demo businesses cached in `/public/qr-codes/`
- **Metadata**: Each QR code includes business slug and optional branding overlay

### Use Cases

- Printed receipts or invoices from booking confirmations
- Shop window decals or table tent cards
- Business card integration
- Menu QR codes (restaurants, salons)
- Point-of-sale receipt stamps

---

## 2. Social Media Bios (Instagram, TikTok, Facebook)

Smart links work as canonical URLs in social media profile bios. Unlike generic link-in-bio sites, a smart link *is* the destination: it's optimized for discovery with embedded business info, reviews, and direct booking CTAs.

### Implementation Details

- **OG Image Endpoint**: `/api/og/[slug]` generates platform-specific share images
  - Instagram uses 600x157px (2.92:1 ratio)
  - Facebook/LinkedIn prefers 1200x630px (1.91:1 ratio)
  - Twitter/X uses 1200x675px (16:9)
- **Canonical Open Graph tags**: Business profiles include complete OG metadata for proper sharing
- **Twitter/X Card support**: Additional `<meta>` tags for X-specific rendering

### Platform-Specific Notes

**Instagram**
- Instagram bios allow 3-5 links (Nearspoke as primary or secondary link)
- Use `/api/og/[slug]` endpoint to generate shareable images that appear when shared in stories
- Example use: "Book now: smartlink.app/business/the-dentist"

**TikTok**
- Bio links are limited to 1 link per profile (Nearspoke recommended as primary)
- Nearspoke's mobile-first design fits TikTok's traffic pattern perfectly
- TikTok also supports rich media cards from OG endpoints

**Facebook Page**
- Facebook Pages can use smartlink.app URLs as page bio links
- When shared in posts, automatic Open Graph image generation creates branded cards

---

## 3. Messaging App Cards (WhatsApp, SMS, Telegram)

Messaging apps like WhatsApp Business and Telegram allow rich card rendering via embedded URLs that include JSON-LD context. Nearspoke links are optimized for this—no external PWA required.

### Implementation Details

- **JSON-LD structured data**: Every business page includes Schema.org markup in `<script>` tags
- **Telegram Bot API compatibility**: Nearspoke pages pass Telegram's webapp validation checks
- **WhatsApp Business API**: When shared via WhatsApp, the smart link renders with embedded preview (title, description, OG image)

### Example Flow

1. Customer receives booking confirmation via WhatsApp
2. Reply contains smartlink.app URL with rich preview
3. Preview shows business name, rating, and 5-star badge
4. Tap → instant redirect to business profile page

---

## 4. Website Embeds (Third-party Sites)

Local businesses often exist on third-party websites: Yext, Foursquare Business Manager, Yelp Partner Pages, or custom corporate sites. Nearspoke links can be embedded via iframe or widget integration.

### Implementation Details

- **Iframe-friendly business profile**: Single-page design avoids "above the fold" issues
- **Responsive container support**: `iframe` srcdoc fallback for strict cross-origin policies
- **Widget mode**: Lightweight JavaScript injection loads business data without full SSR

### Integration Pattern (widget)

```html
<!-- Example widget integration -->
<div id="smart-link-widget"></div>
<script>
  SmartLink.embed('business/the-coffee-roasters');
</script>
```

---

## 5. Maps Profiles (Google, Apple, Apple Maps)

When a business adds their smart link as the official website URL in Google Business Profile or Apple Maps, customers searching for "coffee near me" get an embedded preview of the smart link data directly in search results.

### Implementation Details

- **JSON-LD schema**: Google requires structured data (verified via Rich Results Test)
- **Apple Maps compatibility**: Nearspoke links pass Apple's webapp validation
- **Schema.org markup**: Required fields: `@type`, `name`, `description`, `address`, `telephone`

### Example JSON-LD Output

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "The Coffee Roasters",
  "url": "https://smartlink.app/business/the-coffee-roasters",
  "telephone": "+1234567890",
  "description": "Artisan coffee roasting and brewing...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101"
  }
}
```

---

## Copy Affordances for Each Surface

To help businesses craft effective copy, here are suggested messaging templates:

### QR Code Label

```
📱 Scan to book your appointment at The Coffee Roasters
[QR code image]
Nearspoke · smartlink.app/business/the-coffee-roasters
```

### Instagram Bio

```
☕ Specialty coffee & pastries in Seattle's Capitol Hill neighborhood. Book appointments online instantly. 👇
smartlink.app/business/the-coffee-roasters
```

### WhatsApp Status/Catalog

```
📅 Coffee pickup or delivery? Book here: smartlink.app/business/the-coffee-roasters
4.9 ⭐ · 127 reviews · Open till 8PM
```

---

## Building the Surfaces (Next Steps)

**Phase 5 Implementation**:

1. **Add QR code generation** to business profile page (`/app/business/[slug]/page.tsx`)
   - Generate dynamic QR at `/qr/{slug}` endpoint or inline SVG
   - Pre-calculate for demo businesses in build step

2. **Enhance OG image endpoint** (`/api/og/[slug]`)
   - Add Twitter Card meta tags for X support
   - Platform-specific sizing hints

3. **Create distribution landing page** (`/app/distribution`)
   - Interactive checklist: "How to share your smart link"
   - QR code generator with preview
   - Social media templates and copy suggestions

4. **Update admin dashboard** (optional)
   - QR code download button for each business
   - Distribution surface analytics (track which source brought users)

---

## Technical Notes

- All surfaces preserve smartlink.app subdomain structure (`smartlink.app/business/{slug}`)
- No external dependencies required for core affordances
- Demo mode pre-populates distribution assets; live DB reads from Supabase
- QR code generation: `qrcode` npm package recommended for static images
