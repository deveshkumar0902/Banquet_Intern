#!/usr/bin/env node
// Runs after `vite build`:
//  - dist/sitemap.xml from routes.js + venue slugs
//  - Sitemap line appended to dist/robots.txt
//  - dist/404.html = index.html, so GitHub Pages serves the SPA for deep links
import { appendFileSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from '../src/app/routes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const venues = JSON.parse(readFileSync(path.join(root, 'src/content/venues.json'), 'utf8'));

const siteUrl = (process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');
const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');
const url = (p) => `${siteUrl}${base}${p === '/' ? '/' : p}`;

const paths = [
  ...routes.filter((r) => r.sitemap).map((r) => r.path),
  ...venues.map((v) => `/venues/${v.slug}`),
];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${url(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(path.join(dist, 'sitemap.xml'), xml);
appendFileSync(path.join(dist, 'robots.txt'), `Sitemap: ${url('/sitemap.xml')}\n`);
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log(`postbuild: sitemap.xml (${paths.length} urls), robots.txt, 404.html`);
