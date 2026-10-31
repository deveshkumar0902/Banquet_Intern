import { AlertCircle, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { telLink, whatsappLink } from '../../content/site.js';

export function ErrorSummary({ message }) {
  if (!message) return null;
  const tel = telLink();
  const wa = whatsappLink();
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
    >
      <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p>{message}</p>
        {(tel || wa) && (
          <p className="mt-1 flex flex-wrap gap-x-4">
            {tel && (
              <a href={tel} className="inline-flex items-center gap-1 font-semibold underline">
                <Phone aria-hidden="true" className="h-4 w-4" /> Call us
              </a>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold underline"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp us
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export function SuccessPanel({ title, children, onReset, resetText }) {
  return (
    <div
      role="status"
      className="rounded-[var(--radius-card)] border border-green-200 bg-green-50 p-6 text-center"
    >
      <CheckCircle2 aria-hidden="true" className="mx-auto h-10 w-10 text-green-700" />
      <p className="mt-3 font-display text-xl font-semibold text-ink-900">{title}</p>
      <p className="mt-2 text-ink-600">{children}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-semibold text-clay-600 underline underline-offset-4"
      >
        {resetText}
      </button>
    </div>
  );
}
