// Zod schemas for every content file. tests/content.test.js validates the real files against
// these, so a typo in JSON fails the build instead of breaking a page.
import { z } from 'zod';
import { EVENT_TYPES } from '@banquet/shared';
import { ICONS } from '../lib/icons.js';
import { GALLERY_CATEGORIES } from './gallery.js';

const text = z.string().trim().min(1);
const imageName = z
  .string()
  .regex(/^[a-z]+\/[a-z0-9-]+\.(jpg|jpeg|png)$/, 'kebab-case path under assets/images');
const link = z.object({ text, href: z.string().startsWith('/') });
const icon = z.enum(Object.keys(ICONS));
const eventType = z.enum(EVENT_TYPES);

export const homeSchema = z.strictObject({
  hero: z.strictObject({
    eyebrow: text,
    title: text,
    subtitle: text,
    image: imageName,
    imageAlt: text,
    primaryCta: link,
    formTitle: text,
    formSubtitle: text,
  }),
  intro: z.strictObject({
    eyebrow: text,
    title: text,
    body: text,
    image: imageName,
    imageAlt: text,
    cta: link,
  }),
});

export const aboutSchema = z.strictObject({
  hero: z.strictObject({ title: text, subtitle: text }),
  story: z.strictObject({
    title: text,
    paragraphs: z.array(text).min(1),
    image: imageName,
    imageAlt: text,
  }),
  highlights: z.array(text).min(1),
  values: z.array(z.strictObject({ title: text, body: text })),
  teamNote: text,
});

export const venueSchema = z
  .strictObject({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: text,
    type: z.enum(['indoor', 'lawn', 'terrace']),
    capacity: z.strictObject({
      seated: z.number().int().positive().nullable(),
      floating: z.number().int().positive().nullable(),
    }),
    capacityNote: z.string().optional(),
    area: text,
    summary: text,
    description: text,
    features: z.array(text).min(1),
    idealFor: z.array(eventType).min(1),
    images: z.array(imageName),
    imageAlts: z.array(text),
  })
  .refine((v) => v.images.length === v.imageAlts.length, 'every image needs an alt text')
  .refine((v) => v.capacity.seated || v.capacity.floating, 'at least one capacity figure');
export const venuesSchema = z.array(venueSchema).min(1);

export const servicesSchema = z.array(
  z.strictObject({
    id: z.string().regex(/^[a-z0-9-]+$/),
    title: text,
    icon,
    eventType,
    summary: text,
    body: text,
    image: imageName,
  }),
);

export const packagesSchema = z.strictObject({
  disclaimer: text,
  items: z
    .array(
      z.strictObject({
        id: z.string().regex(/^[a-z0-9-]+$/),
        title: text,
        tagline: text,
        inclusions: z.array(text).min(1),
        pricing: text,
        priceFrom: z.number().int().positive().optional(),
        ctaText: text,
        eventType,
        highlight: z.boolean().optional(),
      }),
    )
    .min(1),
});

export const ctaSchema = z.strictObject({
  heading: text,
  subheading: text,
  body: text,
  primaryCta: link,
});

export const testimonialsSchema = z.array(
  z.strictObject({
    id: text,
    name: text,
    eventType: text,
    eventDate: text,
    rating: z.number().int().min(1).max(5),
    quote: text,
    verified: z.boolean(),
  }),
);

export const statsSchema = z.array(
  z.strictObject({
    id: text,
    label: text,
    value: z.number().nonnegative(),
    suffix: z.string(),
    verified: z.boolean(),
  }),
);

export const faqsSchema = z.array(
  z.strictObject({
    id: z.string().regex(/^[a-z0-9-]+$/),
    category: text,
    question: text,
    answer: text,
    top: z.boolean(),
  }),
);

export const processSchema = z.array(z.strictObject({ title: text, body: text })).length(4);

export const whyUsSchema = z.array(z.strictObject({ icon, title: text, body: text })).length(6);

export const gallerySchema = z.array(
  z.strictObject({ image: imageName, alt: text, category: z.enum(GALLERY_CATEGORIES) }),
);
