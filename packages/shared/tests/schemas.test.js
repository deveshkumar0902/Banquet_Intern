import { describe, expect, it } from 'vitest';
import {
  contactSchema,
  enquirySchema,
  fieldErrors,
  normalizePhone,
  todayInIndia,
} from '../src/index.js';

const tomorrow = () => {
  const d = new Date(`${todayInIndia()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

const validEnquiry = () => ({
  name: 'Asha Verma',
  phone: '9876543210',
  email: 'asha@example.com',
  eventType: 'Wedding',
  eventDate: tomorrow(),
  guests: '250',
  venue: 'grand-ballroom',
  message: 'Evening reception',
});

const validContact = () => ({
  name: 'Asha Verma',
  phone: '+91 98765 43210',
  email: 'asha@example.com',
  subject: 'Site visit',
  message: 'Can we visit on Saturday morning?',
});

const errorsFor = (schema, data) => {
  const r = schema.safeParse(data);
  return r.success ? {} : fieldErrors(r.error);
};

describe('enquirySchema', () => {
  it('accepts a valid payload and normalises values', () => {
    const r = enquirySchema.parse(validEnquiry());
    expect(r.guests).toBe(250);
    expect(r.phone).toBe('9876543210');
  });

  it('accepts a minimal payload without email, venue or message', () => {
    const { email: _e, venue: _v, message: _m, ...rest } = validEnquiry();
    expect(enquirySchema.safeParse({ ...rest, email: '' }).success).toBe(true);
  });

  it('accepts today', () => {
    expect(enquirySchema.safeParse({ ...validEnquiry(), eventDate: todayInIndia() }).success).toBe(
      true,
    );
  });

  // Regression for audit bug #1: the old form sent `eventName` and no `eventDate`.
  it('rejects the legacy `eventName` key and reports the missing eventDate', () => {
    const { eventDate: _d, ...rest } = validEnquiry();
    const fields = errorsFor(enquirySchema, { ...rest, eventName: 'Wedding' });
    expect(fields).toHaveProperty('eventName');
    expect(fields).toHaveProperty('eventDate');
  });

  it('rejects past dates', () => {
    expect(errorsFor(enquirySchema, { ...validEnquiry(), eventDate: '2020-01-01' })).toHaveProperty(
      'eventDate',
    );
  });

  it.each([
    ['name', 'A'],
    ['phone', '12345'],
    ['email', 'not-an-email'],
    ['eventType', 'Party'],
    ['eventDate', '01/12/2030'],
    ['guests', 3],
    ['guests', 99999],
    ['guests', 12.5],
    ['message', 'x'.repeat(1001)],
    ['website', 'http://spam.example'],
  ])('reports a field-specific error for invalid %s', (field, value) => {
    const fields = errorsFor(enquirySchema, { ...validEnquiry(), [field]: value });
    expect(Object.keys(fields)).toEqual([field]);
  });
});

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    expect(contactSchema.safeParse(validContact()).success).toBe(true);
  });

  it('requires email here', () => {
    expect(errorsFor(contactSchema, { ...validContact(), email: '' })).toHaveProperty('email');
  });

  it.each([
    ['subject', 'x'],
    ['message', 'too short'],
    ['phone', 'abc'],
  ])('rejects invalid %s', (field, value) => {
    expect(Object.keys(errorsFor(contactSchema, { ...validContact(), [field]: value }))).toEqual([
      field,
    ]);
  });

  it('rejects unknown keys', () => {
    expect(errorsFor(contactSchema, { ...validContact(), foo: 1 })).toHaveProperty('foo');
  });
});

describe('phone numbers', () => {
  it.each(['9876543210', '+91 98765 43210', '098765-43210', '+44 20 7946 0958'])(
    'accepts %s',
    (phone) => {
      expect(enquirySchema.safeParse({ ...validEnquiry(), phone }).success).toBe(true);
    },
  );

  it.each(['12345', '98765', 'phone'])('rejects %s', (phone) => {
    expect(enquirySchema.safeParse({ ...validEnquiry(), phone }).success).toBe(false);
  });

  it('normalises spaces, dashes and brackets', () => {
    expect(normalizePhone(' (098) 765-43210 ')).toBe('09876543210');
  });
});
