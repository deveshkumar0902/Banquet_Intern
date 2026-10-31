import { Check } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Flourish } from '../../components/ui/Flourish.jsx';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';
import { Section } from '../../components/ui/Section.jsx';
import about from '../../content/about.json';
import home from '../../content/home.json';

export function AboutIntro() {
  const { intro } = home;
  return (
    <Section containerClassName="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative">
        <ResponsiveImage
          name={intro.image}
          alt={intro.imageAlt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-3 -bottom-3 -z-10 hidden h-full w-full rounded-[var(--radius-card)] border-2 border-gold-500 sm:block"
        />
      </div>
      <div>
        <p className="eyebrow flex items-center gap-3 text-clay-600">
          {intro.eyebrow} <Flourish />
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-clay-600">
          {intro.title}
        </h2>
        <p className="mt-4 text-lg text-ink-600">{intro.body}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {about.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex gap-2.5">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-clay-600" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <Button to={intro.cta.href} variant="outline" className="mt-8">
          {intro.cta.text}
        </Button>
      </div>
    </Section>
  );
}
