import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Contact Us
      </h1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <ContactForm />

        {/* Right Side */}
        <div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=India%20Gate,%20New%20Delhi&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              Contact Details
            </h2>

            <p className="mb-2">
              📍 Royal Banquet Hall, New Delhi
            </p>

            <p className="mb-2">
              📞 +91 9876543210
            </p>

            <p>
              ✉️ info@royalbanquet.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;