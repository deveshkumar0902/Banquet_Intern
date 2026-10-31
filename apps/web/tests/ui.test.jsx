import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from '../src/components/ui/Accordion.jsx';
import { Button } from '../src/components/ui/Button.jsx';
import { Carousel } from '../src/components/ui/Carousel.jsx';
import { MapEmbed } from '../src/components/ui/MapEmbed.jsx';
import { RatingStars } from '../src/components/ui/RatingStars.jsx';
import { ResponsiveImage } from '../src/components/ui/ResponsiveImage.jsx';
import { StatCounter } from '../src/components/ui/StatCounter.jsx';
import { renderWithRouter } from './utils.jsx';

describe('Button', () => {
  it('renders a router link with `to`', () => {
    renderWithRouter(<Button to="/contact">Go</Button>);
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/contact');
  });
  it('renders an external <a> with `href` safely', () => {
    render(<Button href="https://example.com">Out</Button>);
    const a = screen.getByRole('link', { name: 'Out' });
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('renders a type=button <button> otherwise', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});

describe('Accordion', () => {
  const items = [
    { id: 'a', title: 'First', content: 'Answer A' },
    { id: 'b', title: 'Second', content: 'Answer B' },
  ];

  it('toggles panels with aria-expanded and aria-controls', async () => {
    render(<Accordion items={items} />);
    const first = screen.getByRole('button', { name: 'First' });
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Answer A')).not.toBeVisible();
    await userEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(first.getAttribute('aria-controls'))).toHaveTextContent(
      'Answer A',
    );
    expect(screen.getByText('Answer A')).toBeVisible();
  });

  it('keeps one panel open at a time unless `multiple`', async () => {
    const { unmount } = render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'First' }));
    await userEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
    unmount();
    render(<Accordion items={items} multiple />);
    await userEvent.click(screen.getByRole('button', { name: 'First' }));
    await userEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('is keyboard operable', async () => {
    render(<Accordion items={items} />);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('RatingStars', () => {
  it('has an accessible label', () => {
    render(<RatingStars rating={5} />);
    expect(screen.getByRole('img', { name: '5 out of 5' })).toBeInTheDocument();
  });
});

describe('StatCounter', () => {
  it('always exposes the final value to screen readers', () => {
    render(<StatCounter value={25000} suffix="+" label="Guests" />);
    expect(screen.getByText('25,000+', { selector: '.sr-only' })).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });
});

describe('Carousel', () => {
  it('has labelled controls and slides', () => {
    render(<Carousel label="Photos" slides={[<p key="1">One</p>, <p key="2">Two</p>]} />);
    expect(screen.getByRole('region', { name: 'Photos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '1 of 2' })).toBeInTheDocument();
  });
});

describe('MapEmbed', () => {
  it('renders nothing without a URL', () => {
    const { container } = render(<MapEmbed src="" title="Map" />);
    expect(container).toBeEmptyDOMElement();
  });
  it('loads the iframe only after a click', async () => {
    render(<MapEmbed src="https://maps.example/embed" title="Venue map" />);
    expect(screen.queryByTitle('Venue map')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Show map' }));
    expect(screen.getByTitle('Venue map')).toHaveAttribute('loading', 'lazy');
  });
});

describe('ResponsiveImage', () => {
  it('renders a sized, lazy <img> with srcset sources for a known photo', () => {
    const { container } = render(
      <ResponsiveImage name="hero/banquet-hall-arches.jpg" alt="Hall" />,
    );
    const img = screen.getByRole('img', { name: 'Hall' });
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
    expect(container.querySelector('source[type="image/webp"]')).toHaveAttribute('srcset');
  });
  it('renders a placeholder for a missing photo', () => {
    render(<ResponsiveImage name={undefined} alt="" />);
    expect(screen.getByText('Photo coming soon')).toBeInTheDocument();
  });
});
