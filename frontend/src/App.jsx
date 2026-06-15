import EnquiryForm from "./components/EnquiryForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Hero from "./components/Hero";
function Home() {
  return (
    <>
      <Hero />
      <EnquiryForm />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <nav className="bg-purple-700 text-white p-4 flex gap-6">
        <Link to="/">Home</Link>

        <Link to="/about">
          About Us
        </Link>

        <Link to="/services">
          Services
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
