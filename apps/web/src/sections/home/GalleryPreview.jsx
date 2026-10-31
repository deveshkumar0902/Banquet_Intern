import { useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { Lightbox } from '../../components/ui/Lightbox.jsx';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import { gallery } from '../../content/gallery.js';

export function GalleryPreview() {
  const items = gallery.slice(0, 8);
  const [index, setIndex] = useState(-1);
  // A large lead tile only fits the grid when there are enough photos to fill around it.
  const feature = items.length >= 5;
  return (
    <Section>
      <SectionHeading eyebrow="Gallery" title="A glimpse of our spaces" />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.image} className={feature && i === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block h-full w-full overflow-hidden rounded-xl"
              aria-label={`Open photo: ${item.alt}`}
            >
              <ResponsiveImage
                name={item.image}
                alt=""
                sizes={
                  feature && i === 0
                    ? '(min-width: 1024px) 50vw, 100vw'
                    : '(min-width: 1024px) 25vw, 50vw'
                }
                className="block aspect-square h-full"
                imgClassName="transition duration-500 motion-safe:group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onClose={() => setIndex(-1)} />
      <div className="mt-10 text-center">
        <Button to="/gallery" variant="outline">
          View gallery
        </Button>
      </div>
    </Section>
  );
}
