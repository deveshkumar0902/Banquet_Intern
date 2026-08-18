import Container from "./Container";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">

      <Container>
        <div className="py-16">

          {/* Main Footer */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}

            <div className="lg:col-span-2">

              <Link
                to="/"
                className="text-2xl font-bold text-white"
              >
                Royal Banquet Hall
              </Link>

              <p className="mt-5 text-gray-400 leading-7 max-w-md">
                Creating beautiful memories with elegant venues,
                exceptional service and unforgettable celebrations.
                Let us make your special occasion truly memorable.
              </p>

              <a
                href="#enquiry-form"
                className="inline-block mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 rounded-full font-semibold transition"
              >
                Enquire Now
              </a>

            </div>

            {/* Quick Links */}

            <div>

              <h3 className="text-lg font-semibold mb-5">
                Quick Links
              </h3>

              <div className="space-y-3">

                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>

                <a
                  href="#about"
                  className="block text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>

                <a
                  href="#services"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Services
                </a>

                <Link
                  to="/gallery"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Gallery
                </Link>

                <a
                  href="#contact"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>

              </div>

            </div>

            {/* Contact */}

            <div>

              <h3 className="text-lg font-semibold mb-5">
                Contact Us
              </h3>

              <div className="space-y-4 text-gray-400">

                <p className="flex gap-3">
                  <span>📍</span>
                  <span>
                    Royal Banquet Hall,
                    <br />
                    New Delhi
                  </span>
                </p>

                <p className="flex gap-3">
                  <span>📞</span>
                  <span>+91 9876543210</span>
                </p>

                <p className="flex gap-3">
                  <span>✉️</span>
                  <span>info@royalbanquet.com</span>
                </p>

              </div>

            </div>

          </div>

          {/* Divider */}

          <div className="border-t border-gray-800 mt-12 pt-6">

            <div className="flex flex-col md:flex-row items-center justify-between gap-3">

              <p className="text-sm text-gray-500">
                © 2026 Royal Banquet Hall. All Rights Reserved.
              </p>

              <p className="text-sm text-gray-500">
                Made for memorable celebrations.
              </p>

            </div>

          </div>

        </div>
      </Container>

    </footer>
  );
}

export default Footer;