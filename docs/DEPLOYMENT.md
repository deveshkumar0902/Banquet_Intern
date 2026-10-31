# Deployment

The website (`apps/web`) is a static build hosted on **GitHub Pages**. The API (`apps/api`) is a small
Node server that needs a **persistent disk** for its SQLite database. They deploy separately.

```
Browser ──► GitHub Pages (apps/web/dist)
   │
   └── POST /api/enquiries, /api/contact ──► Node host (apps/api) ──► /var/data/app.db
                                                     └──► SMTP (customer + owner emails)
```

Nothing in this repo deploys the API automatically, and no workflow changes repository settings.
The steps below are for the owner (or whoever holds the GitHub and hosting accounts).

## 1. Backend (do this first, so you know the API URL)

### Render

1. **New → Web Service**, connect the GitHub repo.
2. Settings:
   - **Runtime:** Node. **Node version:** from `.nvmrc` (Render reads it).
   - **Build command:** `npm ci`
   - **Start command:** `npm run start -w apps/api`
   - **Health check path:** `/api/health`
3. **Disks → Add disk:** mount path `/var/data`, 1 GB is plenty.
4. **Environment variables** (all of these are required when `NODE_ENV=production`; the server refuses to start
   without them, which is deliberate):

   | Key                                                                   | Example                                                                                       |
   | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
   | `NODE_ENV`                                                            | `production`                                                                                  |
   | `PORT`                                                                | `10000` (Render sets this for you; keep it)                                                   |
   | `DATABASE_PATH`                                                       | `/var/data/app.db`                                                                            |
   | `CORS_ORIGINS`                                                        | `https://deveshkumar0902.github.io` (the Pages origin, no path; add a custom domain here too) |
   | `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | from your email provider                                                                      |
   | `MAIL_FROM`                                                           | `Dev Marriage Hall <no-reply@yourdomain.com>`                                                 |
   | `OWNER_EMAIL`                                                         | the inbox that should receive every enquiry                                                   |
   | `ADMIN_TOKEN`                                                         | `openssl rand -hex 32` (keep it secret)                                                       |
   | `TRUST_PROXY`                                                         | `1`                                                                                           |
   | `BRAND_PHONE`, `BRAND_ADDRESS`                                        | optional, shown in email footers                                                              |

5. Deploy, then check `https://<your-service>.onrender.com/api/health` returns `{"status":"ok","db":"ok",…}`.

### Railway

Same idea: create a service from the repo, start command `npm run start -w apps/api`, add a **Volume** mounted at
`/var/data`, set the same variables (`DATABASE_PATH=/var/data/app.db`, `TRUST_PROXY=1`), and set the health check to
`/api/health`.

### A small VPS

`git clone`, `npm ci`, put the variables in `apps/api/.env`, and run `npm run start -w apps/api` under a process
manager (systemd or pm2) behind nginx/Caddy with HTTPS. Set `TRUST_PROXY=1` when behind one proxy.

## 2. Frontend (GitHub Pages)

1. Repository **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**, add:
   - `API_URL`: the API origin from step 1, e.g. `https://banquet-api.onrender.com` (no trailing slash, no `/api`)
   - `SITE_URL`: the site's origin **without** the base path, e.g. `https://deveshkumar0902.github.io`
     (the build adds `/Banquet_Intern/` itself; used for canonical links, Open Graph and `sitemap.xml`)
3. Push to `main`. The **CI** workflow runs lint, tests, build and e2e; when it passes, **Deploy website to GitHub
   Pages** (`.github/workflows/deploy-web.yml`) builds with `VITE_BASE_PATH=/Banquet_Intern/` and publishes
   `apps/web/dist`. You can also run it by hand from the Actions tab.

### How deep links work on Pages

Pages has no server-side routing, so a direct visit to `/Banquet_Intern/venues/garden-lawn` would normally 404.
`apps/web/scripts/postbuild.mjs` copies `index.html` to `404.html`; Pages serves it for unknown paths, the React app
boots, reads the URL and renders the right page. (The HTTP status is still 404 for those first loads. Search engines
render the page anyway, but if SEO becomes important, consider prerendering; see the rebuild report.)

### Custom domain

1. Add the domain in **Settings → Pages** and create the DNS records GitHub shows.
2. Add `apps/web/public/CNAME` containing the domain (e.g. `www.devmarriagehall.in`).
3. Change the build in `deploy-web.yml` to `VITE_BASE_PATH: /` and set the `SITE_URL` variable to `https://<your-domain>`.
4. Add the new origin to the API's `CORS_ORIGINS`.

## 3. Getting enquiries as Excel

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/api/admin/enquiries?format=xlsx" -o enquiries.xlsx
curl -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/api/admin/contacts?format=xlsx&from=2026-11-01&to=2026-11-30" -o contacts-nov.xlsx
```

On the server itself you can also run `npm run export -w apps/api -- --type enquiries`.

## 4. Backups

- **Daily:** snapshot the disk/volume (Render and Railway both offer this), or run a cron job on the server:
  `sqlite3 /var/data/app.db ".backup '/var/data/backups/app-$(date +%F).db'"` and copy the file off the machine.
  Use `.backup`, not `cp`: it is safe while the API is running.
- **Monthly:** download the Excel exports above and keep them with the business records.
- **Restore:** stop the service, replace `app.db` with a backup (delete any `app.db-wal`/`app.db-shm` next to it), start it.

## 5. After the first deploy

- Submit the enquiry form on the live site and confirm the owner email arrives.
- Check `https://<site>/sitemap.xml` and submit it in Google Search Console.
- Rotate `ADMIN_TOKEN` if it is ever shared or pasted somewhere public.
