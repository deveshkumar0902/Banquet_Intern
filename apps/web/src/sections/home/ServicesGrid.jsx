import { Link } from 'react-router';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import services from '../../content/services.json';
import { ICONS } from '../../lib/icons.js';

/** Event types as photo tiles with the label over a dark gradient. */
export function ServicesGrid() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Events we host"
        title="Every occasion, beautifully hosted"
        subtitle="From the first ceremony to the last dance, we've hosted it all."
      />
      <ul className="grid gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.id}>
              <Link
                to={`/services#${s.id}`}
                className="group relative block aspect-[16/9] min-[480px]:aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
              >
                <ResponsiveImage
                  name={s.image}
                  alt=""
                  className="block h-full"
                  imgClassName="transition duration-500 motion-safe:group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 font-display text-base font-semibold text-white sm:text-lg">
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-gold-400" />
                  {s.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
