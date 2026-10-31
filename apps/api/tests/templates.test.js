import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/escapeHtml.js';
import { renderTemplate, renderText } from '../src/utils/renderTemplate.js';
import { formatIst, whatsappDigits } from '../src/utils/format.js';

const vars = {
  brandName: 'Dev Marriage Hall',
  brandContact: 'Call us',
  subject: 'Hi',
  name: 'Asha',
  subjectLine: 'Visit',
  message: 'Hello "there" & <you>',
};

describe('renderTemplate', () => {
  it('fills {{key}} placeholders and wraps in the layout', () => {
    const html = renderTemplate('contact-customer', vars);
    expect(html).toContain('Thanks for getting in touch, Asha');
    expect(html).toContain('<!doctype html>');
    expect(html).not.toMatch(/\{\{/);
  });

  it('escapes every value', () => {
    const html = renderTemplate('contact-customer', vars);
    expect(html).toContain('Hello &quot;there&quot; &amp; &lt;you&gt;');
  });

  it('throws on a missing variable instead of leaving a placeholder', () => {
    expect(() => renderTemplate('contact-customer', { ...vars, name: undefined })).toThrow(
      /Missing template variable: name/,
    );
  });

  it('renders the plain-text alternative without escaping', () => {
    expect(renderText('contact-customer', vars)).toContain('Hello "there" & <you>');
  });
});

describe('utils', () => {
  it('escapeHtml escapes the five HTML characters', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });

  it('formatIst converts UTC to India time', () => {
    expect(formatIst('2026-01-01T20:00:00.000Z')).toBe('2026-01-02 01:30');
  });

  it.each([
    ['9876543210', '919876543210'],
    ['09876543210', '919876543210'],
    ['+919876543210', '919876543210'],
    ['+442079460958', '442079460958'],
  ])('whatsappDigits(%s) = %s', (input, out) => {
    expect(whatsappDigits(input)).toBe(out);
  });
});
