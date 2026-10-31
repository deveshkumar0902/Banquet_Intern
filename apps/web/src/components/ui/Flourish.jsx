import { cn } from '../../lib/cn.js';

/** Small decorative chevrons-and-dots mark used after section eyebrows. */
export function Flourish({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 12"
      className={cn('h-3 w-16 text-gold-500', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 6h22M18 1l6 5-6 5M12 1l6 5-6 5" />
      <circle cx="34" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="44" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="54" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
