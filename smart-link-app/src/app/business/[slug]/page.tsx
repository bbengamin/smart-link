import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Props
interface Props {
  params: Promise<{ slug: string }>;
}

// Business profile page — SSR for SEO
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: business } = await supabase!
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (!business) {
      return { title: "Business Not Found" };
    }

    return {
      title: `${business.name} — ${business.city || "Local"} Business`,
      description: business.description || `Visit ${business.name} in ${business.city || "your area"}.`,
      openGraph: {
        title: `${business.name} | Smart Link`,
        description: business.description || "",
        type: "website",
      },
    };
  } catch {
    return { title: "Smart Link — Business Profile" };
  }
}

// JSON-LD for AI indexing
function BusinessJSONLD(business: any) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BarberShop",
      name: business.name,
      description: business.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/business/${business.slug}`,
      telephone: business.phone,
      email: business.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.zip,
      },
      openingHoursSpecification: Object.entries(business.hours || {}).map(
        ([day, hours]: [string, any]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: hours.open,
          closes: hours.close,
        })
      ),
      priceRange: "$$",
      image: business.logo_url,
    }),
  };
}

export default async function BusinessProfilePage({ params }: Props) {
  const { slug } = await params;

  const { data: business, error } = await supabase!
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !business) {
    notFound();
  }

  const { data: services } = await supabase!
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .eq("is_active", true)
    .order("price", { ascending: true });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {/* JSON-LD for AI indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={BusinessJSONLD(business)}
      />

      {/* Header */}
      <div className="text-center mb-8">
        {business.logo_url && (
          <img
            src={business.logo_url}
            alt={`${business.name} logo`}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
        <p className="mt-2 text-gray-600">{business.city}{business.state ? `, ${business.state}` : ""}</p>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>⭐ 4.9</span>
          <span>·</span>
          <span className="text-green-600 font-medium">Open now</span>
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <p className="text-center text-gray-700 mb-8 max-w-lg mx-auto">
          {business.description}
        </p>
      )}

      {/* Services */}
      {services && services.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Services & Pricing
          </h2>
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border border-gray-100 shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.duration_minutes} min
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(service.price / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <div className="mb-8">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl text-lg font-semibold shadow-sm transition-colors">
          Book Appointment
        </button>
      </div>

      {/* Contact Buttons */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Contact
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              📞 Call
            </a>
          )}
          {business.phone && (
            <a
              href={`https://wa.me/${business.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              💬 WhatsApp
            </a>
          )}
          {business.email && (
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              ✉️ Email
            </a>
          )}
          {business.address && business.city && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + " " + business.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              📍 Directions
            </a>
          )}
        </div>
      </section>

      {/* Hours */}
      {business.hours && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Hours
          </h2>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm divide-y">
            {Object.entries(business.hours).map(([day, hours]: [string, any]) => (
              <div
                key={day}
                className="flex justify-between px-4 py-2.5 text-sm"
              >
                <span className="capitalize text-gray-700">{day}</span>
                <span className="text-gray-500">
                  {hours.open} — {hours.close}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400">
        <p>Powered by <a href="/" className="text-blue-600 hover:underline">Smart Link</a></p>
      </footer>
    </main>
  );
}
