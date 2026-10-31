import { Section } from '../components/ui/Section.jsx';
import { site } from '../content/site.js';
import { InnerPage } from './InnerPage.jsx';

// TODO(owner): legal review. This is a plain-language draft, not legal advice.
export default function PrivacyPage() {
  const contact = site.email
    ? `email us at ${site.email}`
    : 'send us a message through the contact form';
  return (
    <InnerPage
      page="privacy"
      subtitle="What we collect, why, and how to ask us to delete it."
      cta={false}
    >
      <Section containerClassName="max-w-3xl">
        <div className="space-y-8 text-ink-600 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-clay-600">
          <p className="text-sm">Last updated: November 2026</p>
          <div>
            <h2>What we collect</h2>
            <p>
              When you send an enquiry or a message, we collect what you type into the form: your
              name, phone number, email address (if given), event type, date, guest count, preferred
              venue and message. We also store the time of your request and a one-way,
              daily-changing fingerprint of your IP address to prevent spam. We do not store your
              raw IP address.
            </p>
          </div>
          <div>
            <h2>Why we collect it</h2>
            <p>
              Only to reply to you: to check availability, call you back, send you a quote and plan
              your event. We send you a confirmation email if you give us your address. We never
              sell your details or use them for unrelated marketing.
            </p>
          </div>
          <div>
            <h2>Who can see it</h2>
            <p>
              Our team, and the email and hosting providers we use to run this website. They process
              data on our behalf and are not allowed to use it for anything else.
            </p>
          </div>
          <div>
            <h2>How long we keep it</h2>
            <p>
              We keep enquiries for up to 24 months after your event or last contact, so we can help
              with follow-ups and repeat bookings, and then delete them.
            </p>
          </div>
          <div>
            <h2>Your choices</h2>
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it at
              any time. To do that, {contact}. We’ll respond within 30 days.
            </p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p>
              This website does not use advertising or tracking cookies. The map on the contact page
              only loads Google Maps (which may set its own cookies) after you choose to show it.
            </p>
          </div>
        </div>
      </Section>
    </InnerPage>
  );
}
