import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";
  const urlToEncode = `${baseUrl}/business/${encodeURIComponent(String(slug))}`;
  
  try {
    // Generate QR code as SVG (scannable and scalable)
    const svg = await QRCode.toSVG(urlToEncode, {
      width: 300,
      margin: 2,
      type: "svg",
    });
    
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "max-age=86400, public",
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
