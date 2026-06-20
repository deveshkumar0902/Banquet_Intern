import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
const fallbackImages = {
  "grand-ballroom": "https://picsum.photos/600/400?1",
  "garden-lawn": "https://picsum.photos/600/400?2",
  "mini-hall": "https://picsum.photos/600/400?3",
};

function VenueShowcase() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/venues")
        .then((res) => {
        console.log("Status:", res.status);
        return res.json();
        })
        .then((data) => {
        console.log("VENUES DATA:", data);
        console.log("IS ARRAY:", Array.isArray(data));
        console.log("LENGTH:", data.length);

        setVenues(data);
        })
        .catch((err) => {
        console.error("FETCH ERROR:", err);
        });
    }, []);

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Venue Showcase
      </h2>
      

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
                768: {
                slidesPerView: 2,
                },
            }}
            >
            {venues.map((venue) => (
                <SwiperSlide key={venue.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img
                    src={fallbackImages[venue.id]}
                    alt={venue.name}
                    className="w-full h-64 object-cover"
                    />

                    <div className="p-5">
                    <h3 className="text-2xl font-bold text-purple-700">
                        {venue.name}
                    </h3>

                    <p className="mt-2 text-gray-600">
                        Capacity: {venue.capacity} Guests
                    </p>

                    <p className="mt-3 text-gray-700">
                        {venue.description}
                    </p>

                    <ul className="mt-4 list-disc list-inside text-gray-600">
                        {venue.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
      </div>
    </section>
  );
}

export default VenueShowcase;