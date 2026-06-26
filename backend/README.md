# Banquet Hall Backend API

REST API for the Banquet Hall website. Built with Node.js, Express, and Excel files for data storage.

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. `npm start` — starts on port 5000 (or whatever PORT is set to in .env)
5. `npm test` — runs all tests

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/about` | About page content |
| GET | `/api/services` | Services list |
| GET | `/api/venues` | Venues list |
| GET | `/api/packages` | Wedding packages & pricing |
| GET | `/api/testimonials` | Client testimonials |
| GET | `/api/stats` | Event statistics |
| GET | `/api/faqs` | Frequently asked questions |
| GET | `/api/gallery` | Gallery image URLs |
| POST | `/api/enquiries` | Submit a new enquiry |
| POST | `/api/contact` | Submit a contact message |

## GET Endpoints

### GET /health
Returns `{ "status": "UP" }` when the server is running.

### GET /api/about
Returns an object with `hero`, `story`, `highlights`, and `cta` sections.

### GET /api/services
Returns an array of services. Each service has:
- `id` (string)
- `title` (string)
- `tagline` (string)

### GET /api/venues
Returns an array of venues. Each venue has:
- `id` (string)
- `name` (string)
- `capacity` (number)
- `description` (string)
- `image` (string)
- `features` (array of strings)

### GET /api/packages
Returns an array of packages. Each package has:
- `id` (string)
- `name` (string)
- `description` (string)
- `price` (number)
- `currency` (string)
- `inclusions` (array of strings)
- `capacity` (number)

### GET /api/testimonials
Returns an array of testimonials. Each testimonial has:
- `id` (string)
- `name` (string)
- `eventType` (string)
- `eventDate` (string)
- `rating` (number)
- `quote` (string)

### GET /api/stats
Returns an object with numeric fields: `eventsHosted`, `guestsServed`, `weddingsConducted`, `corporateEvents`, `yearsInBusiness`, `happyClients`.

### GET /api/faqs
Returns an array of FAQs. Each FAQ has:
- `id` (number)
- `question` (string)
- `answer` (string)

### GET /api/gallery
Returns an array of image URL strings (e.g., `["gallery/img1.jpg", "gallery/img2.jpg"]`).

## POST Endpoints

### POST /api/enquiries
Submit a new event enquiry.

**Request body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | 2–100 characters |
| `email` | string | ✅ | Must be a valid email format |
| `phone` | string | ✅ | 7–20 characters, accepts `+`, `-`, `(`, `)`, spaces |
| `eventType` | string | ✅ | e.g., "Wedding", "Engagement", "Birthday" |
| `eventDate` | string | ✅ | ISO date format (YYYY-MM-DD) |
| `guests` | number | ✅ | Minimum 1 |
| `message` | string | ❌ | Optional message |

**Example request:**
```bash
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohil Soni",
    "email": "rohil@example.com",
    "phone": "+155****4567",
    "eventType": "Wedding",
    "eventDate": "2025-12-31",
    "guests": 150,
    "message": "Looking forward to booking!"
  }'
```

**Success response (201):**
```json
{
  "status": "success",
  "message": "Enquiry received and email sent."
}
```

**Validation error (400):**
```json
{
  "status": "error",
  "message": "Validation failed",
  "details": ["\"name\" is required", "\"email\" must be a valid email"]
}
```

### POST /api/contact
Submit a contact message.

**Request body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | 2–100 characters |
| `email` | string | ✅ | Must be a valid email format |
| `phone` | string | ✅ | 7–20 characters |
| `subject` | string | ✅ | 1–200 characters |
| `message` | string | ❌ | Optional message |

**Success response (201):**
```json
{
  "status": "success",
  "message": "Contact received and email sent."
}
```

**Validation error (400):**
```json
{
  "status": "error",
  "message": "Validation failed",
  "details": ["\"name\" is required", "\"email\" is required"]
}
```

### Server error (500)
Both POST endpoints return this when something goes wrong:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Rate Limiting

POST endpoints (`/api/enquiries` and `/api/contact`) are rate-limited to **20 requests per 15 minutes** per IP address.

When the limit is exceeded, the API returns:

```
HTTP 429 Too Many Requests
```

```json
{
  "status": "error",
  "message": "Too many requests. Please try again later."
}
```

The response includes `RateLimit-Remaining` and `RateLimit-Reset` headers so clients can track their usage.

## Environment Variables

All configuration is done via environment variables (loaded from `.env`).

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ❌ | `3000` | Port the server listens on |
| `CORS_ORIGIN` | ✅ | — | Frontend URL (e.g., `http://localhost:5173`) |
| `SMTP_HOST` | ✅ | — | SMTP server hostname |
| `SMTP_PORT` | ✅ | — | SMTP server port |
| `SMTP_USER` | ✅ | — | SMTP username |
| `SMTP_PASS` | ✅ | — | SMTP password |
| `FROM_EMAIL` | ✅ | — | "From" address shown on outgoing emails |

See `.env.example` for a template.