import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import { routes } from './routes.js';

// Home loads eagerly (first paint); every other page is its own chunk.
const PAGES = {
  home: HomePage,
  about: lazy(() => import('../pages/AboutPage.jsx')),
  venues: lazy(() => import('../pages/VenuesPage.jsx')),
  venueDetail: lazy(() => import('../pages/VenueDetailPage.jsx')),
  services: lazy(() => import('../pages/ServicesPage.jsx')),
  packages: lazy(() => import('../pages/PackagesPage.jsx')),
  gallery: lazy(() => import('../pages/GalleryPage.jsx')),
  faq: lazy(() => import('../pages/FaqPage.jsx')),
  contact: lazy(() => import('../pages/ContactPage.jsx')),
  privacy: lazy(() => import('../pages/PrivacyPage.jsx')),
  notFound: lazy(() => import('../pages/NotFoundPage.jsx')),
};

/** The route tree, separate from the router so tests can render it in a MemoryRouter. */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, page }) => {
          const Page = PAGES[page];
          return path === '/' ? (
            <Route key={page} index element={<Page />} />
          ) : (
            <Route key={page} path={path} element={<Page />} />
          );
        })}
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
