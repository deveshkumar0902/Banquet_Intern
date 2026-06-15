import heroBg from "../assets/hero-bg.jpg";

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-black/60 p-8 md:p-12 rounded-xl text-center mx-4 max-w-3xl">
        
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