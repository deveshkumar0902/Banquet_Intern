import { MessageCircle, Phone } from 'lucide-react';
import { telLink, whatsappLink } from '../../content/site.js';

/** WhatsApp and call shortcuts, fixed bottom-right. Hidden until the owner adds a number. */
export function FloatingContact() {
  const wa = whatsappLink();
  const tel = telLink();
  if (!wa && !tel) return null;
  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3">
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg hover:bg-[#17603c]"
        >
          <MessageCircle aria-hidden="true" className="h-7 w-7" />
        </a>
      )}
      {tel && (
        <a
          href={tel}
          aria-label="Call us"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-clay-600 text-white shadow-lg hover:bg-clay-700 md:hidden"
        >
          <Phone aria-hidden="true" className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
