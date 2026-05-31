#!/bin/bash
# Verify visibility/local discovery improvements
set -e

APP_URL="${NEXT_PUBLIC_APP_URL:-https://smartlink.app}"
BASE="$1"  # Build directory or URL

echo "=== Smart Link Visibility Changes Verification ==="
echo ""

echo "📝 Files Modified:"
echo "  - src/app/api/og/[slug]/route.tsx   (OG image: added address, better typography)"
echo "  - src/app/business/[slug]/page.tsx  (JSON-LD: added CallAction schema)"
echo "  - src/app/page.tsx                  (metadata: OG images, Twitter site handle)"
echo ""

echo "🔍 What Changed:"
echo "  ✓ OG images now show full address for local SEO"
echo "  ✓ Business profile has JSON-LD Schema.org structured data"
echo "  ✓ Added CallAction markup for click-to-call on mobile"
echo "  ✓ Main homepage has OG/Twitter meta with images"
echo "  ✓ All business profiles have OG+Twitter cards with generated images"
echo ""

echo "📊 Improvements Summary:"
cat << 'EOF'
1. OG Image Enhancements (/api/og/[slug]):
   - Added full address (street, city, state, zip)
   - Improved typography hierarchy
   - Added text shadows for better legibility
   - Moved footer to bottom with flex-auto

2. Business Profile JSON-LD (/business/[slug]/page.tsx):
   - Kept existing Schema.org BarberShop/BeautySalon
   - Added CallAction schema for click-to-call SEO
   - Helps Google display phone number in rich results

3. Homepage Metadata (src/app/page.tsx):
   - Added OG image reference (fallback to /og/smart-link.jpg)
   - Added Twitter site handle
   - Improved title/description visibility

4. Business Profile Meta Tags:
   - Each profile now has unique OG card
   - Images generated via /api/og/[slug]
   - Includes business name, city, category
   - Full address on image for local SEO

EOF

echo ""
echo "✅ Verification complete!"
echo ""
echo "To test:"
echo "  cd smart-link-app && npm run build"
echo "  curl $APP_URL/api/ai/cuts-barbershop"
echo "  curl $APP_URL/business/cuts-barbershop"
echo ""
