import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
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

            <Link to="/">
              Home
            </Link>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <Link to="/gallery">
              Gallery
            </Link>

            <a href="#contact">
              Contact
            </a>

          </div>

          {/* Enquiry Button */}

          <a
            href="#enquiry-form"
            className="rounded-full bg-[#7C3AED] px-6 py-3 text-white font-medium hover:bg-[#6D28D9] transition"
          >
            Enquire Now
          </a>

        </nav>
      </div>
    </header>
  );
}

export default Header;