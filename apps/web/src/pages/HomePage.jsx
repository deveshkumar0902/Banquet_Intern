import { Seo } from '../components/ui/Seo.jsx';
import { routeByPage } from '../app/routes.js';
import { venueJsonLd } from '../lib/seo.js';
import { AboutIntro } from '../sections/home/AboutIntro.jsx';
import { FaqSection } from '../sections/home/FaqSection.jsx';
import { GalleryPreview } from '../sections/home/GalleryPreview.jsx';
import { HeroSection } from '../sections/home/HeroSection.jsx';
import { PackagesTeaser } from '../sections/home/PackagesTeaser.jsx';
import { ProcessSteps } from '../sections/home/ProcessSteps.jsx';
import { ServicesGrid } from '../sections/home/ServicesGrid.jsx';
import { StatsStrip } from '../sections/home/StatsStrip.jsx';
import { TestimonialsCarousel } from '../sections/home/TestimonialsCarousel.jsx';
import { VenuesGrid } from '../sections/home/VenuesGrid.jsx';
import { WhyChooseUs } from '../sections/home/WhyChooseUs.jsx';
import { CtaBand } from '../sections/shared/CtaBand.jsx';

const route = routeByPage('home');

export default function HomePage() {
  return (
    <>
      <Seo description={route.description} path="/" jsonLd={venueJsonLd()} />
      <HeroSection />
      <StatsStrip />
      <AboutIntro />
      <VenuesGrid />
      <ServicesGrid />
      <WhyChooseUs />
      <PackagesTeaser />
      <ProcessSteps />
      <GalleryPreview />
      <TestimonialsCarousel />
      <FaqSection />
      <CtaBand onHome />
    </>
  );
}
