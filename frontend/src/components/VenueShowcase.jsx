import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const fallbackImages = {
  "grand-ballroom":
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200",
  "garden-lawn":
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200",
  "mini-hall":
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200",
};

function VenueShowcase() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="venues"
      className="py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <p className="uppercase tracking-[4px] text-center text-purple-600 font-semibold">
          Our Venues
        </p>

        <h2 className="text-5xl font-bold text-center mt-3">
          Venue Showcase
        </h2>

        <p className="text-gray-500 text-center mt-4 max-w-2xl mx-auto">
          Choose from our elegant banquet halls designed for weddings,
          receptions, corporate events and unforgettable celebrations.
        </p>

        {/* Slider */}

        <div className="mt-16">

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={35}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {venues.map((venue) => (
              <SwiperSlide key={venue.id}>

                <div className="group overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-3 hover:shadow-2xl">

                  {/* Image */}

                  <div className="relative overflow-hidden">

                    <img
                      src={fallbackImages[venue.id]}
                      alt={venue.name}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute bottom-5 left-5">

                      <h3 className="text-3xl font-bold text-white">
                        {venue.name}
                      </h3>

                    </div>

                  </div>

                  {/* Card */}

                  <div className="p-7">

                    <div className="flex justify-between items-center">

                      <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        {venue.capacity} Guests
                      </span>

                      <span className="text-yellow-500 text-xl">
                        ★★★★★
                      </span>

                    </div>

                    <p className="mt-6 text-gray-600 leading-7">
                      {venue.description}
                    </p>

                    <div className="mt-6">

                      <h4 className="font-semibold mb-3">
                        Features
                      </h4>

                      <div className="grid gap-3">

                        {venue.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3"
                          >
                            <div className="h-2 w-2 rounded-full bg-purple-600"></div>

                            <span className="text-gray-600">
                              {feature}
                            </span>
                          </div>
                        ))}

                      </div>

                    </div>

                    <button className="mt-8 w-full rounded-full bg-[#7C3AED] py-3 font-semibold text-white transition hover:bg-[#6D28D9]">
                      View Details
                    </button>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </div>
    </section>
  );
}

export default VenueShowcase;