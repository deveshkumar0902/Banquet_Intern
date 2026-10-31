# CLAUDE.md

Banquet / wedding venue website for **Dev Marriage Hall**. npm workspaces monorepo, plain JavaScript (ESM) + JSDoc, no TypeScript.

## Stack

- `apps/web`: React 19, Vite, React Router 7 (SPA), Tailwind CSS v4, react-hook-form, sonner, embla, lucide
- `apps/api`: Express 5, SQLite (better-sqlite3, WAL), nodemailer, exceljs, pino
- `packages/shared` (`@banquet/shared`): Zod schemas + constants used by BOTH web forms and the API
- Tests: Vitest everywhere, Supertest (api), Testing Library (web), Playwright + axe (`e2e/`)

## Where things live

- All site copy, prices, venues, FAQs, images: `apps/web/src/content/` (validated by `content/schema.js` + `tests/content.test.js`)
- Routes (router, nav, sitemap): `apps/web/src/app/routes.js`
- The only `fetch` call in the web app: `apps/web/src/lib/api.js`
- API composition: `apps/api/src/app.js` (`createApp({ config, db, mailer, logger })`, dependency-injected; no module mocks in tests)
- Env config: `apps/api/src/config/env.js` (boots with zero env in development)

## Commands

- `npm run doctor` first: checks Node, deps, native bindings, Playwright browser
- `npm run dev`: api on :4000 + web on :5173 (Vite proxies `/api`)
- `npm test`, `npm run test:e2e`, `npm run lint`, `npm run format`, `npm run build`
- `npm run check`: lint + format check + unit tests + build (what CI runs before e2e)
- `npm run test:e2e`: Playwright + axe; starts its own api (in-memory DB) and web servers, but reuses anything already on :4000/:5173
- `npm run export -w apps/api -- --type enquiries`: Excel export from the local database

## Docs

`docs/ARCHITECTURE.md` (how to add a page / venue / form field), `docs/API.md`, `docs/CONTENT.md`, `docs/TESTING.md`,
`docs/DEPLOYMENT.md`, `docs/DESIGN.md` (tokens + reference analysis), `docs/REBUILD_PLAN.md`, `docs/REBUILD_REPORT.md`.

## Conventions

- Conventional Commits; never commit to `main`, never force-push.
- Never commit `node_modules/`, `.env`, `*.db`, `*.xlsx`, `dist/`.
- Form fields change in `packages/shared` first; web and api pick it up automatically.
- Business facts you don't know → `TODO(owner): …`, never guesses. Testimonials/stats carry `verified`; unverified ones are hidden in production.
- Owner-approved copy (packages, CTA band) is word for word; `content.test.js` guards it.
- If you add or remove a dependency, update `REQUIRED` in `scripts/doctor.mjs` in the same commit.
