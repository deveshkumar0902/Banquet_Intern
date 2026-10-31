import { useState } from 'react';
import { Lightbox } from '../components/ui/Lightbox.jsx';
import { ResponsiveImage } from '../components/ui/ResponsiveImage.jsx';
import { Section } from '../components/ui/Section.jsx';
import { GALLERY_CATEGORIES, gallery } from '../content/gallery.js';
import { cn } from '../lib/cn.js';
import { InnerPage } from './InnerPage.jsx';

const categories = [
  'All',
  ...GALLERY_CATEGORIES.filter((c) => gallery.some((g) => g.category === c)),
];

export default function GalleryPage() {
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState(-1);
  const shown = category === 'All' ? gallery : gallery.filter((g) => g.category === category);

  return (
    <InnerPage page="gallery" subtitle="Our halls, décor and event setups.">
      <Section>
        <div role="group" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                category === c
                  ? 'border-clay-600 bg-clay-600 text-white'
                  : 'border-cream-200 bg-white text-ink-900 hover:border-clay-600',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {shown.map((item, i) => (
            <li key={item.image}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-xl"
                aria-label={`Open photo: ${item.alt}`}
              >
                <ResponsiveImage
                  name={item.image}
                  alt=""
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="block aspect-[4/3]"
                  imgClassName="transition duration-500 motion-safe:group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
        <Lightbox items={shown} index={index} onClose={() => setIndex(-1)} />
      </Section>
    </InnerPage>
  );
}
