import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Phone, X } from 'lucide-react';
import { NavLink } from 'react-router';
import { routes } from '../../app/routes.js';
import { site, telLink, whatsappLink } from '../../content/site.js';
import { cn } from '../../lib/cn.js';
import { Button } from '../ui/Button.jsx';
import { Logo } from './Logo.jsx';

const items = routes.filter((r) => r.nav || r.page === 'home');

/** Slide-in drawer for small screens: focus trap, Esc closes, body scroll locked. */
export function MobileNav({ open, onClose, enquireTo }) {
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      [...panel.current.querySelectorAll('a[href], button:not([disabled])')].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        const els = focusables();
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const wa = whatsappLink();
  const tel = telLink();

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={onClose} />
      <div
        ref={panel}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-cream-50 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-clay-700 hover:bg-cream-100"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {items.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={r.path}
                  end={r.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-4 py-3 text-lg font-medium',
                      isActive ? 'bg-cream-100 text-clay-600' : 'text-ink-900 hover:bg-cream-100',
                    )
                  }
                >
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-cream-200 p-5">
          <Button to={enquireTo} onClick={onClose} className="w-full" size="lg">
            Enquire Now
          </Button>
          {tel && (
            <Button href={tel} variant="outline" className="w-full">
              <Phone aria-hidden="true" className="h-4 w-4" /> Call {site.phone}
            </Button>
          )}
          {wa && (
            <Button href={wa} variant="outline" className="w-full">
              <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp us
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
