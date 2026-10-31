import { randomBytes } from 'node:crypto';
import { z } from 'zod';

const bool = z
  .union([z.boolean(), z.string()])
  .transform((v) => v === true || ['true', '1', 'yes'].includes(String(v).toLowerCase()));

const csv = z.string().transform((v) =>
  v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
);

/** 'false' → false, 'true' → true, '1' → 1 (hops), anything else (e.g. 'loopback') as is. */
const trustProxy = z.string().transform((v) => {
  if (['false', '0', ''].includes(v)) return false;
  if (v === 'true') return true;
  return /^\d+$/.test(v) ? Number(v) : v;
});

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().optional(),
  CORS_ORIGINS: csv.optional(),
  DATABASE_PATH: z.string().min(1).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: bool.default(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().min(3).optional(),
  OWNER_EMAIL: z.email().optional(),
  ADMIN_TOKEN: z.string().optional(),
  TRUST_PROXY: trustProxy.default(false),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).optional(),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  BRAND_NAME: z.string().default('Dev Marriage Hall'),
  BRAND_PHONE: z.string().default(''),
  BRAND_ADDRESS: z.string().default(''),
});

const REQUIRED_IN_PRODUCTION = [
  'PORT',
  'CORS_ORIGINS',
  'DATABASE_PATH',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_FROM',
  'OWNER_EMAIL',
  'ADMIN_TOKEN',
];

/**
 * Validates `env` and fills development defaults. In production every required key must be set,
 * so a misconfigured deploy fails at boot instead of silently dropping enquiries.
 * @param {Record<string, string | undefined>} [env]
 */
export function loadConfig(env = process.env) {
  // Treat empty strings like unset, which is what `KEY=` in a .env file means.
  const cleaned = Object.fromEntries(Object.entries(env).filter(([, v]) => v !== ''));
  const parsed = schema.safeParse(cleaned);
  if (!parsed.success) {
    const lines = parsed.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`);
    throw new Error(`Invalid environment configuration:\n${lines.join('\n')}`);
  }
  const c = parsed.data;
  const isProd = c.NODE_ENV === 'production';
  const warnings = [];

  if (isProd) {
    const missing = REQUIRED_IN_PRODUCTION.filter(
      (k) => c[k] === undefined || (Array.isArray(c[k]) && !c[k].length),
    );
    if (missing.length) {
      throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
    }
    if (c.ADMIN_TOKEN.length < 32) throw new Error('ADMIN_TOKEN must be at least 32 characters');
  }

  let adminToken = c.ADMIN_TOKEN;
  if (!adminToken) {
    adminToken = randomBytes(24).toString('hex');
    warnings.push('ADMIN_TOKEN not set: generated a random one for this run (admin export only).');
  }
  if (!c.SMTP_HOST && !isProd) {
    warnings.push('SMTP_HOST not set: emails are logged to the console instead of being sent.');
  }

  return Object.freeze({
    ...c,
    isProd,
    PORT: c.PORT ?? 4000,
    CORS_ORIGINS: c.CORS_ORIGINS ?? ['http://localhost:5173', 'http://localhost:4173'],
    DATABASE_PATH: c.DATABASE_PATH ?? './data/app.db',
    MAIL_FROM: c.MAIL_FROM ?? `${c.BRAND_NAME} <no-reply@localhost>`,
    OWNER_EMAIL: c.OWNER_EMAIL ?? (isProd ? undefined : 'owner@localhost'),
    ADMIN_TOKEN: adminToken,
    LOG_LEVEL: c.LOG_LEVEL ?? (isProd ? 'info' : c.NODE_ENV === 'test' ? 'silent' : 'debug'),
    warnings,
  });
}
