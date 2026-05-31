import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import * as QRCode from "qrcode";
import { getDemoBusiness } from "@/data/demo";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugValue = String(slug);

  const demoBusiness = getDemoBusiness(slugValue);
  if (demoBusiness) {
    const staticSvgPath = path.join(process.cwd(), "public", "qr-static", `${demoBusiness.slug}.svg`);
    try {
      const staticSvg = await readFile(staticSvgPath, "utf8");
      return new NextResponse(staticSvg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "max-age=86400, public",
        },
      });
    } catch {
      // Fall through to dynamic generation if the static asset is missing.
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin || "https://smartlink.app";
  const urlToEncode = `${baseUrl}/business/${encodeURIComponent(slugValue)}`;
  
  try {
    const svg = await QRCode.toString(urlToEncode, {
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
