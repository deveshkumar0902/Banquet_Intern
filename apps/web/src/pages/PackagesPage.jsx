import { Check, Minus } from 'lucide-react';
import { Section } from '../components/ui/Section.jsx';
import packages from '../content/packages.json';
import { PackageCard } from '../sections/shared/PackageCard.jsx';
import { InnerPage } from './InnerPage.jsx';

const allInclusions = [...new Set(packages.items.flatMap((p) => p.inclusions))];

export default function PackagesPage() {
  return (
    <InnerPage
      page="packages"
      subtitle="Choose a starting point. We'll tailor the details and the quote to your event."
    >
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {packages.items.map((p) => (
            <PackageCard key={p.id} pkg={p} headingLevel={2} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-600">{packages.disclaimer}</p>
      </Section>

      <Section tone="sand" className="hidden lg:block" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="mb-8 text-center text-3xl font-semibold text-clay-600">
          Compare packages
        </h2>
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-cream-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50">
              <tr>
                <th scope="col" className="p-4 font-semibold">
                  What&apos;s included
                </th>
                {packages.items.map((p) => (
                  <th key={p.id} scope="col" className="p-4 font-semibold text-clay-600">
                    {p.title.replace(/ Package$/, '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {allInclusions.map((inc) => (
                <tr key={inc}>
                  <th scope="row" className="p-4 font-normal">
                    {inc}
                  </th>
                  {packages.items.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.inclusions.includes(inc) ? (
                        <Check aria-label="Included" className="h-5 w-5 text-clay-600" />
                      ) : (
                        <Minus aria-label="Not included" className="h-5 w-5 text-cream-200" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </InnerPage>
  );
}
