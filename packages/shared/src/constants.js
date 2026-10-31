export const EVENT_TYPES = [
  'Wedding',
  'Reception',
  'Engagement / Ring Ceremony',
  'Haldi / Mehendi / Sangeet',
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Religious / Community Function',
  'Other',
];
export const GUESTS = { min: 10, max: 5000 };
// Indian mobile (optional +91 / 0 prefix) OR generic international 8–15 digits
export const PHONE_REGEX = /^(?:(?:\+91|0)?[6-9]\d{9}|\+?[1-9]\d{7,14})$/;
export const normalizePhone = (v) => String(v ?? '').replace(/[\s\-()]/g, '');

/**
 * Today's date in India as `YYYY-MM-DD`, so "no past dates" means the same thing
 * in the visitor's browser and on the server, whatever their time zones.
 * @param {Date} [now]
 */
export const todayInIndia = (now = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
