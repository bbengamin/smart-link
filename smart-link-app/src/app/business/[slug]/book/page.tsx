/**
 * Booking page for a specific business.
 * Multi-step flow: Date → Service → Details → Confirmation
 * Works in demo mode with seeded data; connects to Supabase when available.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingForm } from "@/app/business/[slug]/book/BookingForm";
import { getDemoBusiness, getDemoServices } from "@/data/demo";
import { supabase } from "@/lib/supabase";
import { track } from "@/lib/analytics";

// Track booking page view on load (client-side only)
if (typeof window !== 'undefined') {
  track('booking_start', {});
}

interface Props {
  params: Promise<{ slug: string }>;
}

function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return true;
  if (url.includes("placeholder") || url.includes("demo")) return true;
  return false;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoBusiness(slug);

  if (demo) {
    return {
      title: `Book Appointment — ${demo.name} | Smart Link`,
      description: `Book an appointment at ${demo.name}. Easy online scheduling.`,
    };
  }

  try {
    const { data: business } = await supabase!
      .from("businesses")
      .select("name")
      .eq("slug", slug)
      .single();
    return {
      title: business ? `Book Appointment — ${business.name} | Smart Link` : "Book Appointment | Smart Link",
      description: "Book an appointment with your favorite local business.",
    };
  } catch {
    return { title: "Book Appointment | Smart Link" };
  }
}

export default async function BookingPage({ params }: Props) {
  const { slug } = await params;
  const demo = getDemoBusiness(slug);

  let business: any = null;
  let services: any[] = [];
  let isDemo = false;

  if (demo) {
    business = demo;
    services = getDemoServices(slug);
    isDemo = true;
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

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Back link */}
      <a
        href={`/business/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {business.name}
      </a>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Book an Appointment
        </h1>
        <p className="mt-1 text-gray-500">
          {business.city}{business.state ? `, ${business.state}` : ""}
        </p>
      </div>

      {/* Demo badge */}
      {isDemo && (
        <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          Demo mode — bookings are stored locally and won't reach the business.
        </div>
      )}

      {/* Booking form */}
      <BookingForm
        businessSlug={slug}
        businessName={business.name}
        services={services}
        hours={business.hours}
        isDemo={isDemo}
      />
    </main>
  );
}
