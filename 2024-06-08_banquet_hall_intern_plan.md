# Banquet Hall Website Intern Plan (4‑Week Schedule)

**Goal**: Build a fully functional banquet hall website over a month (20 working days). Rohil (backend‑focused) and Pushkar (frontend‑focused) will work together daily, each taking ownership of a feature they choose. The plan breaks every feature into bite‑size tasks, enforces TDD, frequent commits, and ends with a production‑ready deployment.

---

## Assumptions & Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React‑Hook‑Form, EmailJS (or nodemailer via backend) for email replies.
- **Backend**: Node.js + Express (or FastAPI if preferred), SQLite + `xlsx` for Excel exports, Nodemailer for email confirmations.
- **Repository**: Monorepo with `frontend/` and `backend/` directories.
- **Testing**: Jest + React Testing Library (frontend), Jest + Supertest (backend).
- **CI/CD**: GitHub Actions lint + test + deployment to Vercel (frontend) and Railway/Render (backend).
- **Project Management**: Feature branch per day, PR review, daily stand‑up (brief sync).

---

## Weekly Overview
| Week | Focus |
|------|-------|    
| **1** | Project setup, core enquiry flow (API + UI) and basic static pages. |
| **2** | Media sections (gallery, venue showcase, packages) and testimonials. |
| **3** | Additional content (FAQs, contact form, map, footer) and polishing. |
| **4** | Testing, documentation, CI/CD pipeline, final deployment and hand‑off. |

---

## Day‑by‑Day Schedule (20 Working Days)

### Week 1 – Foundations & Enquiry Feature
| Day | Intern | Task |
|-----|--------|------|
| **1** | Rohil | Initialise **backend** repo: `mkdir backend && cd backend && npm init -y`. Install Express, body‑parser, `xlsx`, `nodemailer`, `cors`, `async-mutex`. Create minimal `server.js` with `GET /health`. Write failing test for health endpoint. Commit on branch `setup/backend-init`. |
|     | Pushkar | Initialise **frontend** repo: `npm create vite@latest frontend --template react`. Add Tailwind CSS. Create placeholder `src/App.jsx` with a hero banner. Write failing React test that renders hero text. Commit on branch `setup/frontend-init`. |
| **2** | Rohil | Implement **Enquiry API** `POST /enquiry`: validate fields (type, event, guests, name, phone, email), write to `enquiries.xlsx`, send confirmation email (use Nodemailer + Mailtrap). Write unit tests for validation, file write, email mock. Commit on `feature/enquiry-api`. |
|     | Pushkar | Build **Quick Enquiry Form** UI component using React‑Hook‑Form. Add client‑side validation matching backend rules. Connect to `POST /enquiry` (proxy through Vite). Write component test for validation errors. Commit on `feature/enquiry-ui`. |
| **3** | Rohil | Create **email template** `templates/enquiry-confirm.html`. Update API to render template. Add test ensuring rendered HTML contains user name. Commit on `feature/email-template`. |
|     | Pushkar | Add **success toast** after successful form submission. Write UI test for toast appearance. Commit on `feature/enquiry-toast`. |
| **4** | Rohil | Add **static JSON** endpoints `GET /about` and `GET /services` returning page content (title, description, image URLs). Write integration tests with Supertest. Commit on `feature/static-content-api`. |
|     | Pushkar | Create **AboutUs** and **Services** pages, route via React‑Router, fetch data from the new endpoints, and display with Tailwind layout. Write snapshot tests. Commit on `feature/about-services-pages`. |
| **5** | Rohil | Set up **CORS** middleware for frontend origin. Add basic rate‑limiting middleware (`express-rate-limit`). Write tests for CORS headers. Commit on `feature/cors‑rate‑limit`. |
|     | Pushkar | Polish **Hero Section**: add background image, call‑to‑action button linking to enquiry form. Ensure responsive design. Write visual regression test (snapshot). Commit on `feature/hero‑polish`. |

### Week 2 – Media & Showcase Features
| Day | Intern | Task |
|-----|--------|------|
| **6** | Rohil | Add **gallery data**: place images in `backend/public/gallery/`, create `GET /gallery` endpoint returning JSON array of URLs. Write test confirming correct JSON shape. Commit on `feature/gallery-api`. |
|     | Pushkar | Build **Gallery** page: fetch from `/gallery`, display responsive grid with `react-photo-gallery`. Add lightbox on click (optional). Write component test mocking fetch. Commit on `feature/gallery-ui`. |
| **7** | Rohil | Add **venue data** JSON (`data/venues.json`). Create `GET /venues` endpoint. Write tests for data shape and status code. Commit on `feature/venues-api`. |
|     | Pushkar | Implement **VenueShowcase** component with Swiper.js carousel, consuming `/venues`. Write UI test for carousel navigation. Commit on `feature/venue-showcase`. |
| **8** | Rohil | Add **packages data** JSON and `GET /packages` endpoint. Write corresponding tests. Commit on `feature/packages-api`. |
|     | Pushkar | Build **Packages** page: card layout for each package, responsive grid. Add basic pricing info. Write component snapshot test. Commit on `feature/packages-ui`. |
| **9** | Rohil | Create **testimonials JSON** and `GET /testimonials` endpoint. Write tests. Commit on `feature/testimonials-api`. |
|     | Pushkar | Create **Testimonials** carousel component (auto‑rotate, manual arrows). Write UI test for rendering at least one testimonial. Commit on `feature/testimonials-ui`. |
| **10**| Rohil | Add **event statistics** endpoint `GET /stats` returning numbers (events held, guests served, etc.). Write tests. Commit on `feature/stats-api`. |
|     | Pushkar | Build **EventStats** component showing animated counters. Write UI test ensuring numbers render from API data. Commit on `feature/stats-ui`. |

### Week 3 – Additional Content & Polish
| Day | Intern | Task |
|-----|--------|------|
| **11**| Rohil | Implement **contact API** `POST /contact`: write to `contacts.xlsx`, send confirmation email (reuse template). Write validation and file‑write tests. Commit on `feature/contact-api`. |
|     | Pushkar | Build **Contact** page with a form similar to Enquiry, plus **Google Maps** iframe (or Leaflet) showing venue location. Write component test for map render. Commit on `feature/contact-ui`. |
| **12**| Rohil | Add **FAQ JSON** and `GET /faqs` endpoint. Write tests. Commit on `feature/faqs-api`. |
|     | Pushkar | Create **FAQ** accordion component fetching from `/faqs`. Write UI test for expand/collapse behavior. Commit on `feature/faqs-ui`. |
| **13**| Rohil | Set up **environment config** (`.env.example`) with placeholders for email credentials, Mailtrap token, and CORS origin. Add runtime validation using `dotenv` and `joi`. Write config load test. Commit on `feature/config‑setup`. |
|     | Pushkar | Refactor shared **layout components** (Header, Footer, Container) with Tailwind utility classes. Ensure consistent spacing and color palette (`primary: #7C3AED`). Write snapshot tests for layout. Commit on `feature/layout‑components`. |
| **14**| Rohil | Implement **rate limiting** on all POST routes (already added basic middleware). Add test ensuring 429 after exceeding limit. Commit on `feature/rate‑limit‑enhance`. |
|     | Pushkar | Add **responsive design audit**: test pages on mobile breakpoint (using `window.innerWidth` mock). Fix any layout issues. No code test needed, but commit CSS changes. Commit on `feature/responsive‑fixes`. |
| **15**| Rohil | Write **API documentation** in `backend/README.md` (endpoint table, request/response schemas). Add a script `npm run docs` that prints the markdown. Commit on `docs/api‑backend`. |
|     | Pushkar | Write **frontend README** with setup, dev, build, and deployment instructions. Add storybook entry for one component (optional). Commit on `docs/frontend‑readme`. |

### Week 4 – Testing, CI/CD, Deployment & Handoff
| Day | Intern | Task |
|-----|--------|------|
| **16**| Both | Set up **GitHub Actions** workflow:
- Lint (ESLint + Prettier)
- Run Jest tests for both frontend and backend
- Build frontend and backend artifacts
- Deploy to Vercel (frontend) and Railway (backend) on `main` push.
Commit workflow file `.github/workflows/ci.yml`. |
| **17**| Both | Perform **End‑to‑End smoke test**:
- Visit live site, navigate through all pages
- Submit enquiry and contact forms, verify Excel files updated and email received in Mailtrap.
Document any bugs in GitHub Issues and fix immediately (max 2 bugs). |
| **18**| Both | Add **accessibility checks** using `axe-core` in Jest for critical pages (Home, Enquiry, Contact). Write failing test, then fix issues (ARIA labels, contrast). Commit on `feature/a11y‑fixes`. |
| **19**| Both | Create **project hand‑off docs**:
- Architecture diagram (simple markdown with diagram link)
- List of npm scripts (`dev`, `build`, `test`, `lint`, `deploy`)
- On‑call rotation for the interns (who to contact for backend vs frontend bugs).
- Checklist for future feature addition.
Commit on `handoff/README.md`. |
| **20**| Both | Final **review & merge**:
- Ensure all PRs are merged to `main`.
- Tag release `v1.0`.
- Send a short summary email to the manager with live URLs and GitHub repo link.
- Celebrate! 🎉 |

---

## Expected File Structure
```
frontend/
  src/
    components/
      EnquiryForm.jsx
      Hero.jsx
      Gallery.jsx
      VenueShowcase.jsx
      Packages.jsx
      Testimonials.jsx
      EventStats.jsx
      FAQ.jsx
      ContactForm.jsx
      Map.jsx
      Footer.jsx
      Layout/
        Header.jsx
        Footer.jsx
    pages/
      Home.jsx
      AboutUs.jsx
      Services.jsx
      GalleryPage.jsx
      VenuePage.jsx
      PackagesPage.jsx
      TestimonialsPage.jsx
      StatsPage.jsx
      FAQPage.jsx
      ContactPage.jsx
    App.jsx
    main.jsx
  tests/
    **/*.test.jsx
  tailwind.config.js
  vite.config.ts
backend/
  server.js
  routes/
    enquiry.js
    contact.js
    static.js   # about, services, venues, packages, gallery, testimonials, stats, faqs
  templates/
    enquiry-confirm.html
  data/
    venues.json
    packages.json
    testimonials.json
    stats.json
    faqs.json
  public/gallery/   # images
  enquiries.xlsx
  contacts.xlsx
  .env.example
  tests/
    **/*.test.js
.gitignore
README.md
.github/workflows/ci.yml
```

---

## Risks & Mitigations
- **Email deliverability** – use Mailtrap during dev; switch to real SMTP before launch.
- **Concurrent Excel writes** – protect with `async-mutex` lock; consider moving to a real DB in future.
- **CORS misconfiguration** – test locally with Vite proxy, then with live domain.
- **Design drift** – shared Tailwind config and color palette enforce consistency.
- **Feature creep** – stick to the 20‑day schedule; add optional enhancements only after Day 20.

---

## Open Questions
1. Preferred backend language (Node Express vs Python FastAPI). Adjust tasks accordingly.
2. Final hosting providers (Vercel + Railway assumed). Change if the team prefers another platform.
3. Need for an admin dashboard to view enquiries? Not in scope for the first month.