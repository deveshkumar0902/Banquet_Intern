import { Button } from '../../components/ui/Button.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import packages from '../../content/packages.json';
import { teaserPackages } from '../../lib/content.js';
import { PackageCard } from '../shared/PackageCard.jsx';

export function PackagesTeaser() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Packages"
        title="Packages for every celebration"
        subtitle="Start with a package, then make it yours. Every quote is tailored to your guest count and plans."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {teaserPackages(packages.items).map((p) => (
          <PackageCard key={p.id} pkg={p} compact />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button to="/packages" variant="outline">
          View all packages
        </Button>
      </div>
    </Section>
  );
}
