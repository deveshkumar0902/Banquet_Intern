import EnquiryForm from "./components/EnquiryForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Hero from "./components/Hero";
import GalleryPage from "./pages/Gallery";
import VenueShowcase from "./components/VenueShowcase";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
function Home() {
  return (
    <>
      <Hero />
      <EnquiryForm />
      <VenueShowcase />
      <Packages />
      <Testimonials />
    </>
  );
}
function App() {
  return (
    <BrowserRouter basename="/Banquet_Intern">
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
