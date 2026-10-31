import { cn } from '../../lib/cn.js';
import { Flourish } from './Flourish.jsx';

/**
 * Eyebrow + title + subtitle. `as` sets the heading level (h2 by default; exactly one h1 per page).
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  dark,
  className,
}) {
  const centred = align === 'center';
  return (
    <div className={cn('mb-10 max-w-3xl sm:mb-12', centred && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-3 flex items-center gap-3',
            centred && 'justify-center',
            dark ? 'text-gold-400' : 'text-clay-600',
          )}
        >
          {eyebrow}
          <Flourish />
        </p>
      )}
      <Tag
        className={cn(
          'text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold',
          dark ? 'text-cream-50' : 'text-clay-600',
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={cn('mt-4 text-lg', dark ? 'text-cream-100' : 'text-ink-600')}>{subtitle}</p>
      )}
    </div>
  );
}
