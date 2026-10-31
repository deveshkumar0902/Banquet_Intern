import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../src/app/App.jsx';
import { routes } from '../src/app/routes.js';
import venues from '../src/content/venues.json';

const renderAt = (route) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>,
  );

describe('routing', () => {
  const concrete = routes.filter((r) => !r.path.includes(':') && r.path !== '*');

  it.each(concrete.map((r) => [r.path, r]))('%s renders one h1 inside the layout', async (path) => {
    renderAt(path);
    const h1s = await screen.findAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a venue detail page', async () => {
    renderAt(`/venues/${venues[0].slug}`);
    expect(
      await screen.findByRole('heading', { level: 1, name: venues[0].name }),
    ).toBeInTheDocument();
  });

  it('shows Not Found for unknown paths and unknown venue slugs', async () => {
    renderAt('/nope');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument();
  });

  it('shows Not Found for an unknown venue slug', async () => {
    renderAt('/venues/does-not-exist');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument();
  });

  // Regression for audit bug #12: nav used #anchors that only worked on the home page.
  it('header links are real routes that work from any page', async () => {
    renderAt('/gallery');
    await screen.findByRole('heading', { level: 1, name: 'Gallery' });
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const link of within(nav).getAllByRole('link')) {
      expect(link.getAttribute('href')).toMatch(/^\/[a-z]+$/);
    }
    await userEvent.click(within(nav).getByRole('link', { name: 'About' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'About Us' })).toBeInTheDocument();
    await userEvent.click(
      within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', {
        name: 'Contact',
      }),
    );
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Contact & Enquiries' }),
    ).toBeInTheDocument();
  });

  it('Enquire Now points at the hero form on Home and the contact form elsewhere', async () => {
    renderAt('/');
    expect(screen.getAllByRole('link', { name: 'Enquire Now' })[0]).toHaveAttribute(
      'href',
      '/#enquiry',
    );
  });

  it('opens and closes the mobile menu with Escape', async () => {
    renderAt('/about');
    await screen.findByRole('heading', { level: 1 });
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(within(dialog).getByRole('link', { name: 'Venues' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });
});
