// Business facts used across the site. Empty strings are hidden in the UI, never guessed.
// Every TODO(owner) below is listed in docs/REBUILD_REPORT.md.
export const site = {
  name: 'Dev Marriage Hall',
  tagline: 'Celebrations that feel like home',
  phone: '', // TODO(owner): main phone number, e.g. '+91 98xxx xxxxx'
  whatsapp: '', // TODO(owner): WhatsApp number (defaults to phone when empty)
  email: '', // TODO(owner): public email address
  address: {
    street: '', // TODO(owner): street address
    city: '', // TODO(owner): city
    region: '', // TODO(owner): state
    postalCode: '', // TODO(owner): PIN code
    country: 'IN',
  },
  hours: [], // TODO(owner): e.g. [{ days: 'Monday – Sunday', time: '10:00 am – 8:00 pm' }]
  openingHoursSpec: '', // TODO(owner): schema.org format, e.g. 'Mo-Su 10:00-20:00'
  geo: null, // TODO(owner): { latitude: 28.61, longitude: 77.2 }
  mapEmbedUrl: '', // TODO(owner): Google Maps "Embed a map" src URL
  socials: {
    instagram: '', // TODO(owner)
    facebook: '', // TODO(owner)
    youtube: '', // TODO(owner)
  },
  seo: {
    description:
      'Dev Marriage Hall is a banquet hall and wedding venue for weddings, receptions, engagements, birthdays and corporate events, with flexible halls, catering support and a team that handles the details.',
  },
};

export const whatsappNumber = () => site.whatsapp || site.phone;

/** 'https://wa.me/919876543210?text=…' or '' when no number is configured. */
export function whatsappLink(text = `Hi ${site.name}, I'd like to enquire about an event.`) {
  const digits = whatsappNumber().replace(/\D/g, '');
  if (!digits) return '';
  const full = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
}

export const telLink = () => (site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : '');

/** One-line address, or '' if the owner hasn't filled it in. */
export const addressLine = () =>
  [site.address.street, site.address.city, site.address.region, site.address.postalCode]
    .filter(Boolean)
    .join(', ');
