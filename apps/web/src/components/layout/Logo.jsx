import { Link } from 'react-router';
import { site } from '../../content/site.js';
import { cn } from '../../lib/cn.js';

/** Wordmark: a small lotus-bud mark with the brand name set in the display serif. */
export function Logo({ light, className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5',
        light ? 'text-cream-50' : 'text-clay-700',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-9 w-9 shrink-0">
        <rect width="32" height="32" rx="8" className={light ? 'fill-gold-400' : 'fill-clay-600'} />
        <path
          d="M16 6c2.6 3.6 2.6 6.6 0 9.6-2.6-3-2.6-6 0-9.6z"
          className={light ? 'fill-clay-900' : 'fill-gold-400'}
        />
        <path
          d="M8 16c3.4.4 6 2.4 8 6 2-3.6 4.6-5.6 8-6-1 4.6-4 7.6-8 8.4C12 23.6 9 20.6 8 16z"
          className={light ? 'fill-clay-900' : 'fill-white'}
        />
      </svg>
      <span className="font-display text-lg leading-tight font-semibold sm:text-xl">
        {site.name}
      </span>
    </Link>
  );
}
