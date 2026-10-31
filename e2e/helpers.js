import { todayInIndia } from '@banquet/shared';
import { routes } from '../apps/web/src/app/routes.js';
import venues from '../apps/web/src/content/venues.json' with { type: 'json' };

/** Every concrete route plus one venue detail page. */
export const ALL_PATHS = [
  ...routes.filter((r) => !r.path.includes(':') && r.path !== '*').map((r) => r.path),
  `/venues/${venues[0].slug}`,
];

export const futureDate = (days = 45) => {
  const d = new Date(`${todayInIndia()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/** Collects console errors and uncaught exceptions for the page. */
export function trackErrors(page) {
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

/** Opens the mobile drawer when the desktop nav is hidden. Returns the nav to click links in. */
export async function mainNav(page) {
  const menu = page.getByRole('button', { name: 'Open menu' });
  if (await menu.isVisible()) {
    await menu.click();
    return page.getByRole('dialog', { name: 'Menu' });
  }
  return page.getByRole('navigation', { name: 'Main' });
}
