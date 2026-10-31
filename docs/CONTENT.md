# Content guide

All site copy and data lives in `apps/web/src/content/`. Part 1 explains how to edit it; part 2 records where the
original content came from and what still needs the owner.

## Part 1: Editing content

You never need to touch components to change text, prices, venues or photos. Edit the file, run `npm test -w apps/web`
(it validates every content file against `content/schema.js`), and the page updates.

| File                              | What it controls                                                                                                                                                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.js`                         | Brand name, phone, WhatsApp, email, address, opening hours, map, social links. **Empty values are hidden on the site**, so fill them in rather than writing placeholders.                                                                                |
| `home.json`                       | Hero headline, subtitle, photo and buttons; the "Welcome" intro block                                                                                                                                                                                    |
| `about.json`                      | About page story, highlights, values, team note                                                                                                                                                                                                          |
| `venues.json`                     | Halls and lawn: `slug` (used in the URL), `name`, `type` (`indoor`/`lawn`/`terrace`), `capacity.seated` / `capacity.floating` (use `null` if unknown), features, `idealFor` (must be event types from the enquiry form), `images` + matching `imageAlts` |
| `services.json`                   | Event types on the Events page and home tiles: `icon` must be a name from `src/lib/icons.js`                                                                                                                                                             |
| `packages.json`                   | Packages page. Optional `priceFrom` (number, in rupees) shows "Starting from ₹…"; leave it out to show the `pricing` text. `highlight: true` marks one package as "Most requested".                                                                      |
| `cta.json`                        | "Ready to Plan Your Event?" band (owner-approved copy)                                                                                                                                                                                                   |
| `faqs.json`                       | FAQ page (grouped by `category`); `top: true` puts a question on the home page (first 5)                                                                                                                                                                 |
| `testimonials.json`, `stats.json` | See "verified" below                                                                                                                                                                                                                                     |
| `process.json`                    | The 4 "How it works" steps (exactly 4)                                                                                                                                                                                                                   |
| `why-us.json`                     | The 6 "Why families choose us" tiles (exactly 6)                                                                                                                                                                                                         |
| `gallery.js`                      | Gallery photos with `alt` text and a category                                                                                                                                                                                                            |

**Owner-approved copy** (`cta.json`, the Birthday & Anniversary and Corporate packages, package titles and order) is
checked word for word by `tests/content.test.js`. If the owner approves new wording, update the test in the same commit.

### The `verified` flag

Testimonials and stats have `"verified": false` until the owner confirms they are real (and, for testimonials, that the
person agreed to be quoted). In development they show with a "Sample: awaiting owner confirmation" badge. **Production
builds hide unverified items**, and a section with nothing left hides itself. Set `"verified": true` once confirmed.
(`VITE_SHOW_UNVERIFIED=true` shows them in a production build, for a staging preview.)

### Photos

- Put photos in `apps/web/src/assets/images/<folder>/` (`hero`, `about`, `venues`, `gallery`), named in kebab-case
  describing the picture: `grand-ballroom-stage-night.jpg`.
- Landscape, **at least 1600 px wide**, JPEG. Don't pre-shrink them: the build creates 480/960/1600 px WebP and JPEG
  versions automatically and serves the right size.
- Refer to a photo by its path under `images/`, e.g. `"venues/grand-ballroom-stage-night.jpg"`. A test fails if a
  referenced photo doesn't exist.
- Every photo needs real `alt` text describing what's in it.

### `TODO(owner)` list

Search the repo for `TODO(owner)` to find each one in context. Current list:

- `site.js`: phone, WhatsApp, public email, full address, opening hours, map embed URL, coordinates, social links
- `apps/api` env (on the server): `OWNER_EMAIL`, SMTP account, `BRAND_PHONE`, `BRAND_ADDRESS`
- `venues.json`: seated and floating capacity for each venue, area in sq ft, real photos of the Garden Lawn
- `testimonials.json`: real, consented reviews (current ones are unverified samples)
- `stats.json`: confirm events hosted, weddings, guests, years (unverified samples)
- `faqs.json`: confirm capacity, valet parking, Jain menus, the 30-day cancellation policy
- `packages.json`: confirm or add `priceFrom` values; the old Silver/Gold/Diamond prices (₹15,000/25,000/45,000) are not shown
- `about.json`: a line about the founder or team
- Photos: confirm usage rights for the four existing photos; supply real photos of halls, lawn, décor and events
- Privacy page: legal review

## Part 2: Inventory of the legacy content

### Sources found in the legacy code

| Content                                                                    | Legacy source                                                                                      | Reusable?                    | Notes / owner input needed                                                                                                                     |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand                                                                      | `backend/data/*.json` say **Dev Marriage Hall**; legacy header/footer say "Royal Banquet Hall"     | Yes                          | Brand = **Dev Marriage Hall** (§1 default). "Royal Banquet Hall" retired.                                                                      |
| About (hero, story, 8 highlights, CTA)                                     | `backend/data/about.json`                                                                          | Yes, rewritten               | —                                                                                                                                              |
| Event packages (Wedding, Engagement, Birthday & Anniversary, Corporate)    | `backend/data/services.json`                                                                       | Yes                          | Birthday & Corporate are owner‑approved copy (plan Appendix F), used word for word.                                                            |
| Tiered packages (Silver ₹15,000 / Gold ₹25,000 / Diamond ₹45,000)          | `backend/data/packages.json`, duplicated as `mockPackages` in `Packages.jsx`                       | **No (hidden)**              | `TODO(owner)`: ₹15,000 for 150 guests looks wrong. Not shown until prices are confirmed.                                                       |
| Venues (Grand Ballroom 500, Royal Garden Lawn 800, Elegance Mini Hall 150) | `backend/data/venues.json`                                                                         | Yes, extended                | Image paths in the JSON never existed. `TODO(owner)`: confirm capacities (seated vs floating), area, real photos of the lawn.                  |
| FAQs (5)                                                                   | `backend/data/faqs.json`                                                                           | Yes, rewritten + categorised | `TODO(owner)`: confirm capacity (500), valet parking, Jain menu and the 30‑day cancellation policy.                                            |
| Stats (500 events, 25,000 guests, 15 years…)                               | `backend/data/stats.json`                                                                          | Kept as `verified: false`    | `TODO(owner)`: confirm. Hidden in production until verified.                                                                                   |
| Testimonials                                                               | `backend/data/testimonials.json` (3) + `mockTestimonials` in `Testimonials.jsx` (3 different ones) | Kept as `verified: false`    | `TODO(owner)`: real, consented reviews. Hidden in production until verified. The `Testimonials.jsx` mocks were dropped (two sources of truth). |
| Contact details                                                            | Legacy footer/contact page: "Royal Banquet Hall, New Delhi", `info@royalbanquet.com`               | **No**                       | Placeholder brand, not real. `TODO(owner)`: address, phone, WhatsApp, email, map, hours.                                                       |
| Email template                                                             | `backend/templates/enquiry-confirm.html`                                                           | No                           | Rebuilt in `apps/api/src/templates/email/`.                                                                                                    |

### Images

Only four real photographs exist in the repo. They were copied with descriptive names:

| New file                                                   | Legacy file                                                          | Used for                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------- |
| `assets/images/hero/banquet-hall-arches.jpg`               | `frontend/src/assets/hero-bg.jpg` (identical to `about-banquet.jpg`) | Home hero, About, page heroes |
| `assets/images/venues/grand-ballroom-round-tables.jpg`     | `frontend/src/assets/gallery/hall3.jpg`                              | Grand Ballroom                |
| `assets/images/venues/elegance-hall-mirrored-interior.jpg` | `frontend/src/assets/gallery/hall1.jpg`                              | Elegance Mini Hall            |
| `assets/images/gallery/banquet-dining-setup.jpg`           | `frontend/src/assets/gallery/hall2.jpg`                              | Gallery                       |

Not carried over: `hero.png`, `react.svg`, `vite.svg`, `favicon.svg` (Vite template assets), and
`backend/public/gallery/event{1,2,3}.jpg` (empty 0‑byte files).

`TODO(owner)`: the four photos look like stock images. Confirm we have the right to use them, and supply real photos of the
halls, the lawn, décor and past events (at least 1600 px wide, landscape). The Royal Garden Lawn currently shows a
"photo coming soon" placeholder rather than a misleading indoor photo.
