/**
 * Client List View — Admin page showing all clients with booking history.
 * Demo mode uses mock data; live mode will query Supabase.
 */

import { mockClients, type MockClient } from "@/data/mock-clients";
import Link from "next/link";

// --- Sub-components ---

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    inactive: "bg-gray-50 text-gray-500 border-gray-200",
    new: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ClientRow({ client }: { client: MockClient }) {
  return (
    <div className="flex items-center justify-between py-4 px-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
          {client.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{client.name}</p>
          <p className="text-sm text-gray-500 truncate">{client.email}</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-6 text-sm shrink-0">
        <div className="text-center">
          <p className="font-semibold text-gray-900">{client.totalBookings}</p>
          <p className="text-xs text-gray-500">Bookings</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-900">${client.totalSpent}</p>
          <p className="text-xs text-gray-500">Spent</p>
        </div>
        <div className="text-center hidden md:block">
          <p className="font-medium text-gray-900 truncate max-w-[120px]">{client.favoriteService}</p>
          <p className="text-xs text-gray-500">Favorite</p>
        </div>
        <div className="text-center hidden lg:block">
          <p className="text-gray-900">{client.lastVisit || "—"}</p>
          <p className="text-xs text-gray-500">Last Visit</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <StatusBadge status={client.status} />
        <a
          href={`tel:${client.phone}`}
          className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-colors"
          title="Call"
        >
          📞
        </a>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function ClientListView() {
  const clients = mockClients;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const activeClients = clients.filter((c) => c.status === "active").length;
  const newClients = clients.filter((c) => c.status === "new").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              SL
            </div>
            <span className="font-semibold text-gray-900">Cut&apos;s Barbershop</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Client List</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Dashboard
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

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-500">Total Clients</span>
            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-500">Active</span>
            <p className="text-2xl font-bold text-green-600">{activeClients}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-500">New</span>
            <p className="text-2xl font-bold text-blue-600">{newClients}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-500">Total Revenue</span>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-500 mr-2">Filter:</span>
          {["All", "Active", "New", "Inactive"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Client List */}
        <section className="space-y-3">
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-400 pb-8">
          <p>Powered by <Link href="/" className="text-blue-600 hover:underline font-medium">Smart Link</Link></p>
        </footer>
      </main>
    </div>
  );
}
