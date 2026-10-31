import { renderTemplate, renderText } from '../utils/renderTemplate.js';
import { formatEventDate, whatsappDigits } from '../utils/format.js';

/**
 * Builds and sends the customer + owner emails. Never throws: the result is the status
 * stored on the row (`sent` | `failed` | `skipped`), so a mail outage can't fail a submission.
 * @param {{ transport: { sendMail: (msg: object) => Promise<unknown> }, config: object, logger: import('pino').Logger }} deps
 */
export function createMailService({ transport, config, logger }) {
  const contactLine =
    [config.BRAND_PHONE, config.BRAND_ADDRESS].filter(Boolean).join(' · ') ||
    'Reply to this email and our team will get back to you.';
  const brand = { brandName: config.BRAND_NAME, brandContact: contactLine };

  const message = (to, subject, template, vars, extra = {}) => {
    const all = { ...brand, subject, ...vars };
    return {
      from: config.MAIL_FROM,
      to,
      subject,
      html: renderTemplate(template, all),
      text: renderText(template, all),
      ...extra,
    };
  };

  /** @param {() => object[]} build */
  async function deliver(kind, id, build) {
    let messages;
    try {
      messages = build();
    } catch (err) {
      logger.error({ err, kind, id }, 'failed to build emails');
      return 'failed';
    }
    if (!messages.length) return 'skipped';
    const results = await Promise.allSettled(messages.map((m) => transport.sendMail(m)));
    const failed = results.filter((r) => r.status === 'rejected');
    for (const f of failed) logger.error({ err: f.reason, kind, id }, 'email send failed');
    return failed.length ? 'failed' : 'sent';
  }

  const contactVars = (p) => ({
    name: p.name,
    phone: p.phone,
    email: p.email ?? 'Not given',
    phoneHref: `tel:${p.phone}`,
    whatsappHref: `https://wa.me/${whatsappDigits(p.phone)}`,
  });

  return {
    /** @param {number} id @param {object} e validated enquiry */
    sendEnquiryEmails(id, e) {
      return deliver('enquiry', id, () => {
        const vars = {
          ...contactVars(e),
          id,
          eventType: e.eventType,
          eventDate: formatEventDate(e.eventDate),
          guests: e.guests,
          venue: e.venue ?? 'No preference',
          message: e.message ?? '—',
        };
        const out = [];
        if (e.email) {
          out.push(
            message(
              e.email,
              `We've received your enquiry · ${config.BRAND_NAME}`,
              'enquiry-customer',
              vars,
            ),
          );
        }
        if (config.OWNER_EMAIL) {
          out.push(
            message(
              config.OWNER_EMAIL,
              `New enquiry #${id}: ${e.eventType} on ${vars.eventDate} (${e.guests} guests)`,
              'enquiry-owner',
              vars,
              e.email ? { replyTo: e.email } : {},
            ),
          );
        }
        return out;
      });
    },

    /** @param {number} id @param {object} c validated contact message */
    sendContactEmails(id, c) {
      return deliver('contact', id, () => {
        const vars = { ...contactVars(c), id, subjectLine: c.subject, message: c.message };
        const out = [
          message(
            c.email,
            `Thanks for getting in touch · ${config.BRAND_NAME}`,
            'contact-customer',
            vars,
          ),
        ];
        if (config.OWNER_EMAIL) {
          out.push(
            message(config.OWNER_EMAIL, `New message #${id}: ${c.subject}`, 'contact-owner', vars, {
              replyTo: c.email,
            }),
          );
        }
        return out;
      });
    },
  };
}
