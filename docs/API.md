# API

Base URL: `http://localhost:4000` in development; production is whatever host you deploy to (see
[DEPLOYMENT.md](DEPLOYMENT.md)). All bodies are JSON (`Content-Type: application/json`, max 20 kB).

## Errors

Every error has the same shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the highlighted fields.",
    "fields": { "eventDate": "Please choose your event date" }
  }
}
```

| Status | `code`              | When                                                                                                                            |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `VALIDATION_ERROR`  | Body or query failed the schema. `fields` maps each field to its first message. Unknown keys are reported as `"Unknown field"`. |
| 400    | `INVALID_JSON`      | Body isn't valid JSON                                                                                                           |
| 401    | `UNAUTHORIZED`      | Missing or wrong admin token                                                                                                    |
| 404    | `NOT_FOUND`         | No such route                                                                                                                   |
| 413    | `PAYLOAD_TOO_LARGE` | Body over 20 kB                                                                                                                 |
| 429    | `RATE_LIMITED`      | Too many form submissions                                                                                                       |
| 500    | `INTERNAL_ERROR`    | Unexpected error (no stack trace in production)                                                                                 |

CORS: only origins listed in `CORS_ORIGINS` get `Access-Control-Allow-Origin`; methods `GET`, `POST`.

## `GET /api/health`

```json
200 { "status": "ok", "db": "ok", "uptime": 1234 }
```

Returns `503 { "status": "error", "db": "error" }` if the database can't be queried.

## `POST /api/enquiries`

Rate limit: **5 per 15 minutes per IP** (`RATE_LIMIT_MAX`), with `RateLimit-Limit`, `RateLimit-Remaining`,
`RateLimit-Reset` headers.

| Field        | Required | Rule                                                                                                                                                                              |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | yes      | 2–100 characters, trimmed                                                                                                                                                         |
| `phone`      | yes      | spaces, dashes, brackets removed; Indian mobile (`9876543210`, `+919876543210`, `09876543210`) or international 8–15 digits                                                       |
| `email`      | no       | valid email; empty string = not given. If given, the customer gets a confirmation email.                                                                                          |
| `eventType`  | yes      | one of `Wedding`, `Reception`, `Engagement / Ring Ceremony`, `Haldi / Mehendi / Sangeet`, `Birthday`, `Anniversary`, `Corporate Event`, `Religious / Community Function`, `Other` |
| `eventDate`  | yes      | `YYYY-MM-DD`, today or later (India time)                                                                                                                                         |
| `guests`     | yes      | whole number 10–5000 (strings are coerced)                                                                                                                                        |
| `venue`      | no       | venue slug, ≤ 60 characters                                                                                                                                                       |
| `message`    | no       | ≤ 1000 characters                                                                                                                                                                 |
| `sourcePage` | no       | page the form was sent from, ≤ 200 characters                                                                                                                                     |
| `website`    | no       | honeypot; must be empty                                                                                                                                                           |

```bash
curl -X POST localhost:4000/api/enquiries -H 'content-type: application/json' -d '{
  "name": "Asha Verma", "phone": "98765 43210", "email": "asha@example.com",
  "eventType": "Wedding", "eventDate": "2026-12-12", "guests": 250, "venue": "grand-ballroom"
}'
```

```json
201 { "id": 42, "message": "Thank you! We've received your enquiry and will call you within 24 hours." }
```

The response is sent as soon as the row is stored. Emails go out afterwards; the outcome is stored in
`email_status` (`sent`, `failed`, or `skipped` when there is nobody to email). If the honeypot is filled the API
responds `201` but stores and sends nothing.

## `POST /api/contact`

Same behaviour and rate limit. Fields: `name`, `phone` (as above), `email` (**required**), `subject` (2–150),
`message` (10–2000), `website` (honeypot).

```json
201 { "id": 7, "message": "Thank you for your message. We'll get back to you soon." }
```

## Admin export

Requires `Authorization: Bearer <ADMIN_TOKEN>` (compared in constant time).

`GET /api/admin/enquiries` and `GET /api/admin/contacts`

| Query    | Default |                                     |
| -------- | ------- | ----------------------------------- |
| `format` | `json`  | `json` or `xlsx`                    |
| `from`   | —       | `YYYY-MM-DD`, inclusive, India time |
| `to`     | —       | `YYYY-MM-DD`, inclusive, India time |

```json
200 { "count": 1, "items": [{ "id": 42, "created_at": "2026-11-01T09:30:00.000Z", "name": "Asha Verma", … }] }
```

With `format=xlsx` the response is an Excel download (`enquiries-YYYY-MM-DD.xlsx`) with a bold, frozen header row,
sized columns and timestamps in India time.

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" "localhost:4000/api/admin/enquiries?format=xlsx" -o enquiries.xlsx
```

In development without `ADMIN_TOKEN` a random token is generated per run (the API logs a warning), so set one in
`apps/api/.env` if you want to try the export locally.
