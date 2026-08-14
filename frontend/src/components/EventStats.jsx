import { useEffect, useState } from "react";

function EventStats() {
  const [stats, setStats] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
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
    <section
      id="stats"
      className="py-24 bg-[#7C3AED]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center text-white mb-14">

          <p className="uppercase tracking-[4px] text-purple-200 font-semibold">
            Our Experience
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Numbers That Tell Our Story
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-purple-100 leading-7">
            Years of experience, countless celebrations and thousands
            of happy guests have made Royal Banquet Hall a trusted
            choice for memorable events.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">

          {stats.map((stat, index) => (

            <div
              key={stat.label}
              className="group bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Number */}

              <h3 className="text-4xl md:text-5xl font-extrabold text-[#7C3AED]">
                {counts[index].toLocaleString()}+
              </h3>

              {/* Divider */}

              <div className="w-10 h-1 bg-purple-200 mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300"></div>

              {/* Label */}

              <p className="mt-4 text-gray-700 font-semibold">
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