import { cn } from '../../lib/cn.js';

export function Card({ className, children, as: Tag = 'div', lift = false }) {
  return (
    <Tag
      className={cn(
        'overflow-hidden rounded-[var(--radius-card)] border border-cream-200 bg-white shadow-[var(--shadow-card)]',
        lift && 'lift',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
