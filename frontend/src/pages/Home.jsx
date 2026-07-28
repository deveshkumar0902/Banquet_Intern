import Hero from "../components/Hero";
import EnquiryForm from "../components/EnquiryForm";
import VenueShowcase from "../components/VenueShowcase";
import Packages from "../components/Packages";
import Testimonials from "../components/Testimonials";
import EventStats from "../components/EventStats";
import FAQAccordion from "../components/FAQAccordion";

function Home() {
  return (
    <>
      <Hero />
      <EnquiryForm />
      <VenueShowcase />
      <Packages />
      <Testimonials />
      <EventStats />
      <FAQAccordion />
    </>
  );
}

export default Home;