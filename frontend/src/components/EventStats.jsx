import { useEffect, useState } from "react";

function EventStats() {
  const [stats, setStats] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("STATS DATA:", data);
        const statsData = [
          {
            label: "Events Hosted",
            value: data.eventsHosted,
          },
          {
            label: "Guests Served",
            value: data.guestsServed,
          },
          {
            label: "Weddings Conducted",
            value: data.weddingsConducted,
          },
          {
            label: "Corporate Events",
            value: data.corporateEvents,
          },
          {
            label: "Years In Business",
            value: data.yearsInBusiness,
          },
          {
            label: "Happy Clients",
            value: data.happyClients,
          },
        ];

        setStats(statsData);
        setCounts(statsData.map(() => 0));
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  useEffect(() => {
    if (!stats.length) return;

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, index) => {
          const target = stats[index].value;

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
  }, [stats]);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Event Statistics
      </h2>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
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