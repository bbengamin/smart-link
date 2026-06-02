/**
 * Demo Booking Viewer
 * In demo mode, this page shows bookings saved to localStorage.
 * Not available in live mode (bookings are in the database).
 */

"use client";

import { useState, useEffect } from "react";

interface DemoBooking {
  id: string;
  businessSlug: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  status: string;
  created_at: string;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DemoBookingsPage() {
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const inDemo =
      !url ||
      url.includes("placeholder") ||
      url.includes("demo") ||
      url === "";
    setIsDemo(inDemo);

    if (inDemo) {
      try {
        const stored = localStorage.getItem("smart_link_bookings");
        const parsed: DemoBooking[] = stored ? JSON.parse(stored) : [];
        setBookings(parsed);
      } catch {
        setBookings([]);
      }
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("smart_link_bookings");
    setBookings([]);
  };

  if (!isDemo) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center">
          <p className="text-gray-500">
            Demo bookings are only available in demo mode.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            In live mode, bookings are stored in the database and managed via the business dashboard.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Demo Bookings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Bookings saved to this browser&apos;s localStorage
          </p>
        </div>
        {bookings.length > 0 && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Demo badge */}
      <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        ⚠️ These bookings are stored locally in your browser. They are not sent to any business and will be lost if you clear your browser data.
      </div>

      {/* Empty state */}
      {bookings.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-500 font-medium">No demo bookings yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Try booking an appointment at a demo business first.
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            View Demo Businesses
          </a>
        </div>
      )}

      {/* Booking list */}
      {bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {booking.status}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {booking.id.slice(0, 8)}...
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(booking.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Business</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {booking.businessSlug.replace(/-/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Service</p>
                    <p className="font-medium text-gray-900">
                      {booking.serviceName} — {formatPrice(booking.servicePrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Date & Time</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(booking.date)} at {booking.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Customer</p>
                    <p className="font-medium text-gray-900">{booking.customerName}</p>
                    {booking.customerPhone && (
                      <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                    )}
                    {booking.customerEmail && (
                      <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                    )}
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <p className="text-xs text-gray-400 mb-0.5">Notes</p>
                    <p className="text-sm text-gray-600">{booking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-400 pt-4 border-t border-gray-100">
        <a href="/" className="text-blue-600 hover:underline">← Back to Nearspoke</a>
      </footer>
    </main>
  );
}
