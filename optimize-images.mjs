import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const jobs = [
  // Hero image — wide, high priority
  { src: 'assets/menu-2.jpg', width: 1440, quality: 82 },
  // Menu card images — displayed max ~600px wide (2× retina)
  { src: 'assets/menu-1.jpg', width: 800, quality: 82 },
  { src: 'assets/menu-3.jpg', width: 800, quality: 82 },
  { src: 'assets/menu-4.jpg', width: 800, quality: 82 },
  { src: 'assets/menu-5.jpg', width: 800, quality: 82 },
  { src: 'assets/menu-box.jpg',   width: 800, quality: 82 },
  { src: 'assets/menu-paket.jpg', width: 800, quality: 82 },
];

for (const { src, width, quality } of jobs) {
  const before = fs.statSync(src).size;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(src + '.tmp');
  fs.renameSync(src + '.tmp', src);
  const after = fs.statSync(src).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${path.basename(src)}: ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`);
}

// Compress logo PNG
const logoSrc = 'assets/logo.png';
const logoBefore = fs.statSync(logoSrc).size;
await sharp(logoSrc)
  .resize({ width: 160, withoutEnlargement: true })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(logoSrc + '.tmp');
fs.renameSync(logoSrc + '.tmp', logoSrc);
const logoAfter = fs.statSync(logoSrc).size;
console.log(`logo.png: ${(logoBefore/1024).toFixed(0)}KB → ${(logoAfter/1024).toFixed(0)}KB  (-${Math.round((1-logoAfter/logoBefore)*100)}%)`);

console.log('\nDone!');
