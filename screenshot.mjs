import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = 'screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// Auto-increment: find the next available N
const existing = fs.readdirSync(dir)
  .map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? parseInt(m[1]) : 0; });
const n = existing.length ? Math.max(...existing) + 1 : 1;

const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const outPath = path.join(dir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:\\Users\\User\\.cache\\puppeteer\\chrome\\win64-149.0.7827.22\\chrome-win64\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

// Scroll through the page to trigger IntersectionObserver-based reveal animations,
// then wait for CSS transitions (0.65s) to complete before capturing.
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < pageHeight; y += 500) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await new Promise(r => setTimeout(r, 160));
}
// Wait for all transitions to finish
await new Promise(r => setTimeout(r, 800));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
