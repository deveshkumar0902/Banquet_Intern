import YarlLightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { images } from '../../lib/images.js';

/**
 * Full-screen photo viewer (keyboard, swipe and Esc handled by yet-another-react-lightbox).
 * @param {{ items: { image: string, alt: string }[], index: number, onClose: () => void }} props
 */
export function Lightbox({ items, index, onClose }) {
  const slides = items
    .filter((i) => images[i.image])
    .map(({ image, alt }) => {
      const pic = images[image];
      return { src: pic.img.src, width: pic.img.w, height: pic.img.h, alt };
    });
  return (
    <YarlLightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={onClose}
      slides={slides}
      labels={{ Previous: 'Previous photo', Next: 'Next photo', Close: 'Close' }}
    />
  );
}
