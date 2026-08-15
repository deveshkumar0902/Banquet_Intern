import { useEffect, useState } from "react";

function AboutUs() {
  const [about, setAbout] = useState({
    description:
      "Royal Banquet Hall is a premium venue for weddings, birthdays, anniversaries, and corporate events. We provide elegant décor, spacious halls, quality catering, and exceptional customer service to make every event memorable.",
  });

  useEffect(() => {
    fetch("http://localhost:5000/about")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Endpoint not available");
        }

        return res.json();
      })
      .then((data) => {
        setAbout(data);
      })
      .catch(() => {
        console.log("Using mock About Us data");
      });
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side */}

          <div>

            <p className="uppercase tracking-[4px] text-[#7C3AED] font-semibold">
              About Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              Creating Beautiful
              <br />
              Memories Together
            </h2>

            <p className="mt-7 text-gray-600 text-lg leading-8">
              {about.description}
            </p>

            <div className="grid grid-cols-2 gap-5 mt-8">

              <div className="flex items-center gap-3">
                <span className="text-[#7C3AED] text-xl">✓</span>
                <span className="text-gray-700 font-medium">
                  Elegant Décor
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#7C3AED] text-xl">✓</span>
                <span className="text-gray-700 font-medium">
                  Spacious Halls
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#7C3AED] text-xl">✓</span>
                <span className="text-gray-700 font-medium">
                  Quality Catering
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#7C3AED] text-xl">✓</span>
                <span className="text-gray-700 font-medium">
                  Exceptional Service
                </span>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative">

            <div className="bg-[#7C3AED] rounded-3xl p-2 shadow-2xl">

              <div className="bg-white rounded-2xl p-10 md:p-12">

                <div className="text-6xl mb-6">
                  🏛️
                </div>

                <h3 className="text-3xl font-bold text-gray-900">
                  Your Celebration,
                  <br />
                  Our Responsibility
                </h3>

                <p className="mt-5 text-gray-600 leading-7">
                  From intimate gatherings to grand celebrations,
                  we work to make every occasion comfortable,
                  elegant and memorable.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutUs;