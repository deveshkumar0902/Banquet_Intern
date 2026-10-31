#!/usr/bin/env node
// Export enquiries or contacts to Excel.
// Usage: npm run export -w apps/api -- --type enquiries [--from 2026-01-01] [--to 2026-12-31] [--out data/exports/x.xlsx]
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { config as loadDotenv } from 'dotenv';
import { loadConfig } from '../src/config/env.js';
import { openDb } from '../src/db/index.js';
import { buildWorkbook, EXPORT_TYPES, listRows } from '../src/services/exportService.js';

loadDotenv({ quiet: true });
const { values } = parseArgs({
  options: {
    type: { type: 'string', default: 'enquiries' },
    from: { type: 'string' },
    to: { type: 'string' },
    out: { type: 'string' },
  },
});
if (!EXPORT_TYPES.includes(values.type)) {
  console.error(`--type must be one of: ${EXPORT_TYPES.join(', ')}`);
  process.exit(1);
}

const config = loadConfig();
const db = openDb(config.DATABASE_PATH);
const rows = listRows(db, values.type, { from: values.from, to: values.to });
const out =
  values.out ?? `data/exports/${values.type}-${new Date().toISOString().slice(0, 10)}.xlsx`;
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, await buildWorkbook(values.type, rows));
db.close();
console.log(`Wrote ${rows.length} ${values.type} to ${out}`);
