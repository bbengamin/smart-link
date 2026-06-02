# Smart Link Weekday Mapping Fix - Commit Summary

**Commit:** `9ca65b9`  
**Branch:** main  
**Repo:** `bbengamin/smart-link`  
**Date:** 2026-05-31

## Problem
Production smoke test `t_4b4b31e0` discovered that `/api/ai/cuts-barbershop` returned `openingHoursSpecification` with weekdays all mislabeled as `Monday`. The business profile JSON-LD also failed to emit correct weekly day mappings.

Root cause: Source hours data uses short keys (`mon`, `tue`, `wed`, etc.) from seed.json/Supabase, but the code attempted regex matching against full weekday names without a proper lookup table.

## Solution
Added `dayMap` helper object mapping short keys to schema.org weekday names in both locations:

1. **smart-link-app/src/app/api/ai/[slug]/route.ts** (line ~251)
   - Added dayMap for API endpoint JSON-LD output
   
2. **smart-link-app/src/app/business/[slug]/page.tsx** (line ~78)
   - Added dayMap for business profile page JSON-LD output

The fix uses short-key lookup first (`dayMap[day.toLowerCase()]`) with fallback to original regex matching for edge cases, ensuring all weekdays map distinctly.

## Verification
Local verification script confirms:
```
✓ All weekday mappings are CORRECT and DISTINCT  
✓ Schema.org compliance: Monday..Sunday for each source key
```

## Files Changed
- `smart-link-app/src/app/api/ai/[slug]/route.ts` (+13/-3)
- `smart-link-app/src/app/business/[slug]/page.tsx` (+13/-3)

**Total:** 2 files, +26/-6 lines

## Testing Notes
- Demo businesses (cuts-barbershop, luxe-salon, etc.) use short keys from seed.json
- Production verification requires deploying to Vercel and checking:
  - `GET https://smart-link-mu.vercel.app/api/ai/cuts-barbershop`
  - Embedded JSON-LD on `https://smart-link-mu.vercel.app/business/cuts-barbershop`

## Next Steps
- Deploy to Vercel via CLI push or manual review PR
- Verify production endpoint returns correct weekday names in both:
  - API JSON response (`openingHoursSpecification[].dayOfWeek`)
  - Business profile embedded JSON-LD script
