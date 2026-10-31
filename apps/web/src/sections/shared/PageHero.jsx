import { Breadcrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { Container } from '../../components/ui/Container.jsx';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';

/** Photo banner with the page's h1 and breadcrumb, used at the top of every inner page. */
export function PageHero({ title, subtitle, image = 'hero/banquet-hall-arches.jpg', breadcrumbs }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-clay-900 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <ResponsiveImage
        name={image}
        alt=""
        sizes="100vw"
        priority
        className="absolute inset-0 -z-10"
        imgClassName="opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-clay-900 via-clay-900/60 to-clay-900/30"
      />
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-cream-50">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-cream-100">{subtitle}</p>}
      </Container>
    </section>
  );
}
