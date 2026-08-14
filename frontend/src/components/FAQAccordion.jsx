import { useEffect, useState } from "react";

function FAQAccordion() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/faqs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        return res.json();
      })
      .then((data) => {
        setFaqs(data);
      })
      .catch((err) => {
        console.error("FAQ Fetch Error:", err);
      });
  }, []);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section
      id="faq"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-purple-600 font-semibold">
            FAQ
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Find answers to some of the most common questions about
            our venues, events and services.
          </p>

        </div>

        {/* FAQ List */}

        <div className="space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-purple-300 shadow-lg"
                    : "border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >

                {/* Question */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >

                  <span
                    className={`font-semibold text-lg transition-colors ${
                      isOpen
                        ? "text-[#7C3AED]"
                        : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Plus / Minus */}

                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                      isOpen
                        ? "bg-[#7C3AED] text-white"
                        : "bg-purple-50 text-[#7C3AED]"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>

                </button>

                {/* Answer */}

                {isOpen && (
                  <div className="px-6 pb-6">

                    <div className="h-px bg-gray-100 mb-5"></div>

                    <p className="text-gray-600 leading-7">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FAQAccordion;