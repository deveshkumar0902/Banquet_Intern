# Design reference analysis

> **Inspiration only. No text, images, logos, or brand elements copied.**
> The reference (destinationweddingbharat.com, captured 2026‑11‑01 with `node scripts/capture-reference.mjs`)
> informs layout rhythm, palette temperature and type pairing. Everything shipped is original.
> Screenshots, `outline.json` and `styles.json` live in `docs/reference/` (gitignored; re‑run the script to regenerate).

## 1. What the reference home page does, section by section

| #   | Reference section | Pattern                                                                                                                                                                                                      |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Header            | White bar, logo left, centred dropdown nav, outlined "Sign in" pill on the right. Hamburger on mobile.                                                                                                       |
| 2   | Hero              | Illustrated cream/peach background, small serif eyebrow, two‑line serif H1 with a decorative arrow flourish, search bar (3 inputs + filled terracotta button). On mobile the search inputs stack full‑width. |
| 3   | Intro             | Serif H2 with a small decorative "≺≺≺···" flourish, one paragraph, then 3 photo cards (image, serif H3 with a thin underline, short paragraph).                                                              |
| 4   | "Find a place"    | Venue cards in a carousel (arrows on the sides): rounded image, title on a cream "tab" overlapping the bottom of the image, address with pin icon, full‑width terracotta **Request pricing** button.         |
| 5   | Categories        | 4‑column grid of square photo tiles, rounded corners, label in white serif text bottom‑left over a dark gradient.                                                                                            |
| 6   | CTA band          | Large cream panel with a scalloped edge, serif heading, one line of copy, small filled button; illustration on the right.                                                                                    |
| 7   | Resources         | Sidebar list of categories + 3 article cards with a small pill badge.                                                                                                                                        |
| 8   | SEO copy          | Long collapsible "Read more" text block.                                                                                                                                                                     |
| 9   | FAQ               | Plain list with hairline dividers and a `+` icon on the right of each question.                                                                                                                              |
| 10  | Footer            | Warm textured background, logo badge left, 4 columns (Quick links, Support links, Follow us, Contact), newsletter input, centred © line.                                                                     |
| —   | Floating          | Round WhatsApp button fixed bottom‑left, chat button bottom‑right. A "Plan your day" modal enquiry form pops up on load.                                                                                     |

Inner pages (`/wedding-venues`, `/wedding-lawns-farmhouses`) reuse the illustrated hero with a centred serif H1, then filter dropdowns and image/text feature cards.

## 2. Palette and type (from `styles.json`) mapped to our tokens

Reference samples: body Poppins 15px `#212529` on white; headings Merriweather 500, terracotta `rgb(176, 89, 50)` (`#B05932`), H2 ≈ 47px, H3 ≈ 25px; buttons 6px radius, 600 weight.

Our tokens (`apps/web/src/styles/index.css`) keep the warm terracotta + cream temperature but are tuned for WCAG AA:

| Token       | Value     | Use                                         | Contrast                             |
| ----------- | --------- | ------------------------------------------- | ------------------------------------ |
| `cream-50`  | `#FCF8F3` | page background                             | —                                    |
| `cream-100` | `#F6EDE2` | alternate section background                | —                                    |
| `cream-200` | `#EADBC8` | borders, dividers                           | —                                    |
| `clay-500`  | `#B05932` | large headings and decoration only          | 4.6:1 on cream‑50 (large text)       |
| `clay-600`  | `#A04E2A` | **primary**: buttons, links, small headings | 5.5:1 on cream‑50, white on it 5.8:1 |
| `clay-700`  | `#7E3A1B` | hover / pressed                             | 7.9:1 on cream‑50                    |
| `clay-900`  | `#3B1D10` | dark CTA band and footer                    | —                                    |
| `gold-400`  | `#E7C78A` | accents on dark backgrounds                 | 9.5:1 on clay‑900                    |
| `gold-500`  | `#C9A25E` | decorative lines only (never text on light) | —                                    |
| `ink-900`   | `#2A211C` | body text                                   | 14.9:1 on cream‑50                   |
| `ink-600`   | `#5E544D` | muted text                                  | 7.0:1 on cream‑50                    |

Type: **Merriweather Variable** (display, headings) + **Poppins** 400/500/600 (body, UI), both SIL Open Font Licence, self‑hosted via Fontsource.
Scale: H1 `clamp(2.25rem, 5vw, 4rem)`, H2 `clamp(1.75rem, 3.5vw, 2.75rem)`, H3 `1.25–1.5rem`, body `1rem/1.7`.
Radius: cards `1rem`, buttons `0.5rem` (soft‑rounded like the reference). Shadow: soft warm `0 10px 30px -12px rgb(59 29 16 / 0.25)`.

## 3. How reference sections map to our banquet site

| Reference                     | Ours                                                                                                                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Illustrated hero + search bar | **HeroSection**: full‑bleed photo of our hall with a warm gradient, serif H1, two CTAs, and the **EnquiryForm card** (replaces the search bar and the pop‑up modal: we never pop a modal on load). |
| Intro + 3 photo cards         | **AboutIntro** (image + story) and **WhyChooseUs** tiles                                                                                                                                           |
| "Find a place" venue carousel | **VenuesGrid**: our halls/lawn as cards with the cream title tab, capacity chips and a full‑width "Check availability" button                                                                      |
| Category photo tiles          | **ServicesGrid**: event types (wedding, reception, engagement…) as tiles with icons                                                                                                                |
| Wedding packages              | **PackagesTeaser** / **Packages** page (owner‑approved copy)                                                                                                                                       |
| CTA band                      | **CtaBand** "Ready to Plan Your Event?" (owner copy), clay‑900 background with gold accent                                                                                                         |
| "How it works" numbered steps | **ProcessSteps** (Enquire → Visit & Plan → Customise → Celebrate)                                                                                                                                  |
| Image grids                   | **GalleryPreview** + Gallery page with lightbox                                                                                                                                                    |
| FAQ list with `+`             | **FaqSection** accordion                                                                                                                                                                           |
| Footer columns                | **Footer**: brand blurb, quick links, event types, contact, hours                                                                                                                                  |
| Floating WhatsApp             | **FloatingContact** (WhatsApp + call), bottom‑right on mobile                                                                                                                                      |

Not adopted: newsletter, blog/resources block, long SEO "read more" copy, pop‑up modal, vendor marketplace search.

## 4. Decorative details we re‑create in our own way

- A small inline SVG flourish (three dots + chevrons, drawn by us) after section eyebrows.
- Hairline `cream-200` dividers under card headings.
- Sections alternate `cream-50` / `cream-100`; CTA band and footer in `clay-900`.
- Cards lift slightly on hover (disabled for `prefers-reduced-motion`).
