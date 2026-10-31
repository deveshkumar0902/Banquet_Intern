import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import whyUs from '../../content/why-us.json';
import { ICONS } from '../../lib/icons.js';

export function WhyChooseUs() {
  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow="Why families choose us"
        title="Everything handled, nothing overlooked"
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.title}
              className="rounded-[var(--radius-card)] border border-cream-200 bg-white p-6"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-100">
                <Icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 text-clay-600" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-ink-600">{item.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
