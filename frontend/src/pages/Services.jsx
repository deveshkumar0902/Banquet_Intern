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
      .catch((err) => {
        console.log("Using mock Services data");
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-700">
        Services
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-purple-700">
              {service.title}
            </h2>

            <p className="text-gray-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;