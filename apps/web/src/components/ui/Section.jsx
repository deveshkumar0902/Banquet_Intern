import { cn } from '../../lib/cn.js';
import { Container } from './Container.jsx';

const TONES = {
  cream: 'bg-cream-50',
  sand: 'bg-cream-100',
  dark: 'bg-clay-900 text-cream-50 on-dark',
};

/** A full-width band with consistent vertical rhythm and a centred container. */
export function Section({ tone = 'cream', id, className, containerClassName, children, ...rest }) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24', TONES[tone], className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
