import { Button } from '../../components/ui/Button.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import venues from '../../content/venues.json';
import { VenueCard } from '../shared/VenueCard.jsx';

export function VenuesGrid() {
  return (
    <Section tone="sand" id="venues">
      <SectionHeading
        eyebrow="Our venues"
        title="Find the right space for your celebration"
        subtitle="Two elegant indoor halls and an open-air lawn, each set up around the way you want to celebrate."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((v) => (
          <VenueCard key={v.slug} venue={v} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button to="/venues" variant="outline">
          Compare all venues
        </Button>
      </div>
    </Section>
  );
}
