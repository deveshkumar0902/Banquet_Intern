import Hero from "../components/Hero";
import EnquiryForm from "../components/EnquiryForm";
import VenueShowcase from "../components/VenueShowcase";
import Packages from "../components/Packages";
import Testimonials from "../components/Testimonials";
import EventStats from "../components/EventStats";
import FAQAccordion from "../components/FAQAccordion";
import AboutSection from "../components/AboutSection";

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <VenueShowcase />
      <Packages />
      <Testimonials />
      <EventStats />
      <FAQAccordion />
    </>
  );
}

export default Home;