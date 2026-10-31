// Every photo in src/assets/images, processed by vite-imagetools into responsive WebP + JPEG.
// Content files refer to photos by their path under that folder, e.g. 'venues/grand-ballroom.jpg'.
const modules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
  query: { w: '480;960;1600', format: 'webp;jpg', quality: '72', as: 'picture' },
});

/** @type {Record<string, { sources: Record<string, string>, img: { src: string, w: number, h: number } }>} */
export const images = Object.fromEntries(
  Object.entries(modules).map(([file, pic]) => [file.replace('../assets/images/', ''), pic]),
);

export const hasImage = (name) => Boolean(name && images[name]);
