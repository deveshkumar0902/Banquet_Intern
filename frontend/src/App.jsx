import EnquiryForm from "./components/EnquiryForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-700">
            Welcome to Royal Banquet Hall
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Make your special events unforgettable.
          </p>

          <button className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-lg">
            Enquire Now
          </button>
        </div>
      </div>

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
