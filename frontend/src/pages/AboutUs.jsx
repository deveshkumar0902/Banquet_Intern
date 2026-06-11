import { useEffect, useState } from "react";

function AboutUs() {
  const [about, setAbout] = useState({
    description:
      "Royal Banquet Hall is a premium venue for weddings, birthdays, anniversaries, and corporate events. We provide elegant décor, spacious halls, quality catering, and exceptional customer service to make every event memorable.",
  });

  useEffect(() => {
    fetch("http://localhost:5000/about")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Endpoint not available");
        }
        return res.json();
      })
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => {
        console.log("Using mock About Us data");
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-purple-700">
        About Us
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg text-gray-700 leading-relaxed">
          {about.description}
        </p>
      </div>
    </div>
  );
}

export default AboutUs;