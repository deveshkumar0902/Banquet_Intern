#!/usr/bin/env node
// One-time import of the old Excel files into SQLite. Safe to re-run: exact duplicates are skipped.
// Usage: npm run import:legacy -w apps/api -- <file.xlsx> --type enquiries|contacts
import { parseArgs } from 'node:util';
import { config as loadDotenv } from 'dotenv';
import ExcelJS from 'exceljs';
import { loadConfig } from '../src/config/env.js';
import { openDb } from '../src/db/index.js';

loadDotenv({ quiet: true });
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { type: { type: 'string' } },
});
const [file] = positionals;
if (!file || !['enquiries', 'contacts'].includes(values.type)) {
  console.error('Usage: import-legacy-xlsx.mjs <file.xlsx> --type enquiries|contacts');
  process.exit(1);
}

// Old header → new column
const MAPS = {
  enquiries: {
    Timestamp: 'created_at',
    Name: 'name',
    'Mobile Number': 'phone',
    'Email Address': 'email',
    'Event Type': 'event_type',
    'Event Date': 'event_date',
    'No of People': 'guests',
    Message: 'message',
  },
  contacts: {
    Timestamp: 'created_at',
    Name: 'name',
    Email: 'email',
    Phone: 'phone',
    Subject: 'subject',
    Message: 'message',
  },
};

const cellText = (v) => {
  if (v == null) return null;
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object')
    return v.text ?? v.result ?? (v.richText?.map((r) => r.text).join('') || null);
  return String(v).trim() || null;
};
const toIso = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};
const toDate = (v) => (v ? toIso(v).slice(0, 10) : '');

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(file);
const ws = wb.worksheets[0];
const map = MAPS[values.type];
const headers = [];
ws.getRow(1).eachCell((cell, col) => (headers[col] = map[cellText(cell.value)]));

const config = loadConfig();
const db = openDb(config.DATABASE_PATH);
const cols = Object.values(map);
const exists = db.prepare(
  `SELECT 1 FROM ${values.type} WHERE ${cols.map((c) => `${c} IS @${c}`).join(' AND ')}`,
);
const insert = db.prepare(
  `INSERT INTO ${values.type} (${cols.join(', ')}, email_status) VALUES (${cols.map((c) => `@${c}`).join(', ')}, 'skipped')`,
);

let imported = 0;
let skipped = 0;
db.transaction(() => {
  ws.eachRow((row, n) => {
    if (n === 1) return;
    const rec = Object.fromEntries(cols.map((c) => [c, null]));
    row.eachCell((cell, col) => {
      if (headers[col]) rec[headers[col]] = cellText(cell.value);
    });
    if (!rec.name) return;
    rec.created_at = toIso(rec.created_at);
    if (values.type === 'enquiries') {
      rec.event_date = toDate(rec.event_date);
      rec.guests = Number.parseInt(rec.guests, 10) || 0;
      rec.event_type ??= 'Other';
    } else {
      rec.subject ??= '(no subject)';
      rec.message ??= '';
    }
    rec.phone ??= '';
    if (values.type === 'contacts') rec.email ??= '';
    if (exists.get(rec)) skipped++;
    else {
      insert.run(rec);
      imported++;
    }
  });
})();
db.close();
console.log(`Imported ${imported} ${values.type}, skipped ${skipped} duplicates from ${file}`);
