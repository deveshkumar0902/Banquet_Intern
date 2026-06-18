import { useEffect, useState } from "react";

const mockStats = [
  {
    label: "Events Hosted",
    value: 500,
  },
  {
    label: "Happy Guests",
    value: 1000,
  },
  {
    label: "Venues",
    value: 50,
  },
  {
    label: "Years Experience",
    value: 10,
  },
];

function EventStats() {
  const [counts, setCounts] = useState(
    mockStats.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, index) => {
          const target = mockStats[index].value;

          if (count < target) {
            return Math.min(
              count + Math.ceil(target / 50),
              target
            );
          }

          return count;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Event Statistics
      </h2>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gray-100 rounded-xl shadow-md p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-purple-700">
                {counts[index]}+
              </h3>

              <p className="mt-3 text-gray-700 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventStats;