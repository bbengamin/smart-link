# AI Profile Indexing — Completed 2026-05-29

## Summary
Enhanced JSON-LD structured data and added AI data endpoint for LLM consumption.

## Changes

### 1. Enhanced JSON-LD (`src/app/business/[slug]/page.tsx`)
Added fields to BusinessJSONLD function:
- `addressCountry: "US"` — country for address
- `geo` — GeoCoordinates (lat/lng)
- `aggregateRating` — rating value + review count
- `sameAs` — social media profile URLs (filtered for truthy values)
- `makesOffer` — service offers with name, description, price, currency

### 2. New AI Data Endpoint (`src/app/api/ai/[slug]/route.ts`)
- Returns structured business data as JSON for LLMs
- Static params for demo slugs (cuts-barbershop, luxe-salon)
- Falls back to Supabase if demo doesn't match
- Headers: Cache-Control (1h public), CORS (*), Content-Type (application/json)
- Response includes: business details, full schema.org JSON-LD, source indicator

### 3. Build Verification
- All 8 routes compile successfully
- `/api/ai/[slug]` pre-rendered as SSG (2 static pages)
- TypeScript passes

## AI Endpoint Response Format
```json
{
  "business": {
    "name": "...",
    "description": "...",
    "category": "barbershop|salon",
    "address": "...",
    "city": "...",
    "state": "...",
    "zip": "...",
    "phone": "...",
    "email": "...",
    "website": "...",
    "hours": { "monday": { "open": "09:00", "close": "18:00" } },
    "services": [{ "name": "...", "price": 2500, "duration_minutes": 30 }],
    "rating": 4.5,
    "reviewCount": 127
  },
  "schema": { "@context": "https://schema.org", "@type": "BarberShop", ... },
  "source": "demo|supabase"
}
```
