import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-[#7C3AED] font-semibold">
            Get In Touch
          </p>

          <h1 className="text-5xl font-bold text-gray-900 mt-3">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
            Planning your next celebration? Get in touch with our team
            and let us help you create an unforgettable event.
          </p>

        </div>

        {/* Main Content */}

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Contact Form */}

          <ContactForm />

          {/* Right Side */}

          <div className="space-y-6">

            {/* Google Map */}

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=India%20Gate,%20New%20Delhi&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>

            </div>

            {/* Contact Details */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <p className="uppercase tracking-[3px] text-sm text-[#7C3AED] font-semibold">
                Contact Information
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-6">
                We'd Love To Hear From You
              </h2>

              <div className="space-y-5">

                {/* Address */}

                <div className="flex items-start gap-4">

                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    📍
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Address
                    </h3>

                    <p className="text-gray-600 mt-1">
                      Royal Banquet Hall, New Delhi
                    </p>
                  </div>

                </div>

                {/* Phone */}

                <div className="flex items-start gap-4">

                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    📞
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phone
                    </h3>

                    <p className="text-gray-600 mt-1">
                      +91 9876543210
                    </p>
                  </div>

                </div>

                {/* Email */}

                <div className="flex items-start gap-4">

                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    ✉️
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email
                    </h3>

                    <p className="text-gray-600 mt-1">
                      info@royalbanquet.com
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;