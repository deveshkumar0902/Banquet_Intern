import { Check } from 'lucide-react';
import { ResponsiveImage } from '../components/ui/ResponsiveImage.jsx';
import { Section } from '../components/ui/Section.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import about from '../content/about.json';
import { gallery } from '../content/gallery.js';
import { InnerPage } from './InnerPage.jsx';

export default function AboutPage() {
  return (
    <InnerPage page="about" subtitle={about.hero.subtitle}>
      <Section containerClassName="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-clay-600">
            {about.story.title}
          </h2>
          <div className="mt-5 space-y-4 text-lg text-ink-600">
            {about.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <ResponsiveImage
          name={about.story.image}
          alt={about.story.imageAlt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] lg:aspect-[4/5]"
        />
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Highlights" title="What you can count on" />
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {about.highlights.map((h) => (
            <li key={h} className="flex gap-3 rounded-xl border border-cream-200 bg-white p-4">
              <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-clay-600" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our values" title="How we work" />
        <ul className="grid gap-6 md:grid-cols-3">
          {about.values.map((v) => (
            <li
              key={v.title}
              className="rounded-[var(--radius-card)] border border-cream-200 bg-white p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-clay-600">{v.title}</h3>
              <p className="mt-3 text-ink-600">{v.body}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-ink-600">
          {about.teamNote.replace(/\s*TODO\(owner\):.*$/, '')}
        </p>
      </Section>

      <section aria-label="Photos" className="grid grid-cols-2 sm:grid-cols-4">
        {gallery.slice(0, 4).map((g) => (
          <ResponsiveImage
            key={g.image}
            name={g.image}
            alt={g.alt}
            sizes="(min-width: 640px) 25vw, 50vw"
            className="block aspect-square"
          />
        ))}
      </section>
    </InnerPage>
  );
}
