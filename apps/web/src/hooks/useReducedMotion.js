import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (cb) => {
  const mq = window.matchMedia?.(QUERY);
  mq?.addEventListener('change', cb);
  return () => mq?.removeEventListener('change', cb);
};
const getSnapshot = () => window.matchMedia?.(QUERY).matches ?? false;

/** True when the visitor asked the OS to minimise motion. */
export const useReducedMotion = () => useSyncExternalStore(subscribe, getSnapshot, () => false);
