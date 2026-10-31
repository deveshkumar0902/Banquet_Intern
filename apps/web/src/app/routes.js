// The single list of routes, used by the router (App.jsx), header and footer navigation,
// and the sitemap (scripts/postbuild.mjs). Keep this file free of JSX and asset imports so
// Node can read it at build time.
export const routes = [
  {
    path: '/',
    page: 'home',
    label: 'Home',
    title: '',
    description:
      'Banquet hall and wedding venue for weddings, receptions, engagements, birthdays and corporate events. Elegant halls, a garden lawn and a team that handles the details.',
    nav: false,
    sitemap: true,
  },
  {
    path: '/about',
    page: 'about',
    label: 'About',
    title: 'About Us',
    description:
      'The story of Dev Marriage Hall: a family venue built for celebrations, with experienced coordinators and flexible halls.',
    nav: true,
    sitemap: true,
  },
  {
    path: '/venues',
    page: 'venues',
    label: 'Venues',
    title: 'Venues & Halls',
    description:
      'Compare our banquet halls and garden lawn by capacity, features and the events they suit best.',
    nav: true,
    sitemap: true,
  },
  { path: '/venues/:slug', page: 'venueDetail', nav: false, sitemap: false },
  {
    path: '/services',
    page: 'services',
    label: 'Events',
    title: 'Events We Host',
    description:
      'Weddings, receptions, engagements, haldi, mehendi and sangeet, birthdays, anniversaries and corporate events at Dev Marriage Hall.',
    nav: true,
    sitemap: true,
  },
  {
    path: '/packages',
    page: 'packages',
    label: 'Packages',
    title: 'Event Packages',
    description:
      "Wedding, engagement, birthday, anniversary and corporate event packages. See what's included and get a custom quote.",
    nav: true,
    sitemap: true,
  },
  {
    path: '/gallery',
    page: 'gallery',
    label: 'Gallery',
    title: 'Gallery',
    description: 'Photos of our banquet halls, décor and event setups.',
    nav: true,
    sitemap: true,
  },
  {
    path: '/faq',
    page: 'faq',
    label: 'FAQ',
    title: 'Frequently Asked Questions',
    description:
      'Answers about capacity, catering, décor, parking, booking and cancellation at Dev Marriage Hall.',
    nav: true,
    sitemap: true,
  },
  {
    path: '/contact',
    page: 'contact',
    label: 'Contact',
    title: 'Contact & Enquiries',
    description:
      'Send an enquiry, check availability or ask us a question. We call back within 24 hours.',
    nav: true,
    sitemap: true,
  },
  {
    path: '/privacy',
    page: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    description: 'How Dev Marriage Hall collects, uses and protects the details you share with us.',
    nav: false,
    sitemap: true,
  },
  { path: '*', page: 'notFound', title: 'Page Not Found', nav: false, sitemap: false },
];

export const navRoutes = routes.filter((r) => r.nav);
export const routeByPage = (page) => routes.find((r) => r.page === page);
