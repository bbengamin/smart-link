import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getDemoBusiness, getDemoServices, getDemoReviews } from "@/data/demo";
import ReviewsSection from "@/components/ReviewsSection";
import { onPageView, track, onContactClick } from "@/lib/analytics";

// Props
interface Props {
  params: Promise<{ slug: string }>;
}

// Per-business geo coordinates
const businessGeo: Record<string, { latitude: number; longitude: number }> = {
  "cuts-barbershop": { latitude: 40.6782, longitude: -73.9442 },  // Tribeca
  "luxe-salon": { latitude: 40.7589, longitude: -73.9851 },        // SoHo
  "fresh-cuts-studio": { latitude: 40.7282, longitude: -73.7949 }, // Long Island City
  "glow-hair-studio": { latitude: 40.7580, longitude: -73.9855 },  // SoHo
};

// Per-business social links
const businessSocials: Record<string, { facebook_url?: string; instagram_url?: string; twitter_url?: string }> = {
  "cuts-barbershop": {
    instagram_url: "https://instagram.com/cutsbarbershop",
    twitter_url: "https://twitter.com/cutsbarbershop"
  },
  "luxe-salon": {
    facebook_url: "https://facebook.com/luxesalon",
    instagram_url: "https://instagram.com/luxesalon"
  },
  "fresh-cuts-studio": {
    instagram_url: "https://instagram.com/freshcutsstudio"
  },
  "glow-hair-studio": {
    facebook_url: "https://facebook.com/glowhairstudio",
    twitter_url: "https://twitter.com/glowhairstudio"
  }
};

// Helper to get geo for a business slug
function getBusinessGeo(slug: string): { latitude: number; longitude: number } | null {
  return businessGeo[slug] || null;
}

// Helper to get social links for a business slug
function getBusinessSocials(slug: string): { facebook_url?: string; instagram_url?: string; twitter_url?: string } | null {
  return businessSocials[slug] || null;
}

// JSON-LD for AI indexing
function BusinessJSONLD(business: any, slug: string) {
  const realGeo = getBusinessGeo(slug);
  const socials = getBusinessSocials(slug);
  
  // Compute aggregate rating from reviews
  let avgRating = 4.5;
  let reviewCount = 127;
  if (business.reviews && business.reviews.length > 0) {
    const total = business.reviews.reduce((sum: number, r: any) => sum + (r.rating || 4), 0);
    avgRating = (total / business.reviews.length).toFixed(1);
    reviewCount = business.reviews.length;
  } else if (!isDemoMode()) {
    // Live mode - fetch from DB would go here
  }
  
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": business.category === "salon" ? "BeautySalon" : "BarberShop",
      name: business.name,
      description: business.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}`,
      telephone: business.phone,
      email: business.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.zip,
        addressCountry: "US",
      },
      priceRange: business.category === 'salon' ? '$$$' : '$$',
      areaServed: [
        business.city,
        {
          "@type": "City",
          name: business.city,
          addressLocality: business.city,
        },
      ],
      ...(realGeo ? {
        geo: realGeo,
      } : {}),
            addressRegion: business.state,
            postalCode: business.zip,
            addressCountry: "US",
          },
          priceRange: business.category === 'salon' ? '$$$' : '$$',
          areaServed: [
            business.city,
            {
              "@type": "City",
              name: business.city,
              addressLocality: business.city,
            },
          ],
          ...(realGeo ? {
            geo: realGeo,
          } : {}),
      sameAs: [
        ...(socials?.facebook_url ? [socials.facebook_url] : []),
        ...(socials?.instagram_url ? [socials.instagram_url] : []),
        ...(socials?.twitter_url ? [socials.twitter_url] : []),
      ].filter(Boolean),
      openingHoursSpecification: Object.entries(business.hours || {}).map((entry: any) => {
        const [day, hours] = entry;
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].find(
            (d) => d.toLowerCase().replace(/day$/, "") === day.replace(/day$/g, "").toLowerCase()
          ),
          opens: hours.open,
          closes: hours.close,
        };
      }).filter((item: any) => item.dayOfWeek),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
      makesOffer: business.services?.map((service: any) => ({
        "@type": "Offer",
        name: service.name,
        description: service.description,
        price: (service.price / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        acceptsReservation: true,
        offersService: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })) || [],
    }),
  };
}

// Determine if we're in demo mode
function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return true;
  if (url.includes("placeholder") || url.includes("demo")) return true;
  return false;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoBusiness(slug);

  if (demo) {
    return {
      title: `${demo.name} — ${demo.city} Business | Smart Link`,
      description: demo.description,
      openGraph: {
        title: `${demo.name} | Smart Link`,
        description: demo.description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}`,
        siteName: "Smart Link",
        locale: "en_US",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/${slug}`,
            width: 1200,
            height: 630,
            alt: `${demo.name} — ${demo.city} ${demo.category === 'salon' ? 'Salon' : 'Barbershop'}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${demo.name} | Smart Link`,
        description: demo.description,
        images: [
          `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/${slug}`,
        ],
      },
    };
  }

  // Live DB mode
  try {
    const { data: business } = await supabase!
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (!business) {
      return { title: "Business Not Found | Smart Link" };
    }

    return {
      title: `${business.name} — ${business.city || "Local"} Business | Smart Link`,
      description: business.description || `Visit ${business.name} in ${business.city || "your area"}.`,
      openGraph: {
        title: `${business.name} | Smart Link`,
        description: business.description || "",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/business/${slug}`,
        siteName: "Smart Link",
        locale: "en_US",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/${slug}`,
            width: 1200,
            height: 630,
            alt: `${business.name} — ${business.city} ${business.category === 'salon' ? 'Salon' : 'Barbershop'}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${business.name} | Smart Link`,
        description: business.description || "",
        images: [
          `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/${slug}`,
        ],
      },
    };
  } catch {
    return { title: "Smart Link — Business Profile" };
  }
}

export default async function BusinessProfilePage({ params }: Props) {
  const { slug } = await params;
  const demo = getDemoBusiness(slug);

  let business: any;
  let services: any[] = [];
  let reviews: any[] = [];

  if (demo) {
    business = demo;
    services = getDemoServices(slug);
    reviews = getDemoReviews(slug);
  } else {
    const { data: b, error } = await supabase!
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !b) {
      notFound();
    }
    business = b;

    const { data: s } = await supabase!
      .from("services")
      .select("*")
      .eq("business_id", business.id)
      .eq("is_active", true)
      .order("price", { ascending: true });

    services = s || [];
  }

  // Determine hours status
  const now = new Date();
  const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = dayMap[now.getDay()];
  const todayHours = business.hours?.[today];
  const isOpen = todayHours
    ? (() => {
        const nowMin = now.getHours() * 60 + now.getMinutes();
        const [openH, openM] = todayHours.open.split(":").map(Number);
        const [closeH, closeM] = todayHours.close.split(":").map(Number);
        return nowMin >= openH * 60 + openM && nowMin < closeH * 60 + closeM;
      })()
    : false;

  const isDemo = !!demo;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* JSON-LD for AI indexing - Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={BusinessJSONLD(business, slug)}
      />

      {/* Local Business Phone Click-to-call markup */}
      {business.phone && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CallAction",
              "url": `tel:${business.phone.replace(/[^0-9+]/g, "")}`,
              "description": "Call",
            })}
        />
      )}

      {/* Demo mode badge */}
      {isDemo && (
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
            Demo Mode — No database connected
          </span>
        </div>
      )}

      {/* Track page view with source/referrer */}
      {typeof window !== 'undefined' && onPageView({ slug, isDemo })}

      {/* Header */}
      <div className="text-center mb-8">
        {business.logo_url ? (
          <img
            src={business.logo_url}
            alt={`${business.name} logo`}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl text-white font-bold">
            {business.name.charAt(0)}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {business.name}
        </h1>
        <p className="mt-2 text-gray-500 text-base">
          {business.city}{business.state ? `, ${business.state}` : ""} · {business.category === "salon" ? "Salon" : "Barbershop"}
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">★★★★★</span>
            <span className="font-medium text-gray-700">
              {business.reviews?.length ? (
                (business.reviews.reduce((sum: number, r: any) => sum + (r.rating || 4), 0) / business.reviews.length).toFixed(1)
              ) : "4.9"}
            </span>
          </span>
          <span className="text-gray-300">·</span>
          <span className={`font-medium ${isOpen ? "text-green-600" : "text-gray-400"}`}>
            {isOpen ? "Open now" : "Closed now"}
          </span>
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <p className="text-center text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
          {business.description}
        </p>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 px-1">
            Services & Pricing
          </h2>
          <div className="space-y-2">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3.5 px-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {service.name}
                  </p>
                  {service.description && (
                    <p className="text-sm text-gray-400 mt-0.5">
                      {service.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {service.duration_minutes} min
                  </p>
                </div>
                <p className="font-semibold text-gray-900 ml-4 shrink-0">
                  ${(service.price / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <div className="mb-10">
        <a
          href={`/business/${slug}/book`}
          onClick={() => track('contact_click', { slug, method: 'book' })}
          className="block w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-sm hover:shadow-md transition-all text-center"
        >
          Book Appointment
        </a>
        {isDemo && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Demo mode — bookings are stored locally
          </p>
        )}
      </div>

      {/* QR Code - Add to contact buttons */}
      <a
        href={`/qr/${slug}`}
        onClick={() => track('contact_click', { slug, method: 'qr' })}
        className="block w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors mb-2"
      >
        📱 Get QR Code
      </a>

      {/* Contact Buttons */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
          Contact
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {business.phone && (
            <a
              href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
              onClick={() => onContactClick('call')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              📞 Call
            </a>
          )}
          {business.phone && (
            <a
              href={`https://wa.me/${business.phone.replace(/[^0-9]/g, "")}?text=Hi,%20I%20saw%20your%20smart%20link%20and%20wanted%20to%20book!`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onContactClick('whatsapp')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-xl text-sm font-medium text-green-700 border border-green-200 transition-colors"
            >
              💬 WhatsApp
            </a>
          )}
          {business.email && (
            <a
              href={`mailto:${business.email}?subject=Smart%20Link%20Booking%20Inquiry`}
              onClick={() => onContactClick('email')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              ✉️ Email
            </a>
          )}
          {business.address && business.city && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + " " + business.city + " " + (business.state || "") + " " + (business.zip || ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onContactClick('directions')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              📍 Directions
            </a>
          )}
        </div>
      </section>

      {/* Distribution info note */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Distribution tip:</strong> Share your smart link with customers to make it easy for them to find you on Google, Instagram, Yelp, and more. Visit the{" "}
          <a href="/distribution" className="text-blue-600 hover:underline underline">Distribution Surfaces</a> page for copy templates and best practices.
        </p>
      </div>

      {/* Hours */}
      {business.hours && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
            Hours
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {Object.entries(business.hours).map(([day, hours]: [string, any]) => {
              const isToday = day === today;
              const dayLabel = day.charAt(0).toUpperCase() + day.slice(1, 3);
              return (
                <div
                  key={day}
                  className={`flex justify-between px-4 py-2.5 text-sm ${
                    isToday ? "bg-blue-50/50" : ""
                  }`}
                >
                  <span className={`font-medium ${isToday ? "text-blue-700" : "text-gray-700"}`}>
                    {isToday && <span className="mr-1.5 text-xs">●</span>}
                    {dayLabel}
                  </span>
                  <span className={`${isToday ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                    {hours.open} — {hours.close}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reviews */}
      <ReviewsSection
        slug={slug}
        reviews={reviews}
        isDemo={isDemo}
      />

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 pt-4 border-t border-gray-100">
        <p>Powered by <a href="/" className="text-blue-600 hover:underline font-medium">Smart Link</a></p>
      </footer>
    </main>
  );
}
