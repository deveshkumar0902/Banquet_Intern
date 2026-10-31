import ExcelJS from 'exceljs';
import { formatIst, istDayStartUtc } from '../utils/format.js';

const COLUMNS = {
  enquiries: [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Received (IST)', key: 'created_at', width: 18 },
    { header: 'Name', key: 'name', width: 24 },
    { header: 'Phone', key: 'phone', width: 16 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Event type', key: 'event_type', width: 22 },
    { header: 'Event date', key: 'event_date', width: 12 },
    { header: 'Guests', key: 'guests', width: 8 },
    { header: 'Venue', key: 'venue', width: 18 },
    { header: 'Message', key: 'message', width: 50 },
    { header: 'Page', key: 'source_page', width: 16 },
    { header: 'Email status', key: 'email_status', width: 12 },
  ],
  contacts: [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Received (IST)', key: 'created_at', width: 18 },
    { header: 'Name', key: 'name', width: 24 },
    { header: 'Phone', key: 'phone', width: 16 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Subject', key: 'subject', width: 30 },
    { header: 'Message', key: 'message', width: 60 },
    { header: 'Email status', key: 'email_status', width: 12 },
  ],
};

export const EXPORT_TYPES = /** @type {const} */ (['enquiries', 'contacts']);

/**
 * Rows of `type`, newest first. `from`/`to` are inclusive IST calendar dates (YYYY-MM-DD).
 * @param {import('better-sqlite3').Database} db
 * @param {'enquiries' | 'contacts'} type
 * @param {{ from?: string, to?: string }} [range]
 */
export function listRows(db, type, { from, to } = {}) {
  if (!EXPORT_TYPES.includes(type)) throw new Error(`Unknown export type: ${type}`);
  const where = [];
  const params = {};
  if (from) {
    where.push('created_at >= @from');
    params.from = istDayStartUtc(from);
  }
  if (to) {
    const next = new Date(istDayStartUtc(to));
    next.setUTCDate(next.getUTCDate() + 1);
    where.push('created_at < @to');
    params.to = next.toISOString();
  }
  const cols = COLUMNS[type].map((c) => c.key).join(', ');
  const sql = `SELECT ${cols} FROM ${type} ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY id DESC`;
  return db.prepare(sql).all(params);
}

/**
 * @param {'enquiries' | 'contacts'} type
 * @param {object[]} rows from `listRows`
 * @returns {Promise<Buffer>}
 */
export async function buildWorkbook(type, rows) {
  const wb = new ExcelJS.Workbook();
  wb.created = new Date();
  const ws = wb.addWorksheet(type === 'enquiries' ? 'Enquiries' : 'Contacts', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });
  ws.columns = COLUMNS[type];
  ws.getRow(1).font = { bold: true };
  for (const row of rows) ws.addRow({ ...row, created_at: formatIst(row.created_at) });
  return Buffer.from(await wb.xlsx.writeBuffer());
}
