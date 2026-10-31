import { absoluteAsset, canonicalUrl, pageTitle } from '../../lib/seo.js';
import { site } from '../../content/site.js';

/**
 * Per-page <title>, description, canonical, Open Graph and Twitter tags. React 19 hoists
 * these into <head>. Optional `jsonLd` is rendered as a structured-data script.
 */
export function Seo({ title, description = site.seo.description, path = '/', jsonLd, noindex }) {
  const fullTitle = pageTitle(title);
  const url = canonicalUrl(path);
  const image = absoluteAsset('og-image.jpg');
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON.stringify output with '<' escaped cannot break out of the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
}
