import { Link } from "react-router-dom";
import Container from "./Container";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-[#7C3AED]"
          >
            Royal Banquet Hall
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="rounded-full bg-[#7C3AED] px-6 py-3 text-white font-medium hover:bg-[#6D28D9] transition"
          >
            Enquire Now
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export default Header;