#!/usr/bin/env node
// Captures screenshots, a structural outline and sampled styles of the UI reference site.
// Output goes to docs/reference/ (gitignored). Inspiration only: nothing here is shipped.
// Run: node scripts/capture-reference.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs/reference');
const BASE = 'https://destinationweddingbharat.com/';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

mkdirSync(outDir, { recursive: true });

/** Collects nav items, headings, buttons, form labels and footer headings from the page. */
function collectOutline() {
  const text = (el) => el.textContent.replace(/\s+/g, ' ').trim();
  const uniq = (arr) => [...new Set(arr.filter(Boolean))];
  const navLinks = [...document.querySelectorAll('header nav a, nav a')].map((a) => ({
    text: text(a),
    href: a.href,
  }));
  return {
    title: document.title,
    nav: navLinks.filter((l, i, a) => l.text && a.findIndex((x) => x.text === l.text) === i),
    headings: [...document.querySelectorAll('h1, h2, h3')].map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: text(h).slice(0, 140),
    })),
    sectionCount: document.querySelectorAll('section').length,
    buttons: uniq(
      [...document.querySelectorAll('button, a.btn, a[class*="button"], a[class*="btn"]')].map(
        (b) => text(b).slice(0, 60),
      ),
    ),
    formLabels: uniq(
      [...document.querySelectorAll('label, input[placeholder], textarea[placeholder]')].map(
        (l) => text(l) || l.getAttribute('placeholder'),
      ),
    ),
    footerHeadings: uniq(
      [...document.querySelectorAll('footer h2, footer h3, footer h4, footer h5, footer strong')].map(
        text,
      ),
    ),
  };
}

/** Samples computed styles for key elements. */
function collectStyles() {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      selector: sel,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      background: s.backgroundColor,
      borderRadius: s.borderRadius,
    };
  };
  return [
    'body',
    'h1',
    'h2',
    'h3',
    'nav a',
    'header',
    'a[class*="btn"], button',
    'footer',
  ].map(pick);
}

const browser = await chromium.launch();
const result = { capturedAt: new Date().toISOString(), pages: [] };
try {
  const ctx = await browser.newContext({ viewport: VIEWPORTS[0] });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60_000 });
  const home = await page.evaluate(collectOutline);
  const inner = home.nav
    .map((n) => n.href)
    .filter((h) => h.startsWith(BASE) && h !== BASE && !h.includes('#'))
    .filter((h) => /contact|destination|venue|package/i.test(h))
    .slice(0, 2);
  const targets = [BASE, ...inner];

  for (const [i, url] of targets.entries()) {
    const slug = i === 0 ? 'home' : `inner-${i}`;
    const entry = { url, slug };
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      // trigger lazy-loaded images
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.screenshot({ path: path.join(outDir, `${slug}-${vp.name}.png`), fullPage: true });
      if (vp.name === 'desktop') {
        entry.outline = await page.evaluate(collectOutline);
        entry.styles = await page.evaluate(collectStyles);
      }
    }
    result.pages.push(entry);
    console.log(`captured ${url}`);
  }
} catch (err) {
  result.error = String(err.message).split('\n')[0];
  console.error('capture failed:', result.error);
} finally {
  await browser.close();
}

writeFileSync(
  path.join(outDir, 'outline.json'),
  JSON.stringify(
    result.pages.map(({ url, outline }) => ({ url, ...outline })),
    null,
    2,
  ),
);
writeFileSync(
  path.join(outDir, 'styles.json'),
  JSON.stringify(
    result.pages.map(({ url, styles }) => ({ url, styles })),
    null,
    2,
  ),
);
if (result.error) process.exit(1);
