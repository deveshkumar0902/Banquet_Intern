import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Container } from '../../components/ui/Container.jsx';
import { ResponsiveImage } from '../../components/ui/ResponsiveImage.jsx';
import { EnquiryForm } from '../../components/forms/EnquiryForm.jsx';
import home from '../../content/home.json';
import { telLink, whatsappLink } from '../../content/site.js';

export function HeroSection() {
  const { hero } = home;
  const tel = telLink();
  const wa = whatsappLink();
  return (
    <section className="on-dark relative isolate overflow-hidden bg-clay-900">
      <ResponsiveImage
        name={hero.image}
        alt={hero.imageAlt}
        sizes="100vw"
        priority
        className="absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-clay-900/95 via-clay-900/75 to-clay-900/40"
      />
      <Container className="grid min-h-[min(100svh,56rem)] items-center gap-10 pt-28 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-32">
        <div>
          <p className="eyebrow text-gold-400">{hero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold text-cream-50">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream-100 sm:text-xl">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={hero.primaryCta.href} size="lg" variant="white">
              {hero.primaryCta.text}
            </Button>
            {tel ? (
              <Button href={tel} size="lg" variant="light">
                <Phone aria-hidden="true" className="h-5 w-5" /> Call us
              </Button>
            ) : wa ? (
              <Button href={wa} size="lg" variant="light">
                <MessageCircle aria-hidden="true" className="h-5 w-5" /> WhatsApp us
              </Button>
            ) : (
              <Button to="/packages" size="lg" variant="light">
                See packages
              </Button>
            )}
          </div>
        </div>

        <div
          id="enquiry"
          className="rounded-[var(--radius-card)] bg-cream-50 p-5 text-ink-900 shadow-2xl sm:p-7"
        >
          <h2 className="text-2xl font-semibold text-clay-600">{hero.formTitle}</h2>
          <p className="mt-1 mb-5 text-sm text-ink-600">{hero.formSubtitle}</p>
          <EnquiryForm variant="card" idPrefix="hero" />
        </div>
      </Container>
    </section>
  );
}
