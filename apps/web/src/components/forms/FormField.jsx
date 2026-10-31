import { cn } from '../../lib/cn.js';

const control =
  'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-ink-900 placeholder:text-ink-600/70 ' +
  'focus:border-clay-600 focus:ring-2 focus:ring-clay-600/25 focus:outline-none';

/**
 * Label + control + error message, wired with aria-invalid / aria-describedby.
 * @param {{ name: string, label: string, register: Function, error?: { message?: string },
 *   as?: 'input' | 'select' | 'textarea', options?: { value: string, label: string }[],
 *   required?: boolean, hint?: string, idPrefix?: string, className?: string } & Record<string, unknown>} props
 */
export function FormField({
  name,
  label,
  register,
  error,
  as = 'input',
  options = [],
  required,
  hint,
  idPrefix = 'f',
  className,
  ...rest
}) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  const props = {
    id,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': describedBy,
    'aria-required': required ? 'true' : undefined,
    className: cn(control, error ? 'border-red-700' : 'border-cream-200'),
    ...register(name),
    ...rest,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-clay-600">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-600"> (optional)</span>
        )}
      </label>
      {as === 'select' ? (
        <select {...props}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea rows={4} {...props} />
      ) : (
        <input {...props} />
      )}
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-ink-600">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={errorId} className="mt-1 text-sm text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}

/** Visually hidden field that only bots fill in. */
export function Honeypot({ register }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </label>
    </div>
  );
}
