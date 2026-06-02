import type { Metadata } from "next";
import Link from "next/link";
import { getAllDemoBusinesses } from "@/data/demo";

export const metadata: Metadata = {
  title: "Nearspoke — Smart Business Links for Local Companies",
  description:
    "Give your business a smart link that books customers, manages clients, and indexes itself to AI. Free for barbershops, salons, and local services.",
  keywords: [
    "smart business link",
    "AI-ready business profile",
    "barbershop booking link",
    "salon booking link",
    "local business discovery",
    "business profile for AI search",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nearspoke",
    title: "Nearspoke — Smart Business Links for Local Companies",
    description:
      "Give your business a smart link that books customers, manages clients, and indexes itself to AI.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/home`,
        width: 1200,
        height: 630,
        alt: "Nearspoke — Smart Business Links for Local Companies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearspoke — Smart Business Links",
    description:
      "One link for your business — booking, contact info, reviews, and more.",
    site: "@SmartLinkApp",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app"}/api/og/home`],
  },
};

export default function HomePage() {
  const demoBusinesses = getAllDemoBusinesses();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Your business deserves a{" "}
          <span className="text-blue-600">smart link</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          One link for your business — booking, contact info, reviews, and more.
          Designed for barbershops, salons, and local services.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#demo"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            View Demo
          </a>
          <a
            href="#features"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Demo Preview */}
      <section id="demo" className="mt-20">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Live Demo — Try It Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoBusinesses.map((biz) => (
            <Link
              key={biz.slug}
              href={`/business/${biz.slug}`}
              className="block rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl text-white font-bold shrink-0">
                  {biz.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {biz.city}{biz.state ? `, ${biz.state}` : ""}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {biz.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-blue-600 font-medium">
                View Profile →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-28">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Everything your business needs
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Stop managing bookings by phone. One smart link handles it all.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
              📅
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Online Booking
            </h3>
            <p className="text-base text-gray-600">
              Customers book appointments 24/7. No more phone tag or double
              bookings.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-4">
              🤖
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI-Indexed
            </h3>
            <p className="text-base text-gray-600">
              Your profile is structured for AI agents to find, understand, and
              recommend you.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Simple CRM
            </h3>
            <p className="text-base text-gray-600">
              Track clients, history, and preferences in one place. No spreadsheets needed.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-28">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          Get started in 3 steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Request Your Free Pilot</h3>
            <p className="text-gray-500 text-sm">
              We'll set up your smart link with our team. No self-serve signup — just reply to this page or email us directly for a 15-min discovery call.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">We Build Your Link</h3>
            <p className="text-gray-500 text-sm">
              We add your services, hours, and booking flow. Takes 4–6 business days in the pilot.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Go Live</h3>
            <p className="text-gray-500 text-sm">
              Share your link, track bookings, and see if it moves your flow. We'll debrief results after 30 days.
            </p>
          </div>
        </div>
        <div className="mt-12 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-center max-w-3xl mx-auto">
          <p className="text-sm text-gray-700">
            <strong>Interested?</strong> Reply "I want to join the Nearspoke pilot" in this email thread or 
            <a href="mailto:gerritseninstagram@gmail.com?subject=Smart Link Pilot Inquiry&body=Hi - I landed on your homepage and am interested in the free 30-day pilot. Please share a discovery call link." 
               className="text-blue-600 hover:underline font-medium">
            click here to request the pilot →</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-28 text-center text-sm text-gray-400 pt-8 border-t border-gray-100">
        <p className="mb-2">© 2026 Nearspoke. Built for local businesses.</p>
        <a href="/demo/bookings" className="text-blue-600 hover:underline">
          View Demo Bookings →
        </a>
      </footer>
    </main>
  );
}
