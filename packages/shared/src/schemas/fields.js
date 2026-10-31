import { z } from 'zod';
import { PHONE_REGEX, normalizePhone } from '../constants.js';

/** Shared field builders so both forms phrase errors the same way. */
export const nameField = z
  .string({ error: 'Please enter your name' })
  .trim()
  .min(2, 'Please enter your name')
  .max(100, 'Name is too long');

export const phoneField = z.preprocess(
  normalizePhone,
  z.string().regex(PHONE_REGEX, 'Please enter a valid phone number'),
);

const emptyToUndefined = (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

export const optionalEmailField = z.preprocess(
  emptyToUndefined,
  z.email('Please enter a valid email address').optional(),
);

export const requiredEmailField = z
  .string({ error: 'Please enter your email address' })
  .trim()
  .min(1, 'Please enter your email address')
  .pipe(z.email('Please enter a valid email address'));

/** @param {number} max */
export const optionalText = (max) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(max, `Keep it under ${max} characters`).optional(),
  );

/** Honeypot: real people never see or fill it. */
export const honeypotField = z.string().max(0).optional();
