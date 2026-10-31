import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { FloatingContact } from './FloatingContact.jsx';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import { ScrollManager } from './ScrollManager.jsx';

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-clay-900" role="status">
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-clay-700 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}
