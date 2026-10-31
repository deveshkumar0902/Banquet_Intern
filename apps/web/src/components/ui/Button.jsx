import { Link } from 'react-router';
import { cn } from '../../lib/cn.js';

const VARIANTS = {
  primary: 'bg-clay-600 text-white hover:bg-clay-700 shadow-sm',
  outline: 'border border-clay-600 text-clay-600 hover:bg-clay-600 hover:text-white',
  ghost: 'text-clay-600 hover:bg-cream-100',
  light: 'border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-clay-900 on-dark',
  white: 'bg-white text-clay-700 hover:bg-cream-100 shadow-sm',
};
const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
};

/**
 * Renders a router <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 * @param {{ variant?: keyof VARIANTS, size?: keyof SIZES, to?: string | object, href?: string,
 *   className?: string, children: React.ReactNode } & Record<string, unknown>} props
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  if (to !== undefined) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href !== undefined) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
