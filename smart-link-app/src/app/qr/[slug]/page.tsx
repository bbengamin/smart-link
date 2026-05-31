import { getDemoBusiness } from "@/data/demo";

export default async function QRPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugValue = String(slug);
  const encodedSlug = encodeURIComponent(slugValue);

  const demoBusiness = getDemoBusiness(slugValue);
  const businessName = demoBusiness?.name || "";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";
  const businessUrl = `${baseUrl}/business/${encodedSlug}`;
  const qrImageUrl = demoBusiness ? `/qr-static/${encodedSlug}.svg` : `/api/qr/${encodedSlug}`;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Demo badge */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Smart Link QR Code
          </span>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div 
            className="p-2 bg-white rounded-lg border-4 border-gray-900"
            style={{ width: 300, height: 300 }}
          >
            {/* Demo businesses use pre-generated static SVGs; other slugs fall back to the QR API. */}
            <img 
              src={qrImageUrl}
              alt={`QR code for ${businessName || slugValue}`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Business preview */}
        {businessName && (
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Scan to book at</p>
            <h2 className="text-xl font-bold text-gray-900">{businessName}</h2>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-medium mb-1">How to use this QR code:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Print or display this QR code</li>
            <li>Customers scan with their phone camera</li>
            <li>They land on your business profile</li>
          </ol>
        </div>

        {/* Mobile device note */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          <p><strong>Note:</strong> View this on a mobile device for the full experience. The QR code above is scannable and will redirect to your business profile.</p>
        </div>

        {/* URL preview */}
        <div className="mt-4 p-3 bg-gray-900 text-white rounded-lg break-all text-xs font-mono">
          {businessUrl}
        </div>
      </div>
    </div>
  );
}
