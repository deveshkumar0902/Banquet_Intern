import { createHash, timingSafeEqual } from 'node:crypto';
import { HttpError } from './httpError.js';

const digest = (s) => createHash('sha256').update(String(s)).digest();

/** Requires `Authorization: Bearer <token>`, compared in constant time. */
export const adminAuth = (token) => {
  const expected = digest(token);
  return (req, _res, next) => {
    const [scheme, given] = (req.get('authorization') ?? '').split(' ');
    if (scheme !== 'Bearer' || !given || !timingSafeEqual(digest(given), expected)) {
      throw new HttpError(401, 'UNAUTHORIZED', 'A valid admin token is required.');
    }
    next();
  };
};
