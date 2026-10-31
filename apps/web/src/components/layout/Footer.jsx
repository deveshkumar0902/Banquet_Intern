import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { navRoutes } from '../../app/routes.js';
import services from '../../content/services.json';
import { addressLine, site, telLink, whatsappLink } from '../../content/site.js';
import { Container } from '../ui/Container.jsx';
import { Logo } from './Logo.jsx';

const SOCIAL_LABELS = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube' };

function FooterHeading({ children }) {
  return (
    <h2 className="mb-4 font-sans text-sm font-semibold tracking-[0.16em] text-gold-400 uppercase">
      {children}
    </h2>
  );
}

const linkClass = 'text-cream-100 underline-offset-4 hover:text-white hover:underline';

export function Footer() {
  const tel = telLink();
  const wa = whatsappLink();
  const address = addressLine();
  const socials = Object.entries(site.socials).filter(([, url]) => url);
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-white/10 bg-clay-900 text-cream-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">
            {site.tagline}. Weddings, receptions, engagements, birthdays and corporate events,
            hosted with care.
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {SOCIAL_LABELS[key]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <FooterHeading>Quick links</FooterHeading>
          <ul className="space-y-2 text-sm">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <Link to={r.path} className={linkClass}>
                  {r.label === 'FAQ' ? 'FAQs' : r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Events</FooterHeading>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/contact?event=${encodeURIComponent(s.eventType)}#enquiry`}
                  className={linkClass}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Get in touch</FooterHeading>
          <ul className="space-y-3 text-sm">
            {tel && (
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a href={tel} className={linkClass}>
                  {site.phone}
                </a>
              </li>
            )}
            {wa && (
              <li className="flex gap-3">
                <MessageCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                />
                <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
            )}
            {site.email && (
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
            )}
            {address && (
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{address}</span>
              </li>
            )}
            {site.hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {h.days}: {h.time}
                </span>
              </li>
            ))}
            <li>
              <Link to="/contact#enquiry" className={linkClass}>
                Send us an enquiry
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <Link to="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
