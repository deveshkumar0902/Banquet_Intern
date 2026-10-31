# Content inventory

All site copy and data now lives in `apps/web/src/content/`. This file records where each piece came from,
what was reused, and what still needs the owner.

## Sources found in the legacy code

| Content | Legacy source | Reusable? | Notes / owner input needed |
|---|---|---|---|
| Brand | `backend/data/*.json` say **Dev Marriage Hall**; legacy header/footer say "Royal Banquet Hall" | Yes | Brand = **Dev Marriage Hall** (§1 default). "Royal Banquet Hall" retired. |
| About (hero, story, 8 highlights, CTA) | `backend/data/about.json` | Yes, rewritten | — |
| Event packages (Wedding, Engagement, Birthday & Anniversary, Corporate) | `backend/data/services.json` | Yes | Birthday & Corporate are owner‑approved copy (plan Appendix F), used word for word. |
| Tiered packages (Silver ₹15,000 / Gold ₹25,000 / Diamond ₹45,000) | `backend/data/packages.json`, duplicated as `mockPackages` in `Packages.jsx` | **No (hidden)** | `TODO(owner)`: ₹15,000 for 150 guests looks wrong. Not shown until prices are confirmed. |
| Venues (Grand Ballroom 500, Royal Garden Lawn 800, Elegance Mini Hall 150) | `backend/data/venues.json` | Yes, extended | Image paths in the JSON never existed. `TODO(owner)`: confirm capacities (seated vs floating), area, real photos of the lawn. |
| FAQs (5) | `backend/data/faqs.json` | Yes, rewritten + categorised | `TODO(owner)`: confirm capacity (500), valet parking, Jain menu and the 30‑day cancellation policy. |
| Stats (500 events, 25,000 guests, 15 years…) | `backend/data/stats.json` | Kept as `verified: false` | `TODO(owner)`: confirm. Hidden in production until verified. |
| Testimonials | `backend/data/testimonials.json` (3) + `mockTestimonials` in `Testimonials.jsx` (3 different ones) | Kept as `verified: false` | `TODO(owner)`: real, consented reviews. Hidden in production until verified. The `Testimonials.jsx` mocks were dropped (two sources of truth). |
| Contact details | Legacy footer/contact page: "Royal Banquet Hall, New Delhi", `info@royalbanquet.com` | **No** | Placeholder brand, not real. `TODO(owner)`: address, phone, WhatsApp, email, map, hours. |
| Email template | `backend/templates/enquiry-confirm.html` | No | Rebuilt in `apps/api/src/templates/email/`. |

## Images

Only four real photographs exist in the repo. They were copied with descriptive names:

| New file | Legacy file | Used for |
|---|---|---|
| `assets/images/hero/banquet-hall-arches.jpg` | `frontend/src/assets/hero-bg.jpg` (identical to `about-banquet.jpg`) | Home hero, About, page heroes |
| `assets/images/venues/grand-ballroom-round-tables.jpg` | `frontend/src/assets/gallery/hall3.jpg` | Grand Ballroom |
| `assets/images/venues/elegance-hall-mirrored-interior.jpg` | `frontend/src/assets/gallery/hall1.jpg` | Elegance Mini Hall |
| `assets/images/gallery/banquet-dining-setup.jpg` | `frontend/src/assets/gallery/hall2.jpg` | Gallery |

Not carried over: `hero.png`, `react.svg`, `vite.svg`, `favicon.svg` (Vite template assets), and
`backend/public/gallery/event{1,2,3}.jpg` (empty 0‑byte files).

`TODO(owner)`: the four photos look like stock images. Confirm we have the right to use them, and supply real photos of the
halls, the lawn, décor and past events (at least 1600 px wide, landscape). The Royal Garden Lawn currently shows a
"photo coming soon" placeholder rather than a misleading indoor photo.
