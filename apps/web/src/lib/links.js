import { EVENT_TYPES } from '@banquet/shared';
import venues from '../content/venues.json';

/** Where "Enquire Now" goes: the hero form on Home, the contact page form elsewhere. */
export const enquireTarget = (pathname) => (pathname === '/' ? '/#enquiry' : '/contact#enquiry');

/** Enquiry form link with the event type pre-selected. */
export const quoteLink = (eventType) => `/contact?event=${encodeURIComponent(eventType)}#enquiry`;

/** Reads ?event= and ?venue= so CTAs elsewhere can pre-fill the enquiry form. */
export function prefillFromParams(params) {
  const event = params.get('event');
  const venue = params.get('venue');
  return {
    ...(EVENT_TYPES.includes(event) && { eventType: event }),
    ...(venues.some((v) => v.slug === venue) && { venue }),
  };
}
