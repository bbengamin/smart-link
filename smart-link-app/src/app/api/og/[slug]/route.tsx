import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getDemoBusiness } from "@/data/demo";
import { supabase } from "@/lib/supabase";

// Route segment config
export const runtime = "nodejs";
export const dynamic = "force-static";

// OG metadata
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return {
    title: "OG Image",
    description: "Open Graph image for business profiles",
  };
}

// OG Image generator
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  let business: { name: string; description: string; category: string; city: string } | null = null;

  // Try demo data first
  const demo = getDemoBusiness(slug);
  if (demo) {
    business = {
      name: demo.name,
      description: demo.description,
      category: demo.category,
      city: demo.city,
    };
  }

  // Try live Supabase if demo didn't match
  if (!business) {
    try {
      const { data: b } = await supabase
        .from("businesses")
        .select("name,description,category,city")
        .eq("slug", slug)
        .single();
      if (b) business = b;
    } catch {
      // Supabase not configured, skip
    }
  }

  if (!business) {
    notFound();
  }

  const categoryEmoji = business.category === "salon" ? "💇" : "💈";
  const bgColor = business.category === "salon" ? "#7c3aed" : "#2563eb";
  
  // Format address for local SEO visibility in OG image
  const formattedAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>{categoryEmoji}</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {business.name}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            marginBottom: 8,
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {business.city} · {business.category === "salon" ? "Salon" : "Barbershop"}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: 24,
            lineHeight: 1.4,
          }}
        >
          {formattedAddress}
        </div>
        <div
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          {business.description}
        </div>
        <div
          style={{
            marginTop: auto,
            padding: "10px 24px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            fontSize: 16,
            color: "white",
            fontWeight: 600,
          }}
        >
          smartlink.app/business/{slug}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
