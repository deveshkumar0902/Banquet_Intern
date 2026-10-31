import { Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Container } from '../../components/ui/Container.jsx';
import { Flourish } from '../../components/ui/Flourish.jsx';
import cta from '../../content/cta.json';
import { site, telLink } from '../../content/site.js';

/**
 * "Ready to Plan Your Event?" band (owner-approved copy, word for word).
 * On Home, Enquire Now scrolls to the hero form instead of leaving the page.
 */
export function CtaBand({ onHome = false }) {
  const tel = telLink();
  return (
    <section
      className="on-dark bg-clay-900 py-16 text-center sm:py-20"
      aria-labelledby="cta-heading"
    >
      <Container className="max-w-3xl">
        <Flourish className="mx-auto mb-4 h-4 w-20 text-gold-400" />
        <h2
          id="cta-heading"
          className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-cream-50"
        >
          {cta.heading}
        </h2>
        <p className="mt-3 font-display text-xl text-gold-400">{cta.subheading}</p>
        <p className="mx-auto mt-4 max-w-2xl text-cream-100">{cta.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to={onHome ? '/#enquiry' : cta.primaryCta.href} size="lg" variant="white">
            {cta.primaryCta.text}
          </Button>
          {tel && (
            <Button href={tel} size="lg" variant="light">
              <Phone aria-hidden="true" className="h-5 w-5" /> Call us {site.phone}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
