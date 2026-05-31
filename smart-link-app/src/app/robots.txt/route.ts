import { NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";

export function GET() {
  const robotsTxt = `# Smart Link — robots.txt

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# AI crawlers
User-agent: GPTBot
Allow: /business/
Disallow: /api/

User-agent: Google-Extended
Allow: /business/
Disallow: /api/

User-agent: Cohere-ai
Disallow: /

Sitemap: ${APP_URL}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
