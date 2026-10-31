import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeHtml } from './escapeHtml.js';

const TEMPLATES_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../templates/email');
const PLACEHOLDER = /\{\{\s*(\w+)\s*\}\}/g;
const cache = new Map();

function read(file) {
  if (!cache.has(file)) cache.set(file, readFileSync(path.join(TEMPLATES_DIR, file), 'utf8'));
  return cache.get(file);
}

/**
 * Replaces `{{key}}` placeholders. A placeholder without a value throws, so a typo in a
 * template fails loudly (and in tests) instead of mailing customers a literal `{{name}}`.
 */
function fill(template, vars, { escape, raw = {} }) {
  return template.replace(PLACEHOLDER, (_, key) => {
    if (key in raw) return raw[key];
    if (vars[key] === undefined || vars[key] === null) {
      throw new Error(`Missing template variable: ${key}`);
    }
    return escape ? escapeHtml(vars[key]) : String(vars[key]);
  });
}

/**
 * Renders `templates/email/<name>.html` inside `_layout.html`. Every value is HTML-escaped.
 * @param {string} name
 * @param {Record<string, unknown>} vars
 * @returns {string}
 */
export function renderTemplate(name, vars) {
  const content = fill(read(`${name}.html`), vars, { escape: true });
  return fill(read('_layout.html'), vars, { escape: true, raw: { content } });
}

/**
 * Renders the plain-text alternative `templates/email/<name>.txt` (no escaping).
 * @param {string} name
 * @param {Record<string, unknown>} vars
 */
export function renderText(name, vars) {
  return fill(read(`${name}.txt`), vars, { escape: false });
}
