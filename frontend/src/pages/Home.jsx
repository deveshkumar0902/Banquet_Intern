import Hero from "../components/Hero";
import VenueShowcase from "../components/VenueShowcase";
import Packages from "../components/Packages";
import Testimonials from "../components/Testimonials";
import EventStats from "../components/EventStats";
import FAQAccordion from "../components/FAQAccordion";

import AboutUs from "./AboutUs";
import Services from "./Services";
import Contact from "./Contact";

function Home() {
  return (
    <>
      <Hero />

      <AboutUs />

      <VenueShowcase />

      <Packages />

      <Services />

      <Testimonials />

      <EventStats />

      <FAQAccordion />

      <Contact />
    </>
  );
}

export default Home;