import { Check } from 'lucide-react';
import { Badge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { cn } from '../../lib/cn.js';
import { formatINR } from '../../lib/format.js';
import { quoteLink } from '../../lib/links.js';

/** Owner-approved layout: title → tagline → What's Included → Pricing → Get a Custom Quote. */
export function PackageCard({ pkg, compact = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <Card
      as="article"
      lift
      className={cn('flex h-full flex-col p-6 sm:p-7', pkg.highlight && 'border-2 border-clay-600')}
    >
      {pkg.highlight && (
        <Badge tone="clay" className="mb-3 self-start">
          Most requested
        </Badge>
      )}
      <Heading className="text-2xl font-semibold text-clay-600">{pkg.title}</Heading>
      <p className="mt-2 text-ink-600">{pkg.tagline}</p>

      <p className="mt-6 font-sans text-sm font-semibold tracking-[0.14em] text-ink-900 uppercase">
        What&apos;s Included
      </p>
      <ul className="mt-3 flex-1 space-y-2">
        {(compact ? pkg.inclusions.slice(0, 4) : pkg.inclusions).map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-clay-600" />
            <span>{item}</span>
          </li>
        ))}
        {compact && pkg.inclusions.length > 4 && (
          <li className="pl-6.5 text-sm text-ink-600">+ {pkg.inclusions.length - 4} more</li>
        )}
      </ul>

      <p className="mt-6 font-sans text-sm font-semibold tracking-[0.14em] text-ink-900 uppercase">
        Pricing
      </p>
      <p className="mt-2 text-ink-600">
        {pkg.priceFrom ? (
          <>
            Starting from <strong className="text-ink-900">{formatINR(pkg.priceFrom)}</strong>
          </>
        ) : (
          pkg.pricing
        )}
      </p>

      <Button
        to={quoteLink(pkg.eventType)}
        className="mt-6 w-full"
        variant={pkg.highlight ? 'primary' : 'outline'}
      >
        {pkg.ctaText}
      </Button>
    </Card>
  );
}
