import { useState } from 'react';
import { Section } from '../components/ui/Section.jsx';
import venues from '../content/venues.json';
import { cn } from '../lib/cn.js';
import { VENUE_TYPE_LABELS } from '../lib/venues.js';
import { VenueCard } from '../sections/shared/VenueCard.jsx';
import { InnerPage } from './InnerPage.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  ...[...new Set(venues.map((v) => v.type))].map((t) => ({ id: t, label: VENUE_TYPE_LABELS[t] })),
];

export default function VenuesPage() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? venues : venues.filter((v) => v.type === filter);
  return (
    <InnerPage
      page="venues"
      subtitle="Indoor halls and an open-air lawn for gatherings of every size."
    >
      <Section>
        <div role="group" aria-label="Filter venues" className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                filter === f.id
                  ? 'border-clay-600 bg-clay-600 text-white'
                  : 'border-cream-200 bg-white text-ink-900 hover:border-clay-600',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} venue{shown.length === 1 ? '' : 's'}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((v) => (
            <VenueCard key={v.slug} venue={v} headingLevel={2} />
          ))}
        </div>
      </Section>
    </InnerPage>
  );
}
