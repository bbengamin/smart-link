export default async function DistributionAffordances() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Distribution Surfaces for Nearspoke Links
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lightweight affordances showing how a local business can use their smart link from QR codes, social media bios, WhatsApp/SMS, websites, and Maps profiles.
        </p>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* QR Code Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#1d4ed8"/>
              <rect x="13" y="3" width="8" height="8" rx="2" stroke="#1d4ed8" strokeWidth="2"/>
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#1d4ed8"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">QR Codes</h2>
          <p className="text-sm text-gray-600 mb-3">
            Print QR codes on receipts, menus, or shop windows. Point directly to your business profile.
          </p>
          <a href="/qr/cuts-barbershop" className="inline-block text-blue-600 hover:underline text-sm">
            View Demo QR →
          </a>
        </div>

        {/* Social Bios Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#9333ea" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Social Bios</h2>
          <p className="text-sm text-gray-600 mb-3">
            Use smartlink.app/business/your-slug as your Instagram, TikTok, or Facebook bio link.
          </p>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Example: smartlink.app/business/the-coffee-roasters
          </div>
        </div>

        {/* Messaging Apps Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a3.978 4.01 0 11-6.636 2.67A4.112 4.112 0 0112 15a4.112 4.112 0 01-.37-8.222 4.112 4.112 0 015.636 2.67A3.978 4.01 0 0121 15zM8.88 5.1a2.13 2.13 0 00-1.362-.4h-1.2v6h5.5l-3-2z" stroke="#16a34a" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Messaging Apps</h2>
          <p className="text-sm text-gray-600 mb-3">
            Embed in WhatsApp Business, Telegram, or SMS cards. Rich previews show business info.
          </p>
          <div className="flex -mx-1 mt-2">
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-green-600 text-white rounded-full mr-0.5">✓</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-green-600 text-white rounded-full mr-0.5">✓</span>
          </div>
        </div>

        {/* Website Embeds Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="#f97316" strokeWidth="2"/>
              <path d="M2 9h20M8 3v5M8 22v-5M16 3v5M16 22v-5" stroke="#f97316" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Website Embeds</h2>
          <p className="text-sm text-gray-600 mb-3">
            Embed smart links on third-party sites like Yelp, Foursquare, or corporate websites.
          </p>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Use the widget: <a href="/embed-widget" className="text-blue-600 hover:underline">/embed-widget</a>
          </div>
        </div>

        {/* Documentation Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6366f1" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h2>
          <p className="text-sm text-gray-600 mb-3">
            Learn how smart links distribute across channels and implementation tips.
          </p>
          <a href="/docs/distribution" className="inline-block text-blue-600 hover:underline text-sm">
            Read Docs →
          </a>
        </div>

        {/* Maps Profiles Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#dc2626" strokeWidth="2"/>
              <circle cx="12" cy="9" r="2.5" fill="#dc2626"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Maps Profiles</h2>
          <p className="text-sm text-gray-600 mb-3">
            Add your smart link to Google Business Profile, Apple Maps, and Yelp. Shows up in search results.
          </p>
          <div className="flex -mx-1 mt-2">
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-gray-600 text-white rounded-full mr-0.5">✓</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-gray-600 text-white rounded-full mr-0.5">✓</span>
          </div>
        </div>
      </div>

      {/* Distribution Checklist */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Distribution Checklist</h2>
        <p className="text-gray-600 mb-6">
          Use this checklist to share your smart link across all major channels:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Print QR codes", desc: "Add to receipts, menus, and shop windows", completed: false },
            { title: "Update social bios", desc: "Instagram, TikTok, Facebook - use smartlink.app/business/{slug}", completed: false },
            { title: "Add to WhatsApp Business", desc: "Share link in status updates or chat messages", completed: false },
            { title: "Embed on Yelp/Foursquare", desc: "Use widget code or direct link in partner pages", completed: false },
            { title: "Update Google Business Profile", desc: "Add smartlink as official website URL", completed: false },
            { title: "Share with employees", desc: "Include in employee cards and training materials", completed: false },
          ].map((item, idx) => (
            <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
              <div>
                <span className="font-medium text-gray-900">{item.title}</span>
                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Pro tip:</strong> Start with the low-hanging fruit - social bios and QR codes have the highest ROI. Update those first!
          </p>
        </div>
      </section>

      {/* Copy Templates */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Copy & Messaging Templates</h2>
        <p className="text-gray-600 mb-6">
          Quick copy templates you can use across different channels:
        </p>

        <div className="space-y-6">
          {/* QR Code Copy */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              QR Code Label / Receipt Stamp
            </h3>
            <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm break-all">
              📱 Scan to book your appointment at The Coffee Roasters{'\n'}
              [QR code image]{'\n'}
              Nearspoke · smartlink.app/business/the-coffee-roasters
            </div>
          </div>

          {/* Instagram Bio */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Instagram/TikTok/Facebook Bio
            </h3>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg font-mono text-xs leading-relaxed">
              <strong>The Coffee Roasters ☕</strong><br/>
              Specialty coffee & pastries in Seattle's Capitol Hill.<br/>
              Book appointments online instantly. 👇<br/><br/>
              🔗 smartlink.app/business/the-coffee-roasters<br/>
              ⭐ 4.9 · 127 reviews on Yelp
            </div>
          </div>

          {/* WhatsApp Greeting */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              WhatsApp Business Greeting Message
            </h3>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg font-mono text-xs leading-relaxed">
              Thanks for messaging The Coffee Roasters! ☕<br/><br/>
              How can we help you today?<br/>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>☕ Order coffee for pickup or delivery</li>
                <li>📅 Book an appointment online</li>
                <li>❓ Ask about our menu and hours</li>
              </ul><br/>
              <strong>Quick book here:</strong> smartlink.app/business/the-coffee-roasters
            </div>
          </div>

          {/* SMS Welcome Message */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
              SMS Welcome / Auto-reply
            </h3>
            <div className="text-sm text-gray-500 italic">
              Example: Reply STOP to opt out | Message frequencies may vary

            </div>

          </div>

          {/* Google Maps Profile Snippet */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Google Business Profile Website URL
            </h3>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg font-mono text-xs leading-relaxed">
              The Coffee Roasters<br/>
              Specialty coffee roaster serving Seattle since 2024<br/><br/>
              <strong>Website:</strong><br/>
              smartlink.app/business/the-coffee-roasters
            </div>
          </div>

          {/* Website Embed Widget */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Yelp/Foursquare Website URL
            </h3>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg font-mono text-xs leading-relaxed">
              📍 The Coffee Roasters<br/>
              2047 E Pike St, Seattle, WA 98122<br/>
              ☕ Open today: 6AM – 9PM<br/>
              ⭐ 4.8 (142 reviews)<br/><br/>
              <a href="https://smartlink.app/business/the-coffee-roasters" target="_blank" className="text-blue-600 underline">
                smartlink.app/business/the-coffee-roasters
              </a>
            </div>
          </div>

          {/* Facebook Page Bio */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Facebook Page Bio Link
            </h3>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg font-mono text-xs leading-relaxed">
              ☕ The Coffee Roasters — Specialty coffee & artisan pastries in Seattle's Capitol Hill.<br/><br/>
              Visit our smart link for appointments, menu, and location:<br/>
              <a href="https://smartlink.app/business/the-coffee-roasters" target="_blank" className="text-blue-600 underline">
                smartlink.app/business/the-coffee-roasters
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <footer className="mt-10 text-center text-sm text-gray-400 pt-6 border-t border-gray-200">
        <p className="mb-2">Powered by <a href="/" className="text-blue-600 hover:underline font-medium">Nearspoke</a></p>
        <p>MVP Phase 5 — Distribution affordances for local business smart links</p>
      </footer>
    </main>
  );
}
