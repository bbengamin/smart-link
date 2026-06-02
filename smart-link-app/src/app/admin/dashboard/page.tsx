/**
 * Business Dashboard — Admin panel for business owners.
 * Shows stats, recent bookings, and quick actions with funnel analytics.
 * Demo mode uses mock data; live mode will query Supabase.
 */

import { mockBookings, mockStats } from "@/data/mock-dashboard";
import Link from "next/link";
import { DemoAnalyticsDashboard } from "@/components/BusinessAnalyticsDashboard";

// --- Sub-components ---

function StatCard({ label, value, icon, accent }: {
  label: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    confirmed: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function MiniBar({ count, max }: { count: number; max: number }) {
  const pct = Math.round((count / max) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// --- Main Page ---

export default function AdminDashboardPage() {
  const businessSlug = process.env.NEXT_PUBLIC_SL_BUSINESS_SLUG || "cuts-barbershop";
  const stats = mockStats;
  const bookings = mockBookings;
  const maxDayCount = Math.max(...stats.bookingsByDay.map((d) => d.count));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              SL
            </div>
            <span className="font-semibold text-gray-900">{businessSlug}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`/business/${businessSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View Public Page →
            </a>
            <Link
              href="/admin/clients"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Client List
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Demo badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
            Demo Mode — Mock Data
          </span>
        </div>

        {/* Analytics Section */}
        <section className="mb-8">
          <DemoAnalyticsDashboard businessSlug={businessSlug} />
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard label="Revenue (Month)" value={`$${stats.totalRevenue.toLocaleString()}`} icon="💰" accent="text-green-600" />
          <StatCard label="Bookings (Month)" value={String(stats.bookingsThisMonth)} icon="📅" accent="text-blue-600" />
          <StatCard label="Pending" value={String(stats.pendingBookings)} icon="⏳" accent="text-amber-600" />
          <StatCard label="Rating" value={`${stats.avgRating} ★ (${stats.reviewCount})`} icon="⭐" accent="text-yellow-600" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Weekly Chart */}
          <section className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Bookings This Week</h2>
            <div className="space-y-4">
              {stats.bookingsByDay.map((day) => (
                <div key={day.day}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">{day.day}</span>
                    <span className="text-gray-900 font-semibold">{day.count}</span>
                  </div>
                  <MiniBar count={day.count} max={maxDayCount} />
                </div>
              ))}
            </div>
          </section>

          {/* Right: Recent Bookings */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              <span className="text-sm text-gray-500">
                Live bookings appear here from your database.
              </span>
            </div>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {booking.customerName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{booking.customerName}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {booking.service} · {booking.date} at {booking.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="font-semibold text-gray-900">${booking.total}</span>
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Top Services */}
        <section className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Services</h2>
          <div className="space-y-4">
            {stats.topServices.map((service, idx) => (
              <div key={service.name} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-400 w-6 text-right">#{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900 truncate">{service.name}</span>
                    <span className="text-gray-500 shrink-0 ml-4">{service.bookings} bookings · ${service.revenue}</span>
                  </div>
                  <MiniBar count={service.bookings} max={stats.topServices[0].bookings} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/business/${businessSlug}/book`}
            className="flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold shadow-sm transition-colors"
          >
            📅 New Booking
          </Link>
          <Link
            href="/admin/clients"
            className="flex items-center justify-center gap-2 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-2xl font-semibold border border-gray-100 shadow-sm transition-colors"
          >
            👥 Client List
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-400 pb-8">
          <p>Powered by <Link href="/" className="text-blue-600 hover:underline font-medium">Nearspoke</Link></p>
        </footer>
      </main>
    </div>
  );
}
