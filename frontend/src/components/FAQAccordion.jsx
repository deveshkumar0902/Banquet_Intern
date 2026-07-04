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
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="border rounded-lg shadow mb-4 overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center p-5 font-semibold text-left bg-white hover:bg-gray-100"
            onClick={() => toggleFAQ(index)}
          >
            <span>{faq.question}</span>

            <span className="text-2xl font-bold">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <div className="p-5 bg-gray-50">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default FAQAccordion;