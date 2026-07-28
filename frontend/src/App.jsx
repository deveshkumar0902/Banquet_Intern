import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import GalleryPage from "./pages/Gallery";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;
