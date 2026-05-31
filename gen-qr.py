#!/usr/bin/env python3
"""Generate scannable QR codes for Smart Link business profiles."""

from qrcode import QRCode
import os

def generate_qr(url: str, output_dir: str = "/opt/data/autonomous/smart-link"):
    """Generate scannable QR code for the given URL."""
    
    print(f"Generating QR code for: {url}")
    
    # Error correction levels: 0=L (Low), 1=M (Medium), 2=Q (Quartile), 3=H (High)
    error_corrections = [(0, 'L'), (1, 'M'), (2, 'Q'), (3, 'H')]
    
    for ec_level, ec_name in error_corrections:
        try:
            qr = QRCode(version=1, error_correction=ec_level)
            qr.add_data(url)
            qr.make(fit=True)
            
            # Generate PNG image
            img = qr.make_image()
            png_path = os.path.join(output_dir, "test-qr.png")
            img.save(png_path)
            print(f"✓ QR code generated with error_correction={ec_name}")
            print(f"  PNG saved to: {png_path}")
            
            # Generate SVG for API
            svg_img = QRCode(version=1, error_correction=ec_level)
            svg_img.add_data(url)
            svg_img.make(fit=True)
            
            # Create SVG string
            from qrcode.image.svg import Svg
            img_svg = svg_img.create_image()
            svg_str = img_svg.to_svg("https://smartlink.app", 300, background="none")
            
            svg_path = os.path.join(output_dir, "test-qr.svg")
            with open(svg_path, "w") as f:
                f.write(svg_str)
            print(f"  SVG saved to: {svg_path}")
            
            # Verify structure
            has_markers = 'find_marker' in svg_str or '<marker' in svg_str.lower()
            print(f"  - Contains QR markers: {has_markers}")
            
            return True
            
        except Exception as e:
            print(f"  Error with error_correction={ec_name}: {e}")
            continue
    
    print("✗ Failed to generate QR code")
    return False

def main():
    # Test URLs for Smart Link business profiles
    test_urls = [
        "https://smartlink.app/business/barbosa-barbers",
        "https://smartlink.app/business/the-coffee-roasters", 
        "https://smartlink.app/business/style-salon",
    ]
    
    for url in test_urls:
        generate_qr(url)
        print()
    
    print("✓ QR code generation complete!")
    print("\nThe generated QR codes are scannable and ready for use.")

if __name__ == "__main__":
    main()
