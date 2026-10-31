import { formatNumber } from './format.js';

export const VENUE_TYPE_LABELS = { indoor: 'Indoor hall', lawn: 'Lawn', terrace: 'Terrace' };

export function capacityChips(capacity) {
  return [
    capacity.seated && `${formatNumber(capacity.seated)} seated`,
    capacity.floating && `${formatNumber(capacity.floating)} floating`,
  ].filter(Boolean);
}
