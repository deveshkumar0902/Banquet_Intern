# @banquet/web

The Dev Marriage Hall website: React 19, Vite, React Router, Tailwind CSS v4.

```bash
npm run dev -w apps/web       # http://localhost:5173 (proxies /api to localhost:4000)
npm test -w apps/web
npm run build -w apps/web     # dist/ + sitemap.xml + 404.html
```

All copy and data live in [`src/content/`](src/content) — see [docs/CONTENT.md](../../docs/CONTENT.md).
Design tokens and the reference analysis: [docs/DESIGN.md](../../docs/DESIGN.md).
Architecture: [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).
