import pino from 'pino';
import { vi } from 'vitest';
import { todayInIndia } from '@banquet/shared';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config/env.js';
import { openDb } from '../src/db/index.js';

export const ADMIN_TOKEN = 'test-admin-token-0123456789abcdef0123';

/** A fresh app with an in-memory DB and a fake mailer. */
export function setup({ env = {}, mailer } = {}) {
  const config = loadConfig({
    NODE_ENV: 'test',
    OWNER_EMAIL: 'owner@example.com',
    ADMIN_TOKEN,
    CORS_ORIGINS: 'http://localhost:5173',
    ...env,
  });
  const db = openDb(':memory:');
  const fakeMailer = mailer ?? { sendMail: vi.fn().mockResolvedValue({ messageId: 'x' }) };
  const app = createApp({ config, db, mailer: fakeMailer, logger: pino({ level: 'silent' }) });
  return { app, db, mailer: fakeMailer, config };
}

export const futureDate = (days = 30) => {
  const d = new Date(`${todayInIndia()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const validEnquiry = (overrides = {}) => ({
  name: 'Asha Verma',
  phone: '9876543210',
  email: 'asha@example.com',
  eventType: 'Wedding',
  eventDate: futureDate(),
  guests: 250,
  venue: 'grand-ballroom',
  message: 'Evening reception',
  sourcePage: '/',
  ...overrides,
});

export const validContact = (overrides = {}) => ({
  name: 'Ravi Kumar',
  phone: '+91 98765 43210',
  email: 'ravi@example.com',
  subject: 'Site visit',
  message: 'Can we visit on Saturday morning?',
  ...overrides,
});
