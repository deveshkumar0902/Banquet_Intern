import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([
    {
      title: "Wedding Events",
      description:
        "Complete wedding planning and banquet arrangements with premium décor.",
    },
    {
      title: "Birthday Parties",
      description:
        "Celebrate birthdays with customized themes and entertainment options.",
    },
    {
      title: "Corporate Events",
      description:
        "Professional setup for meetings, conferences, and business gatherings.",
    },
    {
      title: "Anniversary Celebrations",
      description:
        "Memorable anniversary events with elegant decorations and catering.",
    },
    {
      title: "Catering Services",
      description:
        "Delicious multi-cuisine catering options for every occasion.",
    },
    {
      title: "Decoration Services",
      description:
        "Premium stage, floral, and venue decoration for all event types.",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Endpoint not available");
        }

        return res.json();
      })
      .then((data) => {
        setServices(data);
      })
      .catch(() => {
        console.log("Using mock Services data");
      });
  }, []);

  return (
    <section
      id="services"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-[#7C3AED] font-semibold">
            What We Offer
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Our Services
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
            From planning and decoration to catering and entertainment,
            we provide everything you need for a memorable celebration.
          </p>

        </div>

        {/* Services */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {services.map((service, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >

              {/* Icon */}

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#7C3AED] transition">
                {index === 0 && "💍"}
                {index === 1 && "🎂"}
                {index === 2 && "💼"}
                {index === 3 && "❤️"}
                {index === 4 && "🍽️"}
                {index === 5 && "🌸"}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {service.description}
              </p>

              <div className="mt-6 text-[#7C3AED] font-semibold">
                Learn More →
              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;