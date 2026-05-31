import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
          color: "white",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.9, marginBottom: 18 }}>
          Smart Link
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 860, marginBottom: 24 }}>
          AI-ready business profiles for salons, barbershops, and local service brands
        </div>
        <div style={{ fontSize: 28, opacity: 0.9, maxWidth: 900, lineHeight: 1.35 }}>
          Booking, hours, services, reviews, and contact details in one link that search engines and AI assistants can actually read.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
