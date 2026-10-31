/**
 * Hides testimonials and stats the owner hasn't confirmed in production builds,
 * unless VITE_SHOW_UNVERIFIED=true. In development everything shows (with a badge).
 * @template {{ verified?: boolean }} T
 * @param {T[]} items
 * @param {{ prod?: boolean, showUnverified?: boolean }} [env]
 * @returns {T[]}
 */
export function visibleItems(
  items,
  {
    prod = import.meta.env.PROD,
    showUnverified = import.meta.env.VITE_SHOW_UNVERIFIED === 'true',
  } = {},
) {
  if (!prod || showUnverified) return items;
  return items.filter((i) => i.verified === true);
}

/** Three packages with the highlighted one in the middle. */
export function teaserPackages(items) {
  const highlighted = items.find((p) => p.highlight) ?? items[0];
  const others = items.filter((p) => p !== highlighted).slice(0, 2);
  return [others[0], highlighted, others[1]].filter(Boolean);
}
