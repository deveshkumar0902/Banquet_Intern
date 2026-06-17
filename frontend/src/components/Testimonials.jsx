import { useEffect, useState } from "react";

const mockTestimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    event: "Wedding",
    review:
      "Amazing venue and excellent management. Our wedding was flawless. Everything was organized perfectly.",
  },
  {
    id: 2,
    name: "Priya Gupta",
    event: "Engagement",
    review:
      "Beautiful decorations and professional staff. The event was memorable and stress-free.",
  },
  {
    id: 3,
    name: "Amit Verma",
    event: "Corporate Event",
    review:
      "Great experience. The team handled everything perfectly and our guests were impressed.",
  },
];

function Testimonials() {
  const [testimonials] = useState(mockTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % testimonials.length
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrent(
      current === 0
        ? testimonials.length - 1
        : current - 1
    );
  };

  const nextSlide = () => {
    setCurrent(
      (current + 1) % testimonials.length
    );
  };

  const testimonial = testimonials[current];

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Testimonials
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center relative">
          <h3 className="text-2xl font-bold text-purple-700">
            {testimonial.name}
          </h3>

          <p className="text-gray-500 mt-2">
            {testimonial.event}
          </p>

          <p className="mt-6 text-gray-700 text-lg italic">
            "{testimonial.review}"
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;