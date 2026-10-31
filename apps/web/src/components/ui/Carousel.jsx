import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { cn } from '../../lib/cn.js';

/**
 * Embla carousel with labelled prev/next buttons, dot navigation and optional autoplay
 * (paused on hover/focus, off for reduced motion, with a visible pause control).
 * @param {{ slides: React.ReactNode[], label: string, autoplay?: number,
 *   slideClassName?: string, dark?: boolean }} props
 */
export function Carousel({ slides, label, autoplay = 0, slideClassName = 'basis-full', dark }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1, align: 'start' });
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);
  const [playing, setPlaying] = useState(autoplay > 0);
  const [hovering, setHovering] = useState(false);

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = (api) => {
      setSnaps(api.scrollSnapList());
      onSelect(api);
    };
    onInit(emblaApi);
    emblaApi.on('select', onSelect).on('reInit', onInit);
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onInit);
    };
  }, [emblaApi, onSelect]);

  const autoplayOn = autoplay > 0 && playing && !reduced && !hovering && slides.length > 1;
  useEffect(() => {
    if (!emblaApi || !autoplayOn) return;
    const id = setInterval(() => emblaApi.scrollNext(), autoplay);
    return () => clearInterval(id);
  }, [emblaApi, autoplayOn, autoplay]);

  const btn = cn(
    'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
    dark
      ? 'border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-clay-900'
      : 'border-clay-600 text-clay-600 hover:bg-clay-600 hover:text-white',
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={cn('min-w-0 shrink-0 grow-0 pl-4', slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            className={btn}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    'block h-2.5 rounded-full transition-all',
                    i === selected ? 'w-6' : 'w-2.5',
                    dark
                      ? i === selected
                        ? 'bg-gold-400'
                        : 'bg-cream-100/50'
                      : i === selected
                        ? 'bg-clay-600'
                        : 'bg-cream-200',
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={btn}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next slide"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
          {autoplay > 0 && !reduced && (
            <button
              type="button"
              className={btn}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause automatic slides' : 'Play automatic slides'}
            >
              {playing ? (
                <Pause aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Play aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
