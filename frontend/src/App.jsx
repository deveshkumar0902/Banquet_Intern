import { BrowserRouter, Routes, Route } from "react-router-dom";

import GalleryPage from "./pages/Gallery";
import Home from "./pages/Home";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter
        basename={import.meta.env.BASE_URL.replace(/\/$/, "")}
      >
        <Header />

        <Routes>
          {/* Main scrolling homepage */}
          <Route path="/" element={<Home />} />

          {/* Gallery remains the only separate page */}
          <Route path="/gallery" element={<GalleryPage />} />
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
