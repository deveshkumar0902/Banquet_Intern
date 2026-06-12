import heroBg from "../assets/hero-bg.jpg";

function Hero() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="bg-black/50 p-6 md:p-8 rounded-lg text-center mx-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Welcome to Royal Banquet Hall
        </h1>

        <p className="mt-4 text-base md:text-xl text-gray-200">
          Make your special events unforgettable.
        </p>

        <a
          href="#enquiry-form"
          className="inline-block mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg transition"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
}

export default Hero;