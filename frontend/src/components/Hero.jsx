import heroBg from "../assets/hero-bg.jpg";
import EnquiryForm from "./EnquiryForm";

function Hero() {
  return (
    <section
      className="relative min-h-[900px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 min-h-[900px] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT SIDE */}
          <div className="text-white">

            <p className="uppercase tracking-[6px] text-sm text-purple-300 font-medium mb-5">
              Premium Banquet Hall
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
              Celebrate
              <br />
              Your Dream
              <br />
              Wedding
            </h1>

            <p className="mt-8 text-lg text-gray-200 max-w-xl leading-8">
              From intimate gatherings to grand celebrations,
              Royal Banquet Hall offers luxurious venues,
              premium hospitality and unforgettable experiences
              for weddings, receptions, birthdays,
              corporate events and every special occasion.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="#venues"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] transition px-8 py-4 rounded-full font-semibold shadow-lg"
              >
                Explore Venues
              </a>

              <a
                href="#enquiry-form"
                className="border-2 border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-full font-semibold"
              >
                Enquire Now
              </a>

            </div>

            {/* Stats */}

            <div className="flex gap-10 mt-14">

              <div>
                <h2 className="text-4xl font-bold text-purple-300">
                  500+
                </h2>

                <p className="text-gray-300 mt-2">
                  Successful Events
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-purple-300">
                  10+
                </h2>

                <p className="text-gray-300 mt-2">
                  Years Experience
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-purple-300">
                  5★
                </h2>

                <p className="text-gray-300 mt-2">
                  Customer Rating
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-lg">

              <EnquiryForm />

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white">

        <span className="text-sm tracking-widest uppercase mb-2">
          Scroll
        </span>

        <div className="w-[2px] h-12 bg-white/60 animate-pulse"></div>

      </div>

    </section>
  );
}

export default Hero;