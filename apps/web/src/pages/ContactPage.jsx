import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { ContactForm } from '../components/forms/ContactForm.jsx';
import { EnquiryForm } from '../components/forms/EnquiryForm.jsx';
import { Card } from '../components/ui/Card.jsx';
import { MapEmbed } from '../components/ui/MapEmbed.jsx';
import { Section } from '../components/ui/Section.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { addressLine, site, telLink, whatsappLink } from '../content/site.js';
import { prefillFromParams } from '../lib/links.js';
import { InnerPage } from './InnerPage.jsx';

function DetailRow({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-100">
        <Icon aria-hidden="true" className="h-5 w-5 text-clay-600" />
      </span>
      <div>
        <p className="text-sm text-ink-600">{label}</p>
        <div className="font-medium text-ink-900">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const [params] = useSearchParams();
  const prefill = prefillFromParams(params);
  const tel = telLink();
  const wa = whatsappLink();
  const address = addressLine();
  const link = 'text-clay-600 underline-offset-4 hover:underline';

  return (
    <InnerPage
      page="contact"
      subtitle="Tell us about your plans. We usually call back within 24 hours."
    >
      <Section id="enquiry" containerClassName="max-w-4xl">
        <SectionHeading
          as="h2"
          eyebrow="Book a visit or check dates"
          title="Send an enquiry"
          className="!mb-8"
        />
        <Card className="p-5 sm:p-8">
          {/* key: re-mount when a different ?event= arrives so defaults apply */}
          <EnquiryForm key={params.toString()} defaultValues={prefill} />
        </Card>
      </Section>

      <Section tone="sand" containerClassName="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-3xl font-semibold text-clay-600">Have a question?</h2>
          <p className="mt-2 mb-6 text-ink-600">
            Not ready to book? Send us a message and we’ll reply by email.
          </p>
          <Card className="p-5 sm:p-8">
            <ContactForm />
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-5 text-2xl font-semibold text-clay-600">Contact details</h2>
            <ul className="space-y-5">
              {tel && (
                <DetailRow icon={Phone} label="Call us">
                  <a href={tel} className={link}>
                    {site.phone}
                  </a>
                </DetailRow>
              )}
              {wa && (
                <DetailRow icon={MessageCircle} label="WhatsApp">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>
                    Chat with us
                  </a>
                </DetailRow>
              )}
              {site.email && (
                <DetailRow icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className={link}>
                    {site.email}
                  </a>
                </DetailRow>
              )}
              {address && (
                <DetailRow icon={MapPin} label="Address">
                  {address}
                </DetailRow>
              )}
              {site.hours.length > 0 && (
                <DetailRow icon={Clock} label="Opening hours">
                  {site.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </DetailRow>
              )}
              {!tel && !wa && !site.email && !address && (
                <li className="text-ink-600">
                  Use the forms on this page and our team will get back to you.
                </li>
              )}
            </ul>
          </Card>
          <MapEmbed src={site.mapEmbedUrl} title={`Map showing ${site.name}`} />
        </div>
      </Section>
    </InnerPage>
  );
}
