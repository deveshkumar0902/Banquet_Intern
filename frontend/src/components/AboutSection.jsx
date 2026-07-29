import aboutImg from "../assets/about-banquet.jpg";

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div className="relative">

            <img
              src={aboutImg}
              alt="Royal Banquet Hall"
              className="rounded-3xl shadow-2xl w-full object-cover h-[600px]"
            />

            <div className="absolute -bottom-8 -right-8 bg-[#7C3AED] text-white rounded-2xl px-8 py-6 shadow-xl">
              <h3 className="text-4xl font-bold">
                10+
              </h3>

              <p className="mt-2">
                Years of Excellence
              </p>
            </div>

          </div>

          {/* Right Side */}

          <div>

            <p className="uppercase tracking-[5px] text-purple-600 font-semibold">
              About Us
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Creating
              <br />
              Beautiful Memories
              <br />
              Since 2015
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              Royal Banquet Hall offers elegant venues,
              exceptional hospitality and customised event
              experiences for weddings, receptions,
              birthdays, corporate events and every special
              celebration.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="flex items-center gap-3">
                <span className="text-2xl">✔</span>
                <span>Luxury Interiors</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">✔</span>
                <span>Premium Catering</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">✔</span>
                <span>Parking Facility</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">✔</span>
                <span>Professional Staff</span>
              </div>

            </div>

            <button
              className="mt-10 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-full font-semibold transition"
            >
              Know More
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;