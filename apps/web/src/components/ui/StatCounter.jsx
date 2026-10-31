import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { formatNumber } from '../../lib/format.js';

const DURATION = 1600;

/** Counts up to `value` once visible. Reduced motion shows the final number straight away. */
export function StatCounter({ value, suffix = '', label }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  const display = reduced ? value : shown;
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-semibold text-gold-400 sm:text-5xl">
        <span aria-hidden="true">
          {formatNumber(display)}
          {suffix}
        </span>
        <span className="sr-only">
          {formatNumber(value)}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm tracking-wide text-cream-100 uppercase">{label}</p>
    </div>
  );
}
