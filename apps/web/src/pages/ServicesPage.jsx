import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';
import { ResponsiveImage } from '../components/ui/ResponsiveImage.jsx';
import services from '../content/services.json';
import { cn } from '../lib/cn.js';
import { ICONS } from '../lib/icons.js';
import { quoteLink } from '../lib/links.js';
import { InnerPage } from './InnerPage.jsx';

export default function ServicesPage() {
  return (
    <InnerPage
      page="services"
      subtitle="Whatever you're celebrating, we have the space and the team for it."
    >
      {services.map((s, i) => {
        const Icon = ICONS[s.icon];
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn('py-14 sm:py-20', i % 2 ? 'bg-cream-100' : 'bg-cream-50')}
          >
            <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <ResponsiveImage
                name={s.image}
                alt=""
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn(
                  'block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
                  i % 2 && 'lg:order-2',
                )}
              />
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 text-clay-600" />
                </span>
                <h2
                  id={`${s.id}-title`}
                  className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-clay-600"
                >
                  {s.title}
                </h2>
                <p className="mt-3 text-lg font-medium text-ink-900">{s.summary}</p>
                <p className="mt-3 text-ink-600">{s.body}</p>
                <Button to={quoteLink(s.eventType)} className="mt-6">
                  Enquire about{' '}
                  {s.title.toLowerCase().startsWith('corporate')
                    ? 'a corporate event'
                    : s.title.split(' ')[0].toLowerCase()}
                </Button>
              </div>
            </Container>
          </section>
        );
      })}
    </InnerPage>
  );
}
