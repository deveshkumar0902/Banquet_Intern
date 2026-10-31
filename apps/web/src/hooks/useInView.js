import { useEffect, useRef, useState } from 'react';

/**
 * Becomes true once the element scrolls into view (and stays true).
 * @param {IntersectionObserverInit} [options]
 */
export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  // Without IntersectionObserver (very old browsers) just treat everything as visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // options is expected to be stable for the component's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}
