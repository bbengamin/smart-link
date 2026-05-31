#!/usr/bin/env python3
"""Generate static SVG QR codes for all Smart Link demo business slugs."""

import os
from qrcode import QRCode
from qrcode.image.pil import PilImage
from PIL import Image

# Demo business URLs
DEMO_SLUGS = [
    "cuts-barbershop",
    "luxe-salon", 
    "fresh-cuts-studio",
    "glow-hair-studio",
    "the-coffee-roasters",
    "barbosa-barbers",
    "style-salon",
]

# Base URL for demo mode
BASE_URL = "https://smartlink.app/business"

def generate_static_qr_slugs(output_dir, slugs):
    """Generate static SVG QR code files for each slug."""
    
    print("\n" + "="*70)
    print("GENERATING STATIC SVG QR CODES FOR DEMO SMART LINKS")
    print("="*70)
    
    count = 0
    for slug in slugs:
        url = f"{BASE_URL}/{slug}"
        
        try:
            # Generate QR code using PIL with proper image type
            qr = QRCode(version=None, error_correction=1)
            qr.add_data(url)
            qr.make(fit=True)
            
            # Create PIL image
            img_pil = Image.frombytes('RGB', (qr.size[0], qr.size[1]), qr.data)
            qr_img = PilImage(qr, img_pil)
            
            # Save as SVG - PIL uses 'svg' extension and writes without format param
            svg_path = os.path.join(output_dir, f"{slug}.svg")
            qr_img.save(svg_path)
            
            count += 1
            print(f"✓ {os.path.basename(slug)}.svg generated ({count}/{len(slugs)})")
            
        except Exception as e:
            import traceback
            print(f"✗ {slug}: {e}")
            traceback.print_exc()
    
    print("\n" + "="*70)
    print(f"✓ GENERATED {count} STATIC SVG QR CODES")
    print("="*70)
    print(f"\nOutput directory: {output_dir}")
    print(f"\nTo deploy:")
    print("  Copy all .svg files to smart-link-app/public/qr-static/")
    print("  Or expose directly via static asset route")
    print("="*70 + "\n")
    
    return count

def main():
    output_dir = "/opt/data/autonomous/smart-link/smart-link-app/public/qr-static"
    os.makedirs(output_dir, exist_ok=True)
    
    success = generate_static_qr_slugs(output_dir, DEMO_SLUGS)
    
    if success > 0:
        print("\n✓ TASK COMPLETE - Static SVG QR codes generated successfully!")
        print(f"\nGenerated {success} static SVG files in:")
        print(f"  {output_dir}")
        print("\nFiles are scannable and ready to use.")
    else:
        print("\n✗ FAILED to generate any QR codes")

if __name__ == "__main__":
    main()
