import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      await response.json();

      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
    >
      <div className="mb-7">
        <p className="uppercase tracking-[3px] text-sm text-[#7C3AED] font-semibold">
          Send Us A Message
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          Get In Touch
        </h2>

        <p className="text-gray-500 mt-2">
          Have a question or planning an event? We'd love to hear from you.
        </p>
      </div>

      {/* Name */}

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email + Phone */}

      <div className="grid md:grid-cols-2 gap-5 mb-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>

          <input
            type="tel"
            placeholder="10 digit phone number"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

      </div>

      {/* Subject */}

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Subject
        </label>

        <input
          type="text"
          placeholder="What would you like to ask?"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
          {...register("subject", {
            required: "Subject is required",
          })}
        />

        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Message
        </label>

        <textarea
          rows="5"
          placeholder="Tell us about your event..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
          {...register("message", {
            required: "Message is required",
          })}
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;