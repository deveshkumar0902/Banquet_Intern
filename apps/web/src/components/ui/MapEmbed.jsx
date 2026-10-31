import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './Button.jsx';

/** Loads the Google Maps iframe only after a click, so the page stays fast and cookie-free. */
export function MapEmbed({ src, title }) {
  const [loaded, setLoaded] = useState(false);
  if (!src) return null;
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-cream-200 bg-cream-100">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin aria-hidden="true" className="h-8 w-8 text-clay-600" />
          <Button variant="outline" onClick={() => setLoaded(true)}>
            Show map
          </Button>
          <p className="text-xs text-ink-600">Loads Google Maps</p>
        </div>
      )}
    </div>
  );
}
