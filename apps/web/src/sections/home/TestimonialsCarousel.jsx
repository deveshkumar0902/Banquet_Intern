import { Quote } from 'lucide-react';
import { UnverifiedBadge } from '../../components/ui/Badge.jsx';
import { Carousel } from '../../components/ui/Carousel.jsx';
import { RatingStars } from '../../components/ui/RatingStars.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import testimonials from '../../content/testimonials.json';
import { visibleItems } from '../../lib/content.js';

export function TestimonialsCarousel() {
  const items = visibleItems(testimonials);
  if (!items.length) return null;
  return (
    <Section tone="sand">
      <SectionHeading eyebrow="Kind words" title="What our guests say" />
      <Carousel
        label="Testimonials"
        autoplay={7000}
        slideClassName="basis-full md:basis-1/2 lg:basis-1/3"
        slides={items.map((t) => (
          <figure
            key={t.id}
            className="flex h-full flex-col rounded-[var(--radius-card)] border border-cream-200 bg-white p-6"
          >
            <UnverifiedBadge verified={t.verified} className="self-start" />
            <Quote aria-hidden="true" className="h-8 w-8 text-gold-500" />
            <blockquote className="mt-3 flex-1 text-lg text-ink-900">“{t.quote}”</blockquote>
            <RatingStars rating={t.rating} className="mt-4" />
            <figcaption className="mt-3">
              <span className="block font-semibold text-ink-900">{t.name}</span>
              <span className="text-sm text-ink-600">
                {t.eventType} · {t.eventDate}
              </span>
            </figcaption>
          </figure>
        ))}
      />
    </Section>
  );
}
