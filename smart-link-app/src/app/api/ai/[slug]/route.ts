/**
 * AI Data Endpoint — returns structured business data for LLM consumption.
 * Used by AI crawlers, search engines, and AI assistants to understand
 * business information without rendering HTML.
 */
import { NextResponse } from "next/server";
import { getDemoBusiness, getDemoServices } from "@/data/demo";
import {
  buildBusinessMapUrl,
  getBusinessAreaServed,
  getBusinessGeo,
  getBusinessNeighborhood,
  getBusinessSocials,
} from "@/data/business-discovery";
import { supabase } from "@/lib/supabase";

// Route config
export const runtime = "nodejs";
export const dynamic = "force-static";



// Generate static paths for demo businesses (all 4)
export function generateStaticParams() {
  return [
    { slug: "cuts-barbershop" },
    { slug: "luxe-salon" },
    { slug: "fresh-cuts-studio" },
    { slug: "glow-hair-studio" },
  ];
}

// Compute aggregate rating from reviews or use fallback
function computeAggregateRating(business: any, source: "demo" | "supabase"): { ratingValue: number; reviewCount: number } {
  if (source === "demo" && business.reviews && business.reviews.length > 0) {
    const total = business.reviews.reduce((sum: number, r: any) => sum + (r.rating || 4), 0);
    return {
      ratingValue: parseFloat((total / business.reviews.length).toFixed(1)),
      reviewCount: business.reviews.length,
    };
  }
  return { ratingValue: parseFloat((business.rating || 4.5).toString()), reviewCount: business.reviewCount || 127 };
}

interface AIResponse {
  business: {
    name: string;
    description: string;
    category: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    website?: string;
    hours: Record<string, { open: string; close: string }>;
    services: Array<{ name: string; description?: string; price: number; duration_minutes: number; acceptsReservation?: boolean }> | null;
    rating: number;
    reviewCount: number;
    priceRange: string;
    neighborhood?: string;
    areaServed?: string[];
    bookingUrl?: string;
    mapUrl?: string;
  };
  schema: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    telephone?: string;
    email?: string;
    priceRange: string;
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      addressRegion?: string;
      postalCode: string;
      addressCountry: string;
    };
    geo?: {
      "@type": string;
      latitude: number;
      longitude: number;
    };
    areaServed?: Array<{
      "@type": string;
      name: string;
    }>;
    hasMap?: string;
    mainEntityOfPage?: string;
    sameAs?: string[];
    openingHoursSpecification?: Array<{
      "@type": string;
      dayOfWeek: string;
      opens: string;
      closes: string;
    }>;
    aggregateRating: {
      "@type": string;
      ratingValue: number;
      reviewCount: number;
      bestRating: string;
      worstRating: string;
    };
    makesOffer?: Array<{
      "@type": string;
      name: string;
      description?: string;
      price: string;
      priceCurrency: string;
      availability?: string;
      acceptsReservation?: boolean;
      offersService?: {
        "@type": string;
        name: string;
        description?: string;
      };
    }>;
  };
  source: "demo" | "supabase";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let business: any = null;
  let services: Array<{ name: string; description?: string; price: number; duration_minutes: number }> | null = [];
  let source: "demo" | "supabase" = "demo";

  // Try demo data first
  const demo = getDemoBusiness(slug);
  if (demo) {
    business = demo;
    services = getDemoServices(slug);
    source = "demo";
  }

  // Try live Supabase if demo didn't match
  if (!business) {
    try {
      const { data: b } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", slug)
        .single();
      if (b) {
        business = b;
        const { data: s } = await supabase
          .from("services")
          .select("name,description,price,duration_minutes")
          .eq("business_id", b.id);
        services = s || [];
        source = "supabase";
      }
    } catch {
      // Supabase not configured
    }
  }

  if (!business) {
    return NextResponse.json(
      { error: "Business not found", slug },
      { status: 404 },
    );
  }

  const geo = getBusinessGeo(slug);
  const socials = getBusinessSocials(slug);
  const neighborhood = getBusinessNeighborhood(slug);
  const areaServed = getBusinessAreaServed(slug, business.city, business.state);
  const bookingUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}/book`;
  const mapUrl = buildBusinessMapUrl({
    address: business.address,
    city: business.city,
    state: business.state,
    zip: business.zip,
  });
  
  const aggregate = computeAggregateRating(business, source);

  const response: AIResponse = {
    business: {
      name: business.name,
      description: business.description,
      category: business.category,
      address: business.address,
      city: business.city,
      state: business.state || "",
      zip: business.zip || "",
      phone: business.phone || "",
      email: business.email || "",
      website: business.website,
      hours: business.hours || {},
      services: services.map((s) => ({
        name: s.name,
        description: s.description || undefined,
        price: s.price,
        duration_minutes: s.duration_minutes,
        acceptsReservation: true,
      })),
      rating: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      priceRange: "$$",
      neighborhood,
      areaServed,
      bookingUrl,
      mapUrl,
    },
    schema: {
      "@context": "https://schema.org",
      "@type": business.category === "salon" ? "BeautySalon" : "BarberShop",
      name: business.name,
      description: business.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}`,
      telephone: business.phone,
      email: business.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.zip,
        addressCountry: "US",
      },
      areaServed: areaServed.map((name) => ({
        "@type": "City",
        name,
      })),
      ...(geo ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
      } : {}),
      ...(mapUrl ? { hasMap: mapUrl } : {}),
      mainEntityOfPage: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}`,
      sameAs: [
        ...(socials?.facebook_url ? [socials.facebook_url] : []),
        ...(socials?.instagram_url ? [socials.instagram_url] : []),
        ...(socials?.twitter_url ? [socials.twitter_url] : []),
      ].filter(Boolean),
      openingHoursSpecification: Object.entries(business.hours || {}).map((entry) => {
        const [day, hours] = entry as [string, any];
        // Map short keys (mon/tue/wed/sat/sun) to proper schema.org weekday names
        const dayMap: Record<string, string> = {
          mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday",
          sat: "Saturday", sun: "Sunday",
        };
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayMap[day.toLowerCase()] || (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].find(
            (d) => d.toLowerCase().replace(/day$/, "") === day.replace(/day$/g, "").toLowerCase()
          ) || "Monday",
          opens: hours.open,
          closes: hours.close,
        };
      }).filter((item: any) => item.dayOfWeek && item.opens && item.closes),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregate.ratingValue,
        reviewCount: aggregate.reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
      makesOffer: services?.map((s) => ({
        "@type": "Offer",
        name: s.name,
        description: s.description ? s.description : undefined,
        price: (s.price / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock" as const,
        acceptsReservation: true,
        offersService: {
          "@type": "Service",
          name: s.name,
          description: s.description ? s.description : undefined,
        },
      })) || [],
    },
    source,
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
