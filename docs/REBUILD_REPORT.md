# Rebuild v2: report

Branch `rebuild/v2`, built from `docs/REBUILD_PLAN.md` (phases 0–12). Written 2026‑11‑01.

## Summary

The legacy `frontend/` + `backend/` apps were replaced with an npm‑workspaces monorepo:

- **`apps/web`**: a new React 19 / Vite / React Router / Tailwind v4 site with 11 routes, a terracotta‑and‑cream
  design taken from the reference site's layout and palette (no copied text, images or branding; see `docs/DESIGN.md`),
  content in `src/content/` validated by Zod, responsive images, per‑page SEO, a mobile drawer, and forms that use the
  shared schema.
- **`apps/api`**: Express 5 with SQLite (WAL), dependency‑injected `createApp()`, email sent after responding with the
  outcome stored per row, HTML‑escaped templates, rate limits, honeypot, admin JSON/Excel export, and a legacy import script.
  It boots with zero env vars in development.
- **`packages/shared`**: the Zod schemas and constants both sides use.
- Playwright e2e + axe on desktop and mobile, a CI workflow, a Pages deploy workflow, and full docs.

Brand is **Dev Marriage Hall** everywhere ("Royal Banquet Hall" is gone).

## Audit items (plan §2)

| #   | Problem                                                         | Status                                                                                    | Covered by                                                                                                                                                                                        |
| --- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Form sent `eventName`, no `eventDate`, so every enquiry got 400 | ✅ Fixed: one shared strict schema for form and API                                       | `packages/shared/tests` "rejects the legacy eventName key…", `apps/api/tests/api.test.js` "rejects the legacy payload…", `apps/web/tests/forms.test.jsx` "submits exactly the shared-schema keys" |
| 2   | API URL hard‑coded to `localhost:5000`                          | ✅ Fixed: `VITE_API_URL` + same‑origin proxy, single `postJson`                           | `apps/web/tests/api.test.js` "only src/lib/api.js calls fetch()", "no source file hard-codes a localhost API URL"                                                                                 |
| 3   | `/about`, `/services` fetched without `/api`                    | ✅ Fixed: content is bundled; the only calls are `/api/enquiries`, `/api/contact`         | `apps/web/tests/api.test.js` "every postJson path starts with /api/"                                                                                                                              |
| 4   | `backend/node_modules` committed (broken)                       | ✅ Untracked and deleted; `.gitignore` added                                              | doctor "no tracked node_modules/.env/db/xlsx"                                                                                                                                                     |
| 5   | Customer spreadsheets committed                                 | ✅ Untracked (backup kept locally in `../banquet-legacy-backup/`)                         | doctor hygiene check. **Still in git history**, see Security                                                                                                                                      |
| 6   | `{key}` vs `{{key}}` template bug                               | ✅ Fixed: `renderTemplate` replaces `{{key}}` only and throws on missing values           | `apps/api/tests/api.test.js` "renders {{placeholders}}…", `templates.test.js`                                                                                                                     |
| 7   | Unescaped user input in email HTML                              | ✅ Fixed: every value goes through `escapeHtml`                                           | `api.test.js` "escapes user input in the email HTML"                                                                                                                                              |
| 8   | Mail failure after save returned 500 (duplicates on retry)      | ✅ Fixed: 201 first, email in background, `email_status` recorded                         | `api.test.js` "still responds 201 when the mailer fails…"                                                                                                                                         |
| 9   | Gallery URLs with no static mount                               | ✅ Fixed: images bundled via vite‑imagetools; gallery route removed                       | `content.test.js` "every referenced image exists"                                                                                                                                                 |
| 10  | Crash on boot without SMTP env                                  | ✅ Fixed: dev defaults + JSON transport                                                   | `config.test.js` "boots in development with an empty environment"                                                                                                                                 |
| 11  | Excel as database (`xlsx@0.18.5`)                               | ✅ Replaced with SQLite; Excel via `exceljs` export                                       | `api.test.js` admin export suite                                                                                                                                                                  |
| 12  | `#anchor` nav broken off the home page                          | ✅ Fixed: real routes from `routes.js`, `ScrollManager` for hash targets                  | `routing.test.jsx` "header links are real routes…", `e2e/navigation.spec.js`                                                                                                                      |
| 13  | Mock arrays + backend JSON (two sources of truth)               | ✅ One source: `apps/web/src/content/`                                                    | `content.test.js` schemas                                                                                                                                                                         |
| 14  | Venue image paths didn't exist                                  | ✅ Real imports; missing photos show a labelled placeholder                               | `content.test.js`, `ui.test.jsx` ResponsiveImage                                                                                                                                                  |
| 15  | Inconsistent brand                                              | ✅ Dev Marriage Hall everywhere                                                           | grep check below                                                                                                                                                                                  |
| 16  | No web `test` script, brittle snapshots                         | ✅ `vitest run` wired; behaviour tests, no snapshots                                      | `npm test`                                                                                                                                                                                        |
| 17  | Deploy without lint/tests; no backend CI                        | ✅ `ci.yml` (doctor, lint, format, unit, build, e2e); Pages deploy only after CI passes   | `.github/workflows/`                                                                                                                                                                              |
| 18  | ₹15,000 for 150 guests; invented testimonials/stats             | ✅ Tiered prices not shown; testimonials/stats `verified:false` and hidden in production  | `content.test.js` "unconfirmed tiered prices…", `visibleItems` tests                                                                                                                              |
| 19  | Dead/legacy files                                               | ✅ Removed with the legacy apps                                                           | —                                                                                                                                                                                                 |
| 20  | Fixed 900 px hero, no mobile nav                                | ✅ `min-h-[min(100svh,56rem)]` hero; accessible drawer (focus trap, Esc, scroll lock)     | `routing.test.jsx` mobile menu, `e2e/navigation.spec.js` drawer                                                                                                                                   |
| 21  | Port 5000 (AirPlay clash)                                       | ✅ API on 4000                                                                            | config test                                                                                                                                                                                       |
| 22  | No SEO                                                          | ✅ Per‑page title/description/canonical/OG, EventVenue + FAQPage JSON‑LD, sitemap, robots | e2e smoke (`toHaveTitle`), manual head check                                                                                                                                                      |

## Test results (final run after `rm -rf node_modules && npm ci`)

| Suite                                            | Result                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| `npm run doctor`                                 | ✅ all required checks passed (1 WARN: no `apps/api/.env`, expected) |
| `packages/shared`                                | 29 passed                                                            |
| `apps/api`                                       | 38 passed                                                            |
| `apps/web`                                       | 66 passed                                                            |
| `npm run check` (lint + Prettier + unit + build) | ✅ exit 0                                                            |
| `npm run test:e2e` (Desktop Chrome + Pixel 7)    | 61 passed, 1 skipped (the mobile‑only drawer test on desktop)        |
| axe (every route + 404, both projects)           | 0 serious / critical violations                                      |
| `git status`                                     | clean                                                                |

Grep checks (all empty): tracked `node_modules/.env/.db/.xlsx`; `localhost:5000`; `fetch(` outside `src/lib/api.js`;
"royal banquet".

## Bundle sizes (production build)

| Asset                                                                 | Size                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------ |
| Initial JS (entry 126.1 kB + shared chunk 21.8 kB + two small chunks) | ≈ 150 kB gzip (target ≤ 200 kB) ✅                           |
| CSS                                                                   | 9.6 kB gzip                                                  |
| Inner pages                                                           | 0.5–2 kB gzip each (lazy)                                    |
| Hero image, 1600 px WebP                                              | 240 kB (target ≤ 250 kB) ✅; 960 px ≈ 110 kB, 480 px ≈ 40 kB |
| Fonts                                                                 | self‑hosted, `font-display: swap`, subset per unicode range  |

## Deviations and notes

- **Node:** the system Node was 20.20. Node 24.22.2 (LTS) was installed with `fnm`; `.nvmrc` is `24`.
  Run `fnm use` (or `nvm use`) before working in the repo.
- **Newer majors than the plan names:** React Router **8.5** (plan said 7; the declarative API is unchanged), Vite 8,
  Vitest 5, Zod 4, Express 5.3. All latest stable.
- **ESLint pinned to 9:** `eslint-plugin-react` doesn't support ESLint 10 yet, which caused a peer conflict. Pinned
  `eslint@9` and `@eslint/js@9` rather than using `--force`/`--legacy-peer-deps`.
- **npm audit:** 9 moderate advisories. 8 are `minimatch` inside the ESLint 9 toolchain (dev‑only, never shipped).
  1 is `uuid` inside `exceljs` (affects only `v3/v5/v6` called with a `buf` argument, which exceljs doesn't use; the
  only "fix" is a breaking downgrade to exceljs 3). Re‑check when ESLint 10 support lands.
- **`better-sqlite3` install script:** npm 11 asks for install scripts to be approved. It was approved
  (`allowScripts` in the root `package.json`). It's pinned to the exact version, so re‑approve after upgrading
  (`npm install-scripts approve better-sqlite3`).
- **Fonts:** the reference uses Merriweather + Poppins (both SIL OFL). Per the plan these replaced
  Playfair Display + Inter, and the doctor list was updated.
- **Venue capacities:** only the legacy numbers are used (Ballroom 500, Lawn 800, Elegance 150), each placed as seated
  or floating with a `TODO(owner)`. Nothing was guessed.
- **Legacy import:** `import:legacy` was run against the backed‑up spreadsheets: **0 rows imported**
  (`enquiries.xlsx` is empty, `contacts.xlsx` has only a header row). No production data to migrate.
- **Uncommitted work on `main`:** an uncommitted edit to the old `backend/routes/enquiry.js` was found before
  branching. It was **stashed**, not discarded: `git stash list` → "pre-rebuild: legacy enquiry.js edits".
- **`REBUILD_PLAN.md`** was reformatted by Prettier (table alignment and whitespace only, no wording changes) and
  moved to `docs/`.
- **Contrast over photos:** axe can't measure text over images, so hero and page‑hero text sits on dark gradients
  (≥ 95% clay‑900 behind the hero copy). The tokens were chosen for ≥ 4.5:1 on cream (`docs/DESIGN.md`).
- **GitHub Pages limits:** a project site's `robots.txt` lives at `/Banquet_Intern/robots.txt`, which crawlers don't
  read (they only read the domain root); submit `sitemap.xml` in Search Console instead, or use a custom domain. Deep
  links are served through `404.html`, so their first response has HTTP status 404.

## `TODO(owner)` list

Business facts (hidden on the site until filled in; `apps/web/src/content/site.js`):

- [ ] Phone and WhatsApp number (enables call/WhatsApp buttons, floating contact, footer and contact details)
- [ ] Public email address
- [ ] Full address, city (also added to page titles), PIN code, coordinates
- [ ] Opening hours
- [ ] Google Maps embed URL
- [ ] Instagram / Facebook / YouTube links

Content:

- [ ] Seated and floating capacity, and area, for each venue (`venues.json`)
- [ ] Real photos of the Garden Lawn (currently a "Photo coming soon" placeholder)
- [ ] Usage rights for the four existing photos (they look like stock images), plus real photos of halls, décor and events
- [ ] Real, consented testimonials, then set `"verified": true` (`testimonials.json`)
- [ ] Confirm the stats (500+ events, 300+ weddings, 25,000+ guests, 15 years), then set `"verified": true` (`stats.json`)
- [ ] Confirm FAQ facts: capacity, valet parking, Jain menus, 30‑day cancellation policy (`faqs.json`)
- [ ] Package prices: add `priceFrom` where you want a "Starting from" price. The old ₹15,000/25,000/45,000 tiers stay hidden.
- [ ] A line about the founder or team (`about.json`)
- [ ] Legal review of the privacy policy (`PrivacyPage.jsx`)

Accounts and hosting (`docs/DEPLOYMENT.md`):

- [ ] SMTP account (`SMTP_*`, `MAIL_FROM`) and `OWNER_EMAIL`
- [ ] API host with a persistent disk (Render/Railway/VPS), `ADMIN_TOKEN`, `CORS_ORIGINS`
- [ ] GitHub Pages source = GitHub Actions; repository variables `API_URL` and `SITE_URL`

## Security notes

- **Customer spreadsheets are still in git history** (`backend/data/enquiries.xlsx`, `contacts.xlsx`). They were
  empty or header‑only at the last commit, but older commits may have held real rows. Removing them needs
  `git filter-repo` plus a force‑push, which only the repository owner should do, after warning collaborators.
- No real credentials were found in tracked files (the old `backend/.env.example` held placeholders only). If real SMTP
  credentials were ever committed in older history or shared elsewhere, rotate them.
- Admin export uses a bearer token compared in constant time; production refuses to start with a token under 32 characters.
- Raw IPs are never stored (daily‑salted SHA‑256 only). Logs redact `Authorization`, phone and email.

## Next steps (optional)

- Prerender pages at build time (e.g. React Router framework mode / a prerender step) for faster first paint and
  200 status codes on deep links.
- A small admin dashboard UI over `/api/admin/*` instead of curl.
- WhatsApp Business API notifications to the owner on each enquiry.
- Landing pages per event type and location for SEO, and an optional blog.
- Privacy‑friendly analytics (Plausible/Umami) and Search Console.
- Automated nightly `app.db` backups to object storage.
