#!/usr/bin/env python3
"""Verify that generated QR codes are scannable."""

from PIL import Image
import os

def verify_qr_scannable(png_path):
    """Check if QR code has valid structure."""
    img = Image.open(png_path)
    
    print(f"Image dimensions: {img.size[0]}x{img.size[1]}")
    print(f"Format: {img.format}, Mode: {img.mode}")
    
    # Check black/white ratio (QR codes should be roughly balanced)
    img_gray = img.convert("L")
    img_array = img_gray.getdata()
    total = len(img_array)
    dark = sum(0 for p in img_array if p < 60)
    ratio = dark / total * 100
    
    print(f"Dark pixel ratio: {ratio:.1f}%")
    
    # QR finder patterns should be large black squares in corners
    w, h = img.size
    finder_size = min(w, h) // 7
    
    tl = img.crop((0, 0, finder_size, finder_size))
    tr = img.crop((w-finder_size, 0, w, finder_size))
    bl = img.crop((0, h-finder_size, finder_size, h))
    
    corners_black_ratio = [
        sum(0 for p in tl.getdata()) / (finder_size**2) * 100,
        sum(0 for p in tr.getdata()) / (finder_size**2) * 100,
        sum(0 for p in bl.getdata()) / (finder_size**2) * 100,
    ]
    
    print(f"Corner dark ratios: {corners_black_ratio}")
    
    # Valid QR has finder patterns with ~40-60% dark pixels
    if all(r > 30 and r < 70 for r in corners_black_ratio):
        print("✓ Finder patterns detected - looks like valid QR code!")
        return True
    else:
        print("? Finder patterns unclear - may not be scannable")
        return False

def main():
    png_path = "/opt/data/autonomous/smart-link/test-qr.png"
    
    print(f"\n=== Verifying QR Code: {png_path} ===\n")
    result = verify_qr_scannable(png_path)
    
    if result:
        print("\n✓ QR code generation successful - output is scannable!")
    else:
        print("\n? QR code may need manual verification with a scanner")

if __name__ == "__main__":
    main()
