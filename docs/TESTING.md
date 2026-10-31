# Testing

| Layer          | Tool                                              | Where                   | Run                           |
| -------------- | ------------------------------------------------- | ----------------------- | ----------------------------- |
| Shared schemas | Vitest                                            | `packages/shared/tests` | `npm test -w packages/shared` |
| API            | Vitest + Supertest, in-memory SQLite, fake mailer | `apps/api/tests`        | `npm test -w apps/api`        |
| Web            | Vitest + Testing Library (jsdom)                  | `apps/web/tests`        | `npm test -w apps/web`        |
| End-to-end     | Playwright (Desktop Chrome + Pixel 7)             | `e2e/`                  | `npm run test:e2e`            |
| Accessibility  | `@axe-core/playwright` on every route             | `e2e/a11y.spec.js`      | part of `test:e2e`            |

`npm test` runs the three Vitest suites. `npm run check` runs lint, the Prettier check, all unit tests and the
production build, which is what CI runs before the e2e tests.

## End-to-end tests

`playwright.config.js` starts both servers itself: the API with `DATABASE_PATH=:memory:`, `NODE_ENV=test`, no SMTP
and `RATE_LIMIT_MAX=1000`, and the Vite dev server. Locally it **reuses** servers already running on 4000/5173,
so stop your own `npm run dev` first if it uses a file database (or you'll hit the normal 5-per-15-minutes rate limit).

```bash
npx playwright install chromium   # once
npm run test:e2e
npx playwright test --project=mobile e2e/navigation.spec.js   # one project, one file
npx playwright show-report        # after a failure in CI-style runs
```

## What the suites cover

- **shared**: valid/invalid payloads per field, unknown keys (the legacy `eventName`), past dates, phone formats.
- **api**: health; enquiry and contact happy paths and stored rows; field errors; HTML escaping in emails;
  `{{placeholder}}` rendering; mail failure still returns 201 with `email_status=failed`; honeypot; malformed JSON;
  rate limit; CORS; admin auth and xlsx export; config defaults and production strictness; 404.
- **web**: every content file against its schema, image references, owner-approved copy (word for word), the
  verified-content filter, UI primitives (keyboard and ARIA), the API client, "only `lib/api.js` calls fetch",
  routing and navigation from any page, the mobile menu, and both forms (payload shape, server errors, success, prefill).
- **e2e**: every route renders with one `h1` and no console errors, navigation from inner pages, hash targets,
  the mobile drawer, real submissions to the API, prefill from CTAs, and zero serious/critical axe violations.

## Adding tests

- API: build an app with `setup()` from `apps/api/tests/helpers.js`. It returns `{ app, db, mailer, config }`.
  Call `await app.locals.flush()` before asserting on emails or `email_status` (emails are sent after the response).
- Web components: render with `renderWithRouter(ui, { route })` from `apps/web/tests/utils.jsx`. Mock `postJson`
  with `vi.mock('../src/lib/api.js', …)` as in `forms.test.jsx`.
- New page: the routing unit test, e2e smoke test and axe test iterate `routes.js`, so it's covered automatically.
