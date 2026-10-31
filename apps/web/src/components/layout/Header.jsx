import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { navRoutes } from '../../app/routes.js';
import { cn } from '../../lib/cn.js';
import { enquireTarget } from '../../lib/links.js';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';
import { Logo } from './Logo.jsx';
import { MobileNav } from './MobileNav.jsx';

/**
 * Fixed header. Every page opens with a dark photo hero, so the header starts transparent with
 * light text and turns solid once the page scrolls.
 */
export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        solid
          ? 'bg-cream-50/95 shadow-sm backdrop-blur'
          : 'on-dark bg-gradient-to-b from-black/50 to-transparent',
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Logo light={!solid} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={r.path}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors',
                      solid
                        ? 'text-ink-900 hover:text-clay-600'
                        : 'text-cream-50 hover:text-gold-400',
                      isActive && (solid ? 'text-clay-600' : 'text-gold-400'),
                    )
                  }
                >
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button to={enquireTarget(pathname)} size="sm" variant={solid ? 'primary' : 'white'}>
              Enquire Now
            </Button>
          </span>
          <button
            ref={menuButton}
            type="button"
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden',
              solid ? 'text-clay-700 hover:bg-cream-100' : 'text-cream-50 hover:bg-white/10',
            )}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <MobileNav
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
        enquireTo={enquireTarget(pathname)}
      />
    </header>
  );
}
