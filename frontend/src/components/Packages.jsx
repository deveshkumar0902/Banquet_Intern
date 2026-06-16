import { useState } from "react";

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
  const [packages] = useState(mockPackages);

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Packages
      </h2>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              {pkg.name}
            </h3>

            <p className="text-2xl font-semibold text-green-600 mb-3">
              ₹ {pkg.price.toLocaleString()}
            </p>

            <p className="text-gray-600 mb-3">
              {pkg.description}
            </p>

            <p className="font-medium text-gray-800 mb-4">
              Capacity: {pkg.capacity} Guests
            </p>

            <h4 className="font-semibold text-gray-800 mb-2">
              Inclusions:
            </h4>

            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {pkg.inclusions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Packages;