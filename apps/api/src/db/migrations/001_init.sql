CREATE TABLE IF NOT EXISTS enquiries (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  email        TEXT,
  event_type   TEXT NOT NULL,
  event_date   TEXT NOT NULL,
  guests       INTEGER NOT NULL,
  venue        TEXT,
  message      TEXT,
  source_page  TEXT,
  ip_hash      TEXT,
  email_status TEXT NOT NULL DEFAULT 'pending' -- pending | sent | failed | skipped
);
CREATE TABLE IF NOT EXISTS contacts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL,
  subject TEXT NOT NULL, message TEXT NOT NULL,
  ip_hash TEXT, email_status TEXT NOT NULL DEFAULT 'pending'
);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_created  ON contacts(created_at);
