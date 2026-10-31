import { describe, expect, it } from 'vitest';
import about from '../src/content/about.json';
import cta from '../src/content/cta.json';
import faqs from '../src/content/faqs.json';
import { gallery } from '../src/content/gallery.js';
import home from '../src/content/home.json';
import packages from '../src/content/packages.json';
import process from '../src/content/process.json';
import services from '../src/content/services.json';
import stats from '../src/content/stats.json';
import testimonials from '../src/content/testimonials.json';
import venues from '../src/content/venues.json';
import whyUs from '../src/content/why-us.json';
import * as s from '../src/content/schema.js';
import { images } from '../src/lib/images.js';
import { visibleItems } from '../src/lib/content.js';

describe('content files match their schemas', () => {
  it.each([
    ['home.json', s.homeSchema, home],
    ['about.json', s.aboutSchema, about],
    ['venues.json', s.venuesSchema, venues],
    ['services.json', s.servicesSchema, services],
    ['packages.json', s.packagesSchema, packages],
    ['cta.json', s.ctaSchema, cta],
    ['testimonials.json', s.testimonialsSchema, testimonials],
    ['stats.json', s.statsSchema, stats],
    ['faqs.json', s.faqsSchema, faqs],
    ['process.json', s.processSchema, process],
    ['why-us.json', s.whyUsSchema, whyUs],
    ['gallery.js', s.gallerySchema, gallery],
  ])('%s', (_name, schema, data) => {
    const r = schema.safeParse(data);
    expect(r.success, r.success ? '' : JSON.stringify(r.error.issues, null, 2)).toBe(true);
  });
});

describe('content integrity', () => {
  it('venue slugs are unique', () => {
    const slugs = venues.map((v) => v.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('ids are unique within each list', () => {
    for (const list of [services, packages.items, faqs, testimonials, stats]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('every referenced image exists in src/assets/images', () => {
    const referenced = [
      home.hero.image,
      home.intro.image,
      about.story.image,
      ...venues.flatMap((v) => v.images),
      ...services.map((x) => x.image),
      ...gallery.map((g) => g.image),
    ];
    const missing = referenced.filter((name) => !images[name]);
    expect(missing).toEqual([]);
  });

  it('every testimonial and stat carries an explicit verified flag', () => {
    for (const item of [...testimonials, ...stats]) expect(typeof item.verified).toBe('boolean');
  });
});

// Owner-approved copy (REBUILD_PLAN Appendix F) must not drift.
describe('owner-approved copy', () => {
  it('packages appear in the approved order with the approved titles', () => {
    expect(packages.items.map((p) => p.title)).toEqual([
      'Wedding Celebration Package',
      'Engagement & Ring Ceremony Package',
      'Birthday & Anniversary Package',
      'Corporate Event Package',
    ]);
  });

  it('Birthday & Anniversary and Corporate packages are word for word', () => {
    const byId = Object.fromEntries(packages.items.map((p) => [p.id, p]));
    expect(byId['birthday-anniversary']).toMatchObject({
      tagline:
        'Celebrate milestones in style with customized arrangements and a vibrant atmosphere.',
      inclusions: [
        'Theme-based decoration options',
        'Stage and cake area setup',
        'Music and entertainment arrangements',
        'Guest seating',
        'Catering support',
        'Event assistance',
      ],
      pricing: 'Packages available based on event size.',
      ctaText: 'Get a Custom Quote',
      eventType: 'Birthday',
    });
    expect(byId.corporate).toMatchObject({
      tagline:
        'Professional venue arrangements for meetings, conferences, and business gatherings.',
      inclusions: [
        'Conference-style seating',
        'Audio system support',
        'Presentation area',
        'Refreshment and catering options',
        'Dedicated event management support',
        'Parking facilities',
      ],
      pricing: 'Contact us for corporate pricing.',
      ctaText: 'Get a Custom Quote',
      eventType: 'Corporate Event',
    });
    expect(byId.wedding.pricing).toBe(
      'Contact us for a customized quotation based on guest count and event requirements.',
    );
    expect(byId.engagement.pricing).toBe('Contact us for a personalized quote.');
  });

  it('CTA band is word for word', () => {
    expect(cta).toEqual({
      heading: 'Ready to Plan Your Event?',
      subheading: 'Every celebration deserves the right venue.',
      body: "Whether you're planning a wedding, engagement, birthday, anniversary, or corporate gathering, our team is ready to help bring your event to life.",
      primaryCta: { text: 'Enquire Now', href: '/contact#enquiry' },
    });
  });

  it('unconfirmed tiered prices (₹15,000 etc.) are not shown', () => {
    expect(packages.items.some((p) => p.priceFrom)).toBe(false);
  });
});

describe('visibleItems', () => {
  const items = [
    { id: 1, verified: true },
    { id: 2, verified: false },
  ];
  it('hides unverified items in production', () => {
    expect(visibleItems(items, { prod: true, showUnverified: false })).toEqual([items[0]]);
  });
  it('shows them with VITE_SHOW_UNVERIFIED=true', () => {
    expect(visibleItems(items, { prod: true, showUnverified: true })).toHaveLength(2);
  });
  it('shows everything in development', () => {
    expect(visibleItems(items, { prod: false })).toHaveLength(2);
  });
});
