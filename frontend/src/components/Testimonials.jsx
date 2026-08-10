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
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-purple-600 font-semibold">
            Client Reviews
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
            Every celebration is special to us. Here's what some of our
            clients have to say about their experience with Royal Banquet Hall.
          </p>

        </div>

        {/* Testimonial Card */}

        <div className="max-w-4xl mx-auto">

          <div className="relative bg-gray-50 rounded-3xl shadow-xl px-8 md:px-16 py-12 text-center border border-gray-100">

            {/* Quote */}

            <div className="text-7xl text-purple-200 font-serif leading-none">
              "
            </div>

            {/* Stars */}

            <div className="flex justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="text-yellow-400 text-2xl"
                >
                  ★
                </span>
              ))}
            </div>

            {/* Review */}

            <p className="mt-8 text-xl md:text-2xl text-gray-700 leading-9 italic">
              "{testimonial.review}"
            </p>

            {/* Customer */}

            <div className="mt-10">

              <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-700">
                  {testimonial.name.charAt(0)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-4">
                {testimonial.name}
              </h3>

              <p className="text-purple-600 font-medium mt-1">
                {testimonial.event}
              </p>

            </div>

            {/* Navigation */}

            <div className="flex justify-center gap-4 mt-10">

              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-purple-200 text-purple-700 hover:bg-[#7C3AED] hover:text-white transition"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition"
              >
                →
              </button>

            </div>

          </div>

          {/* Slide Indicators */}

          <div className="flex justify-center gap-2 mt-7">

            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-8 bg-[#7C3AED]"
                    : "w-2 bg-gray-300"
                }`}
              ></button>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;