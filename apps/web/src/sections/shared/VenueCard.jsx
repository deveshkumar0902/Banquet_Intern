import { Users } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';
import { VENUE_TYPE_LABELS, capacityChips } from '../../lib/venues.js';

/** Venue card: photo with a cream title tab, capacity chips and a full-width CTA. */
export function VenueCard({ venue, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <Card as="article" lift className="relative flex h-full flex-col">
      <div className="relative aspect-[4/3]">
        <ResponsiveImage
          name={venue.images[0]}
          alt={venue.imageAlts[0] ?? ''}
          className="block h-full"
        />
        <Badge tone="clay" className="absolute top-3 left-3">
          {VENUE_TYPE_LABELS[venue.type]}
        </Badge>
        <div className="absolute bottom-0 left-0 rounded-tr-2xl bg-white px-5 pt-3 pb-1">
          <Heading className="text-xl font-semibold text-clay-600">
            <Link to={`/venues/${venue.slug}`} className="after:absolute after:inset-0">
              {venue.name}
            </Link>
          </Heading>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-3">
        <ul className="mb-3 flex flex-wrap gap-2" aria-label="Capacity">
          {capacityChips(venue.capacity).map((c) => (
            <li key={c}>
              <Badge>
                <Users aria-hidden="true" className="h-3.5 w-3.5" /> {c}
              </Badge>
            </li>
          ))}
        </ul>
        <p className="flex-1 text-ink-600">{venue.summary}</p>
        {/* The whole card is clickable through the heading link; this is just the visual cue. */}
        <span
          aria-hidden="true"
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-clay-600 px-5 py-2.5 font-semibold text-white"
        >
          View venue
        </span>
      </div>
    </Card>
  );
}
