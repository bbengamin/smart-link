export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your business deserves a{" "}
          <span className="text-blue-600">smart link</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          One link for your business — booking, contact info, reviews, and more.
          Designed for barbershops, salons, and local services.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#signup"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="#demo"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            View Demo →
          </a>
        </div>
      </div>

      {/* Features */}
      <section className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="text-3xl">📅</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Online Booking
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Customers book appointments 24/7. No more phone tag.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="text-3xl">🤖</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            AI-Indexed
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Your profile is structured for AI agents to find and recommend you.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="text-3xl">📊</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Simple CRM
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Track clients, history, and preferences in one place.
          </p>
        </div>
      </section>

      {/* Demo Preview */}
      <section
        id="demo"
        className="mt-24 rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Preview: What a Smart Link looks like
        </h2>
        <div className="rounded-xl bg-gray-900 p-6 text-white max-w-sm mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl">
              ✂️
            </div>
            <div>
              <h3 className="font-bold text-lg">Cut's Barbershop</h3>
              <p className="text-gray-400 text-sm">
                ⭐ 4.9 (127 reviews) · Open now
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Premium cuts, fades & beard trims. Walk-ins welcome.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Haircut</span>
              <span className="text-gray-400">$30 · 30min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fade + Beard</span>
              <span className="text-gray-400">$45 · 45min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Beard Trim</span>
              <span className="text-gray-400">$20 · 20min</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Book Appointment
          </button>
          <div className="mt-4 flex justify-center gap-3">
            <button className="text-gray-400 hover:text-white text-sm">
              📞 Call
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              💬 WhatsApp
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              📍 Directions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-gray-500">
        <p>© 2026 Smart Link. Built for local businesses.</p>
      </footer>
    </main>
  );
}
