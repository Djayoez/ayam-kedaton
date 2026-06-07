import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
};

// Proxy /sanity-proxy?query=... → Sanity CDN (bypasses browser CORS)
function proxySanity(req, res) {
  const qs = req.url.slice('/sanity-proxy'.length); // preserve ?query=...
  const target = `https://0b8sjspb.apicdn.sanity.io/v2026-01-01/data/query/production${qs}`;
  https.get(target, (upstream) => {
    res.writeHead(upstream.statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    upstream.pipe(res);
  }).on('error', () => { res.writeHead(502); res.end('Sanity proxy error'); });
}

http.createServer((req, res) => {
  if (req.url.startsWith('/sanity-proxy')) { proxySanity(req, res); return; }

  const urlPath = req.url.split('?')[0]; // strip query string
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found'); return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
