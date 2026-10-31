import { ImageOff } from 'lucide-react';
import { cn } from '../../lib/cn.js';
import { images } from '../../lib/images.js';

/**
 * Responsive <picture> for a photo in src/assets/images (WebP + JPEG srcsets, explicit size).
 * Missing photos render a labelled placeholder instead of a broken image.
 * @param {{ name?: string, alt: string, sizes?: string, priority?: boolean, className?: string,
 *   imgClassName?: string }} props
 */
export function ResponsiveImage({
  name,
  alt,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  className,
  imgClassName,
}) {
  const pic = name && images[name];
  if (!pic) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-cream-100 text-ink-600',
          className,
          imgClassName,
        )}
      >
        <ImageOff aria-hidden="true" className="h-8 w-8 text-clay-500" />
        <span className="text-sm">Photo coming soon</span>
      </div>
    );
  }
  return (
    <picture className={className}>
      {Object.entries(pic.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={pic.img.src}
        width={pic.img.w}
        height={pic.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  );
}
