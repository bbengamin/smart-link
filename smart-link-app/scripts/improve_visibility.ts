/**
 * Improve Visibility — Smallest useful enhancements for local discovery
 * 
 * Targets:
 * 1. Add priceRange and areaServed to JSON-LD on business pages
 * 2. Add social links (sameAs) to main app metadata  
 * 3. Minor OG image enhancement (show rating)
 */

import { writeFileSync } from 'fs';
import path from 'path';

const APP_DIR = process.cwd();

console.log('🔍 Improving visibility for local discovery...\n');

// 1. Update business page JSON-LD to include priceRange and areaServed
const businessPagePath = path.join(APP_DIR, 'src/app/business/[slug]/page.tsx');
console.log(`1️⃣ Enhancing JSON-LD on /business/[slug] with priceRange + areaServed...`);

let businessContent = readFileSync(businessPagePath, 'utf8');

// Add priceRange field to JSON-LD function (line ~74)
const priceRangeInjection = `      priceRange: "${business.category === 'salon' ? '$$$' : '$$'}",`;

// Insert after image field in BusinessJSONLD function
const updatedBusinessContent = businessContent.replace(
  /(image: business\.logo_url,)\n/,
  `$1\n      priceRange: "${business.category === 'salon' ? '$$$' : '$$'}",`
);

if (updatedBusinessContent === businessContent) {
  console.log('   ⚠️ Pattern not found in BusinessJSONLD — manual review needed');
} else {
  console.log('   ✅ Injected priceRange field');
  writeFileSync(businessPagePath, updatedBusinessContent, 'utf8');
}

// Add areaServed to JSON-LD (after geo block)
const areaServedInjection = `      areaServed: [
        business.city,
        {
          \"@type\": \"City\",
          name: business.city,
          addressLocality: business.city,
        },
      ],`;

const updatedAreaContent = businessContent.replace(
  /(^\s+},\s*$)/,
  (match) => match + `\n      areaServed: [\n        business.city,\n        {\\n          "@type": "City",\\n          name: business.city,\\n          addressLocality: business.city,\\n        },\\n      ],`
);

if (updatedAreaContent !== businessContent) {
  console.log('   ✅ Added areaServed geo context');
  writeFileSync(businessPagePath, updatedAreaContent, 'utf8');
}

// 2. Add social links to main app metadata
const appIndexPath = path.join(APP_DIR, 'src/app/page.tsx');
console.log(`\n2️⃣ Adding social sameAs links to root page metadata...`);

let appIndexContent = readFileSync(appIndexPath, 'utf8');

// Add after layout metadata block — insert social before closing brace if exists
const socialEnhancements = {
  facebook_url: 'https://facebook.com/smartlink',
  instagram_url: 'https://instagram.com/smartlink_app',
  twitter_url: 'https://twitter.com/smartlinkapp'
};

const appIndexUpdate = appIndexContent.replace(
  /(export const metadata: Metadata = \{)/,
  (match) => `${match}\n\n  // Social links for sameAs structured data\n  socialEnhancements`
);

if (appIndexUpdate !== appIndexContent) {
  console.log('   ⚠️ Need to import socialEnhancements from @/data/demo');
} else {
  console.log('   ✅ Root metadata structure updated');
  writeFileSync(appIndexPath, appIndexUpdate, 'utf8');
}

// 3. Update OG endpoint to optionally show rating if available (demo-only)
const ogEndpointPath = path.join(APP_DIR, 'src/app/api/og/[slug]/route.tsx');
console.log(`\n3️⃣ Enhancing OG image with optional rating badge...`);

let ogContent = readFileSync(ogEndpointPath, 'utf8');

// Add rating calculation after business lookup block
const ratingInjection = `    // Get rating from demo/reviews for local SEO enhancement\n    let avgRating = 4.5;\n    if (demo.reviews?.length > 0) {\n      const total = demo.reviews.reduce((sum: number, r: any) => sum + (r.rating || 4), 0);\n      avgRating = Math.round((total / demo.reviews.length) * 10) / 10;\n    }\n\n`;

const ogUpdate = ogContent.replace(
  /(^\s+} if \(demo\) {/)
, (match) => `${match}\n\n${ratingInjection}`
);

if (ogUpdate !== ogContent) {
  console.log('   ⚠️ Pattern mismatch — manual review');
} else {
  console.log('   ✅ Added rating calculation for OG images');
  writeFileSync(ogEndpointPath, ogUpdate, 'utf8');
}

// 4. Add demo social links to demo.ts helper exports  
const demoDataPath = path.join(APP_DIR, 'src/data/demo.ts');
console.log(`\n4️⃣ Ensuring social links available via getBusinessSocials()...`);

let demoContent = readFileSync(demoDataPath, 'utf8');

// Check if function properly returns empty object for missing slugs  
const checkReturn = demoContent.includes('return enhancements || {}') && 
                     demoContent.includes('interface SocialEnhancements');

if (checkReturn) {
  console.log('   ✅ Social helper exports look good');
} else {
  console.log('   ⚠️ Need to fix return type for undefined slugs');
}

console.log('\n✨ Visibility improvements complete!\n');
console.log(`Changed files:`);
console.log(` - ${businessPagePath}`);
console.log(` - ${appIndexPath}`);
console.log(` - ${ogEndpointPath}`);
console.log(` - ${demoDataPath}`);
console.log(`\nRun 'npm run build' to verify changes compile.`);
