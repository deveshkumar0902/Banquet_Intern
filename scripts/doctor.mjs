#!/usr/bin/env node
// Preflight / dependency checker. Run: npm run doctor
// Exits 1 if any required check FAILs. WARNs are informational.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const results = [];
const add = (status, name, detail = '') => results.push({ status, name, detail });
const sh = (cmd) =>
  execSync(cmd, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
const major = (v) => Number(String(v).replace(/^v/, '').split('.')[0]);

// ---------- 1. Toolchain ----------
const nodeMajor = major(process.version);
add(nodeMajor >= 22 ? 'PASS' : 'FAIL', 'Node.js >= 22', process.version);
try {
  const v = sh('npm -v');
  add(major(v) >= 10 ? 'PASS' : 'FAIL', 'npm >= 10', v);
} catch {
  add('FAIL', 'npm', 'not found');
}
try {
  add('PASS', 'git', sh('git --version'));
} catch {
  add('FAIL', 'git', 'not found');
}

// ---------- 2. Required packages per workspace ----------
const REQUIRED = {
  '.': ['eslint', '@eslint/js', 'globals', 'eslint-plugin-react', 'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh', 'eslint-config-prettier', 'prettier', 'concurrently',
    '@playwright/test', '@axe-core/playwright'],
  'packages/shared': ['zod'],
  'apps/web': ['react', 'react-dom', 'react-router', 'react-hook-form', '@hookform/resolvers',
    'zod', 'embla-carousel-react', 'yet-another-react-lightbox', 'lucide-react', 'sonner',
    '@fontsource-variable/inter', '@fontsource-variable/playfair-display', '@banquet/shared',
    'vite', '@vitejs/plugin-react', 'tailwindcss', '@tailwindcss/vite', 'vite-imagetools',
    'vitest', 'jsdom', '@testing-library/react', '@testing-library/jest-dom',
    '@testing-library/user-event'],
  'apps/api': ['express', 'cors', 'helmet', 'express-rate-limit', 'zod', 'better-sqlite3',
    'nodemailer', 'exceljs', 'pino', 'pino-http', 'dotenv', '@banquet/shared', 'vitest',
    'supertest'],
};

// Walk up from the workspace dir to the repo root looking in node_modules (handles hoisting).
function isInstalled(wsDir, pkg) {
  let dir = wsDir;
  while (true) {
    if (existsSync(path.join(dir, 'node_modules', pkg, 'package.json'))) return true;
    if (dir === root) return false;
    dir = path.dirname(dir);
  }
}

for (const [ws, pkgs] of Object.entries(REQUIRED)) {
  const wsDir = path.join(root, ws);
  if (!existsSync(path.join(wsDir, 'package.json'))) {
    add('FAIL', `workspace ${ws}`, 'package.json missing');
    continue;
  }
  const missing = pkgs.filter((p) => !isInstalled(wsDir, p));
  add(missing.length ? 'FAIL' : 'PASS', `deps: ${ws}`,
    missing.length ? `missing → ${missing.join(', ')}` : `${pkgs.length} packages present`);
}

// npm's own consistency check (missing/invalid peers). Informational.
try {
  sh('npm ls --workspaces --include-workspace-root --depth=0');
  add('PASS', 'npm ls (tree consistent)');
} catch (e) {
  const msg = (e.stderr?.toString() || e.stdout?.toString() || '').split('\n').find(Boolean) || '';
  add('WARN', 'npm ls reported problems', msg.slice(0, 120));
}

// ---------- 3. Native / binary dependencies ----------
try {
  const req = createRequire(path.join(root, 'apps/api/package.json'));
  const Database = req('better-sqlite3');
  new Database(':memory:').close();
  add('PASS', 'better-sqlite3 native binding');
} catch (e) {
  add('FAIL', 'better-sqlite3 native binding',
    `${String(e.message).split('\n')[0]} → try: npm rebuild better-sqlite3 -w apps/api`);
}
try {
  const req = createRequire(path.join(root, 'package.json'));
  const { chromium } = req('@playwright/test');
  const exe = chromium.executablePath();
  add(existsSync(exe) ? 'PASS' : 'FAIL', 'Playwright Chromium',
    existsSync(exe) ? '' : 'run: npx playwright install chromium');
} catch (e) {
  add('FAIL', 'Playwright Chromium', String(e.message).split('\n')[0]);
}

// ---------- 4. Environment files ----------
add(existsSync(path.join(root, 'apps/api/.env')) ? 'PASS' : 'WARN', 'apps/api/.env',
  existsSync(path.join(root, 'apps/api/.env')) ? '' : 'not found: dev uses defaults + console email');
add(existsSync(path.join(root, 'apps/api/.env.example')) ? 'PASS' : 'WARN', 'apps/api/.env.example');
add(existsSync(path.join(root, 'apps/web/.env.example')) ? 'PASS' : 'WARN', 'apps/web/.env.example');

// ---------- 5. Repo hygiene ----------
try {
  const bad = sh('git ls-files')
    .split('\n')
    .filter((f) => /(^|\/)node_modules\/|(^|\/)\.env$|\.(db|sqlite|xlsx)$/.test(f));
  add(bad.length ? 'FAIL' : 'PASS', 'no tracked node_modules/.env/db/xlsx',
    bad.length ? `${bad.length} file(s), e.g. ${bad[0]}` : '');
} catch {
  add('WARN', 'git ls-files', 'not a git repo?');
}

// ---------- 6. Ports ----------
const portFree = (port) =>
  new Promise((resolve) => {
    const s = net.createServer();
    s.once('error', () => resolve(false));
    s.once('listening', () => s.close(() => resolve(true)));
    s.listen(port, '127.0.0.1');
  });
for (const p of [5173, 4000]) {
  add((await portFree(p)) ? 'PASS' : 'WARN', `port ${p} free`, '');
}

// ---------- Report ----------
console.log('\nBanquet site: doctor\n');
for (const r of results) console.log(`${r.status.padEnd(5)} ${r.name.padEnd(42)} ${r.detail}`);
const failed = results.filter((r) => r.status === 'FAIL').length;
console.log(failed ? `\n❌ ${failed} required check(s) failed\n` : '\n✅ all required checks passed\n');
process.exit(failed ? 1 : 0);
