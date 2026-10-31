import { cn } from '../../lib/cn.js';

const TONES = {
  clay: 'bg-clay-600 text-white',
  cream: 'bg-cream-100 text-clay-700 border border-cream-200',
  outline: 'border border-dashed border-clay-600 text-clay-700 bg-white',
};

export function Badge({ tone = 'cream', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Shown in development on content the owner hasn't verified (production hides those items). */
export function UnverifiedBadge({ verified, className }) {
  if (verified) return null;
  return (
    <Badge tone="outline" className={cn('mb-2', className)}>
      Sample: awaiting owner confirmation
    </Badge>
  );
}
