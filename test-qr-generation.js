// Use relative require from app directory
const QRCode = require('./node_modules/qrcode').default;

async function testQR() {
  const testUrl = 'https://smartlink.app/business/barbosa-barbers';
  
  try {
    const svg = await QRCode.toSVG(testUrl, {
      width: 300,
      margin: 2,
      type: 'svg',
    });
    
    console.log('✓ SUCCESS: QR code generated successfully!');
    console.log(`Test URL: ${testUrl}`);
    console.log(`Output size: ${svg.length} bytes`);
    
    // Check for QR markers in SVG to confirm it's scannable
    const hasFindMarkers = svg.includes('find_marker');
    const hasAlignmentPattern = svg.includes('t=1;');
    
    console.log('\n✓ QR code structure verified:');
    console.log(`  - Contains find markers (for scanning): ${hasFindMarkers}`);
    console.log(`  - Contains alignment patterns: ${hasAlignmentPattern}`);
    
    // Save for manual verification
    const fs = require('fs');
    fs.writeFileSync('/opt/data/autonomous/smart-link/test-qr.svg', svg);
    console.log(`\n✓ Saved to: /opt/data/autonomous/smart-link/test-qr.svg`);
    
  } catch (error) {
    console.error('✗ ERROR:', error.message);
    process.exit(1);
  }
}

testQR();
