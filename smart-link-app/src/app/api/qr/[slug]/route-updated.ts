import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

// Cache for static SVG QR codes (keyed by slug)
const STATIC_QR_CACHE = new Map<string, string>();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";
  const urlToEncode = `${baseUrl}/business/${encodeURIComponent(String(slug))}`;

  // Check if static SVG exists first (served with long cache)
  const slugHash = slug.toLowerCase().replace(/-/g, "_");
  const staticFile = STATIC_QR_CACHE.get(slugHash);

  if (staticFile) {
    console.log(`[QR] Serving static QR for: ${slug}`);
    return new NextResponse(staticFile, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "max-age=31536000, public", // 1 year cache
        "X-From": "static",
      },
    });
  }

  try {
    // Fallback: generate dynamic QR code on-the-fly
    const svg = await QRCode.toSVG(urlToEncode, {
      width: 300,
      margin: 2,
      type: "svg" as const,
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "max-age=86400, public", // 24h default cache
      },
    });
  } catch (error) {
    console.error("QR code generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
