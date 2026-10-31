import { Seo } from '../components/ui/Seo.jsx';
import { routeByPage } from '../app/routes.js';
import { CtaBand } from '../sections/shared/CtaBand.jsx';
import { PageHero } from '../sections/shared/PageHero.jsx';

/** Common frame for inner pages: SEO tags, photo hero with breadcrumb, content, CTA band. */
export function InnerPage({ page, title, subtitle, image, seo, crumbs, children, cta = true }) {
  const route = routeByPage(page);
  const heading = title ?? route.title;
  return (
    <>
      <Seo
        title={seo?.title ?? route.title}
        description={seo?.description ?? route.description}
        path={seo?.path ?? route.path}
        jsonLd={seo?.jsonLd}
        noindex={seo?.noindex}
      />
      <PageHero
        title={heading}
        subtitle={subtitle}
        image={image}
        breadcrumbs={[{ label: 'Home', to: '/' }, ...(crumbs ?? []), { label: heading }]}
      />
      {children}
      {cta && <CtaBand />}
    </>
  );
}
