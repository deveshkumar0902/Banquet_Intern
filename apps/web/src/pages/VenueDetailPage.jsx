import { Check, Users } from 'lucide-react';
import { useParams } from 'react-router';
import { EnquiryForm } from '../components/forms/EnquiryForm.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Carousel } from '../components/ui/Carousel.jsx';
import { ResponsiveImage } from '../components/ui/ResponsiveImage.jsx';
import { Section } from '../components/ui/Section.jsx';
import venues from '../content/venues.json';
import { formatNumber } from '../lib/format.js';
import { VENUE_TYPE_LABELS } from '../lib/venues.js';
import { VenueCard } from '../sections/shared/VenueCard.jsx';
import { InnerPage } from './InnerPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function VenueDetailPage() {
  const { slug } = useParams();
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) return <NotFoundPage />;
  const others = venues.filter((v) => v !== venue);
  const photos = venue.images.length ? venue.images : [null];

  return (
    <InnerPage
      page="venueDetail"
      title={venue.name}
      subtitle={venue.summary}
      image={venue.images[0]}
      crumbs={[{ label: 'Venues', to: '/venues' }]}
      seo={{
        title: venue.name,
        description: `${venue.summary} ${venue.description}`.slice(0, 160),
        path: `/venues/${venue.slug}`,
      }}
    >
      <Section containerClassName="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-12">
        <div className="min-w-0">
          <Carousel
            label={`${venue.name} photos`}
            slides={photos.map((img, i) => (
              <ResponsiveImage
                key={img ?? i}
                name={img}
                alt={venue.imageAlts[i] ?? ''}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="block aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]"
              />
            ))}
          />

          <h2 className="mt-10 text-3xl font-semibold text-clay-600">About {venue.name}</h2>
          <p className="mt-4 text-lg text-ink-600">{venue.description}</p>

          <h2 className="mt-10 text-2xl font-semibold text-clay-600">Capacity</h2>
          <table className="mt-4 w-full max-w-md text-left">
            <caption className="sr-only">Capacity of {venue.name}</caption>
            <tbody className="divide-y divide-cream-200 border-y border-cream-200">
              <tr>
                <th scope="row" className="py-3 font-medium">
                  Type
                </th>
                <td className="py-3 text-ink-600">{VENUE_TYPE_LABELS[venue.type]}</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 font-medium">
                  Seated
                </th>
                <td className="py-3 text-ink-600">
                  {venue.capacity.seated
                    ? `${formatNumber(venue.capacity.seated)} guests`
                    : 'On request'}
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-3 font-medium">
                  Floating
                </th>
                <td className="py-3 text-ink-600">
                  {venue.capacity.floating
                    ? `${formatNumber(venue.capacity.floating)} guests`
                    : 'On request'}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-clay-600">Features</h2>
              <ul className="mt-4 space-y-2">
                {venue.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-clay-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-clay-600">Ideal for</h2>
              <ul className="mt-4 space-y-2">
                {venue.idealFor.map((e) => (
                  <li key={e} className="flex gap-2.5">
                    <Users aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-clay-600" /> {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside aria-labelledby="availability-heading" className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5 sm:p-6">
            <h2 id="availability-heading" className="text-2xl font-semibold text-clay-600">
              Check availability
            </h2>
            <p className="mt-1 mb-5 text-sm text-ink-600">We’ll call you within 24 hours.</p>
            <EnquiryForm
              variant="card"
              idPrefix="venue"
              defaultValues={{ venue: venue.slug, eventType: venue.idealFor[0] }}
            />
          </Card>
        </aside>
      </Section>

      <Section tone="sand">
        <h2 className="mb-8 text-center text-3xl font-semibold text-clay-600">Other venues</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {others.map((v) => (
            <VenueCard key={v.slug} venue={v} />
          ))}
        </div>
      </Section>
    </InnerPage>
  );
}
