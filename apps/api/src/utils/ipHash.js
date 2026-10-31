import { createHash, randomBytes } from 'node:crypto';

let salt = { day: '', value: '' };

/**
 * SHA-256 of the IP plus a random salt that rotates daily (and on restart), so abuse can be
 * traced within a day without storing raw IP addresses.
 * @param {string | undefined} ip
 */
export function hashIp(ip) {
  if (!ip) return null;
  const day = new Date().toISOString().slice(0, 10);
  if (salt.day !== day) salt = { day, value: randomBytes(16).toString('hex') };
  return createHash('sha256').update(`${salt.value}:${ip}`).digest('hex');
}
