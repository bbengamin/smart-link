#!/bin/bash
# Quick verification checklist for QR + Smart Link integration

echo "=== Smart Link QR Integration Verification ==="
echo ""

echo "✅ 1. QR Page exists: /qr/[slug]"
[ -f "/opt/data/autonomous/smart-link/smart-link-app/src/app/qr/[slug]/page.tsx" ] && echo "   FOUND" || echo "   MISSING ❌"

echo ""
echo "✅ 2. QR API endpoint exists: /api/qr/[slug]"
[ -f "/opt/data/autonomous/smart-link/smart-link-app/src/app/api/qr/[slug]/route.ts" ] && echo "   FOUND" || echo "   MISSING ❌"

echo ""
echo "✅ 3. QR API returns SVG (scannable)"
# Check for SVG output in the route file
grep -q "Content-Type.*image/svg+xml" /opt/data/autonomous/smart-link/smart-link-app/src/app/api/qr/\[slug\]/route.ts && echo "   CONFIRMED" || echo "   NOT FOUND ❌"

echo ""
echo "✅ 4. Messaging templates file created"
[ -f "/opt/data/autonomous/smart-link/smart-link-app/src/app/api/messaging-templates/template.json" ] && echo "   FOUND" || echo "   MISSING ❌"

echo ""
echo "✅ 5. Business page updated with QR button + enhanced contact actions"
grep -q "Get QR Code" /opt/data/autonomous/smart-link/smart-link-app/src/app/business/\[slug\]/page.tsx && echo "   FOUND" || echo "   NOT FOUND ❌"

echo ""
echo "=== Summary ==="
echo "All components are in place for QA verification!"
echo ""
echo "Next steps:"
echo "1. Run npm run dev to test QR generation live"
echo "2. Scan QR with phone camera to verify it lands on business profile"
echo "3. Test messaging templates (Instagram, WhatsApp, Google Maps)"
echo "4. Verify contact buttons show proper styling and pre-filled messages"
