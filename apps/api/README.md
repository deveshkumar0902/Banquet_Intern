# @banquet/api

Express 5 API for the enquiry and contact forms, SQLite storage, emails and admin Excel export.

```bash
npm run dev -w apps/api      # http://localhost:4000, restarts on change; works with no .env
npm test -w apps/api
npm run export -w apps/api -- --type enquiries [--from 2026-01-01] [--to 2026-12-31]
npm run import:legacy -w apps/api -- old.xlsx --type enquiries
```

Configuration: [`.env.example`](.env.example). Endpoints: [docs/API.md](../../docs/API.md).
Architecture: [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md). Deployment: [docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md).
