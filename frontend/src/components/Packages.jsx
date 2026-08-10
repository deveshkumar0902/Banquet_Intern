const mockPackages = [
  {
    id: "wedding-silver",
    name: "Wedding Silver Package",
    description:
      "An affordable yet elegant package for intimate weddings up to 150 guests.",
    price: 15000,
    capacity: 150,
    inclusions: [
      "Main Hall Rental (8 hours)",
      "Welcome Refreshments for 150 guests",
      "Bridal Suite",
      "Stage Decoration (Basic)",
      "Sound System (Basic)",
      "Parking (Up to 50 vehicles)",
    ],
  },
  {
    id: "wedding-gold",
    name: "Wedding Gold Package",
    description:
      "Our most popular package featuring premium amenities for medium-sized weddings.",
    price: 25000,
    capacity: 250,
    inclusions: [
      "Main Hall Rental (12 hours)",
      "Buffet Dinner (150 guests)",
      "Bridal + Groom Suites",
      "Stage Decoration (Floral)",
      "Professional DJ & Sound System",
      "Lighting Setup",
      "Parking (Up to 100 vehicles)",
    ],
  },
  {
    id: "wedding-diamond",
    name: "Wedding Diamond Package",
    description:
      "A luxury package with full-service arrangements for grand celebrations.",
    price: 45000,
    capacity: 500,
    inclusions: [
      "Main Hall Rental (Full Day)",
      "Buffet Dinner (300 guests)",
      "Premium Bridal + Groom Suites",
      "Elaborate Stage & Floral Decoration",
      "Full Sound & Light System",
      "Live Music/Band Arrangement",
      "Photography Coordination",
      "Dedicated Event Manager",
      "Parking (Unlimited)",
    ],
  },
];

function Packages() {
  return (
    <section
      id="packages"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-purple-600 font-semibold">
            Choose Your Package
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            Wedding Packages
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
            Elegant packages designed to make your celebration
            memorable, comfortable and completely stress-free.
          </p>

        </div>

        {/* Package Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {mockPackages.map((pkg, index) => (

            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
                ${
                  index === 1
                    ? "border-2 border-purple-500"
                    : "border border-gray-100"
                }`}
            >

              {/* Popular Badge */}

              {index === 1 && (
                <div className="absolute top-5 right-5 z-10 bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Top Image Area */}

              <div
                className={`h-48 flex items-center justify-center
                  ${
                    index === 0
                      ? "bg-gradient-to-br from-gray-700 to-gray-900"
                      : index === 1
                      ? "bg-gradient-to-br from-purple-600 to-purple-900"
                      : "bg-gradient-to-br from-gray-900 to-black"
                  }`}
              >

                <div className="text-center text-white">

                  <div className="text-5xl mb-3">
                    {index === 0
                      ? "💍"
                      : index === 1
                      ? "👑"
                      : "✨"}
                  </div>

                  <p className="uppercase tracking-[3px] text-sm opacity-80">
                    {index === 0
                      ? "Elegant"
                      : index === 1
                      ? "Premium"
                      : "Luxury"}
                  </p>

                </div>

              </div>

              {/* Card Content */}

              <div className="p-8">

                <h3 className="text-2xl font-bold text-gray-900">
                  {pkg.name}
                </h3>

                {/* Price */}

                <div className="mt-5 flex items-baseline gap-2">

                  <span className="text-3xl font-bold text-[#7C3AED]">
                    ₹{pkg.price.toLocaleString()}
                  </span>

                  <span className="text-gray-500">
                    / package
                  </span>

                </div>

                {/* Description */}

                <p className="mt-5 text-gray-600 leading-7">
                  {pkg.description}
                </p>

                {/* Capacity */}

                <div className="mt-6 bg-purple-50 rounded-xl px-4 py-3">

                  <p className="font-semibold text-purple-700">
                    👥 Capacity: {pkg.capacity} Guests
                  </p>

                </div>

                {/* Features */}

                <div className="mt-7">

                  <h4 className="font-bold text-gray-900 mb-4">
                    What's Included
                  </h4>

                  <ul className="space-y-3">

                    {pkg.inclusions.map((item, itemIndex) => (

                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-600"
                      >

                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold mt-0.5">
                          ✓
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>

                    ))}

                  </ul>

                </div>

                {/* Button */}

                <a
                  href="#enquiry-form"
                  className="block text-center mt-8 w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3.5 rounded-full font-semibold transition"
                >
                  Enquire Now
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Packages;