# SEO/AI Structured Data — Completed 2026-05-29

## Summary
Implemented dynamic SEO infrastructure for Smart Link Next.js app. All routes compile and build passes.

## Files Created/Modified
1. **`src/app/sitemap.ts`** — Dynamic sitemap generator
   - Returns static page entries (/) + dynamic business profiles
   - Demo mode: hardcoded slugs (cuts-barbershop, luxe-salon)
   - Live mode: fetches from Supabase `businesses` table
   - Uses `supabase` export from `@/lib/supabase`

2. **`src/app/api/og/[slug]/route.tsx`** — OG image endpoint
   - `runtime: "nodejs"` (not edge — incompatible with dynamic params)
   - `dynamic: "force-static"` for caching
   - Fetches business data from demo or Supabase
   - Renders gradient OG image with business name, category, city, description
   - Color-coded by category: purple (#7c3aed) for salons, blue (#2563eb) for barbershops

3. **`src/app/robots.txt/route.ts`** — Dynamic robots.txt
   - Allows all crawlers for demo mode
   - AI crawler rules (Claude, Perplexity, Gemini, ChatGPT) in live mode
   - Points to sitemap.xml

## Build Verification
- `npx next build` passes ✅
- TypeScript compiles without errors ✅
- Static pages: `/`, `/robots.txt`, `/sitemap.xml`, `/api/og/[slug]`
- Dynamic pages: `/business/[slug]`

## Key Decisions
- Used App Router route handlers (not static files) for environment-aware routing
- OG image uses `nodejs` runtime (edge runtime incompatible with dynamic OG generation)
- Demo data detection: `!url.includes("placeholder") && !url.includes("demo")`
- Removed `robots.ts` (conflicted with `robots.txt/route.ts` in App Router)
- Next.js version updated from 15 to 16.2.6 in plan

## Known Issues
- Pre-existing TS errors in node_modules (Next.js 16 type defs) — not app code
- Supabase not yet configured — app runs in demo mode by default
