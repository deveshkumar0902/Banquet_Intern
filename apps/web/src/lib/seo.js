import { site } from '../content/site.js';

const siteUrl = () => (import.meta.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');

/** 'About Us' → 'About Us | Dev Marriage Hall' (plus ', City' once the owner sets it) */
export const pageTitle = (page) => {
  const brand = site.address.city ? `${site.name}, ${site.address.city}` : site.name;
  return page ? `${page} | ${brand}` : `${brand} | Banquet Hall & Wedding Venue`;
};

/** Absolute canonical URL for a router path, including the deploy base path. */
export const canonicalUrl = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${siteUrl()}${base}${path === '/' ? '/' : path}`;
};

export const absoluteAsset = (file) => `${siteUrl()}${import.meta.env.BASE_URL}${file}`;

/** schema.org EventVenue for the home page. Empty facts are left out rather than guessed. */
export function venueJsonLd() {
  const a = site.address;
  const hasAddress = a.street || a.city;
  return {
    '@context': 'https://schema.org',
    '@type': ['EventVenue', 'LocalBusiness'],
    name: site.name,
    description: site.seo.description,
    url: canonicalUrl('/'),
    image: absoluteAsset('og-image.jpg'),
    ...(site.phone && { telephone: site.phone }),
    ...(site.email && { email: site.email }),
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: a.street,
        addressLocality: a.city,
        addressRegion: a.region,
        postalCode: a.postalCode,
        addressCountry: a.country,
      },
    }),
    ...(site.geo && { geo: { '@type': 'GeoCoordinates', ...site.geo } }),
    ...(site.openingHoursSpec && { openingHours: site.openingHoursSpec }),
    ...(Object.values(site.socials).some(Boolean) && {
      sameAs: Object.values(site.socials).filter(Boolean),
    }),
  };
}

/** schema.org FAQPage */
export const faqJsonLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});
