import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, postJson } from '../src/lib/api.js';

afterEach(() => vi.unstubAllGlobals());

const respond = (status, body) =>
  vi.fn().mockResolvedValue({ ok: status < 400, status, json: async () => body });

describe('postJson', () => {
  it('posts JSON to a same-origin /api path by default', async () => {
    const fetchMock = respond(201, { id: 1 });
    vi.stubGlobal('fetch', fetchMock);
    await expect(postJson('/api/enquiries', { a: 1 })).resolves.toEqual({ id: 1 });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/enquiries');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ a: 1 });
  });

  it('throws ApiError with the server error shape', async () => {
    vi.stubGlobal(
      'fetch',
      respond(400, {
        error: { code: 'VALIDATION_ERROR', message: 'Bad', fields: { phone: 'Invalid' } },
      }),
    );
    const err = await postJson('/api/enquiries', {}).catch((e) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({
      status: 400,
      code: 'VALIDATION_ERROR',
      fields: { phone: 'Invalid' },
    });
  });

  it('turns network failures into NETWORK_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(postJson('/api/contact', {})).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
  });
});

// Regression for audit bugs #2 and #3: hard-coded localhost URLs and missing /api prefixes.
describe('API calls are centralised', () => {
  const srcDir = path.resolve(import.meta.dirname, '../src');
  const files = (dir) =>
    readdirSync(dir).flatMap((f) => {
      const p = path.join(dir, f);
      return statSync(p).isDirectory() ? files(p) : /\.(jsx?|mjs)$/.test(f) ? [p] : [];
    });

  it('only src/lib/api.js calls fetch()', () => {
    const offenders = files(srcDir).filter(
      (f) => !f.endsWith(path.join('lib', 'api.js')) && /\bfetch\(/.test(readFileSync(f, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('no source file hard-codes a localhost API URL (the site URL fallback is fine)', () => {
    const offenders = files(srcDir).filter((f) =>
      /localhost:(4000|5000)/.test(readFileSync(f, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('every postJson path starts with /api/', () => {
    const callers = files(srcDir).filter((f) =>
      /useSubmit\(|postJson\(/.test(readFileSync(f, 'utf8')),
    );
    expect(callers.length).toBeGreaterThan(0);
    for (const f of callers) {
      for (const [, p] of readFileSync(f, 'utf8').matchAll(/(?:path:\s*|postJson\()'(\/[^']*)'/g)) {
        expect(p.startsWith('/api/'), `${f}: ${p}`).toBe(true);
      }
    }
  });
});
