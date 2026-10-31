import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config/env.js';

const prodEnv = {
  NODE_ENV: 'production',
  PORT: '8080',
  CORS_ORIGINS: 'https://example.github.io',
  DATABASE_PATH: '/var/data/app.db',
  SMTP_HOST: 'smtp.example.com',
  SMTP_USER: 'user',
  SMTP_PASS: 'pass',
  MAIL_FROM: 'Venue <no-reply@example.com>',
  OWNER_EMAIL: 'owner@example.com',
  ADMIN_TOKEN: 'x'.repeat(32),
  TRUST_PROXY: '1',
};

describe('loadConfig', () => {
  it('boots in development with an empty environment', () => {
    const c = loadConfig({});
    expect(c).toMatchObject({
      NODE_ENV: 'development',
      PORT: 4000,
      DATABASE_PATH: './data/app.db',
      TRUST_PROXY: false,
      LOG_LEVEL: 'debug',
    });
    expect(c.CORS_ORIGINS).toContain('http://localhost:5173');
    expect(c.ADMIN_TOKEN.length).toBeGreaterThanOrEqual(32);
    expect(c.warnings.join(' ')).toMatch(/ADMIN_TOKEN/);
  });

  it('accepts a complete production environment', () => {
    const c = loadConfig(prodEnv);
    expect(c).toMatchObject({ isProd: true, PORT: 8080, TRUST_PROXY: 1, LOG_LEVEL: 'info' });
    expect(c.CORS_ORIGINS).toEqual(['https://example.github.io']);
  });

  it('throws in production without ADMIN_TOKEN', () => {
    const { ADMIN_TOKEN: _t, ...env } = prodEnv;
    expect(() => loadConfig(env)).toThrow(/ADMIN_TOKEN/);
  });

  it('throws in production with a short ADMIN_TOKEN', () => {
    expect(() => loadConfig({ ...prodEnv, ADMIN_TOKEN: 'short' })).toThrow(/32/);
  });

  it('treats empty values as unset', () => {
    expect(loadConfig({ SMTP_HOST: '', PORT: '' }).PORT).toBe(4000);
  });

  it('rejects an invalid owner email', () => {
    expect(() => loadConfig({ OWNER_EMAIL: 'nope' })).toThrow(/OWNER_EMAIL/);
  });
});
