import EnquiryForm from "./components/EnquiryForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Hero from "./components/Hero";
import GalleryPage from "./pages/Gallery";
import VenueShowcase from "./components/VenueShowcase";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
import EventStats from "./components/EventStats";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQAccordion from "./components/FAQAccordion";
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
function App() {
  return (
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <nav className="bg-purple-700 text-white p-4 flex gap-6">
        <Link to="/">Home</Link>

        <Link to="/about">
          About Us
        </Link>

        <Link to="/services">
          Services
        </Link>

        <Link to="/gallery">
          Gallery
        </Link>

        <Link to="/contact">
          Contact
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/gallery"
          element={<GalleryPage />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>
    </BrowserRouter>

    <ToastContainer
          position="top-right"
          autoClose={3000}
    />
   </> 
  );
}

export default App;
