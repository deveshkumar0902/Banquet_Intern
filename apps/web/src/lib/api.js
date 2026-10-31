const TIMEOUT_MS = 15_000;

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, code?: string, fields?: Record<string, string> }} [info]
   */
  constructor(message, { status = 0, code = 'NETWORK_ERROR', fields } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

/** Absolute API URL for `path`. Empty VITE_API_URL means same origin (Vite proxies /api). */
export const apiUrl = (path) => `${import.meta.env.VITE_API_URL ?? ''}${path}`;

/**
 * POSTs JSON and returns the parsed response. Throws `ApiError` with the server's
 * `{ error: { code, message, fields } }`, or code NETWORK_ERROR / TIMEOUT.
 * This is the only place in the web app that calls `fetch`.
 * @param {string} path e.g. '/api/enquiries'
 * @param {unknown} body
 */
export async function postJson(path, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    throw err.name === 'AbortError'
      ? new ApiError('The request timed out.', { code: 'TIMEOUT' })
      : new ApiError('Could not reach the server.');
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = data?.error ?? {};
    throw new ApiError(e.message ?? `Request failed (${res.status})`, {
      status: res.status,
      code: e.code ?? 'HTTP_ERROR',
      fields: e.fields,
    });
  }
  return data;
}
