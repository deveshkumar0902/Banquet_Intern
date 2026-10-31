const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes a value for safe use in HTML text and attribute values. */
export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => MAP[ch]);
