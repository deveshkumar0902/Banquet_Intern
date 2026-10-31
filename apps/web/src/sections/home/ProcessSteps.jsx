import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import steps from '../../content/process.json';

export function ProcessSteps() {
  return (
    <Section tone="sand">
      <SectionHeading eyebrow="How it works" title="From first call to final farewell" />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-clay-600 bg-white font-display text-xl font-semibold text-clay-600">
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink-900">{step.title}</h3>
            <p className="mt-2 text-ink-600">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
