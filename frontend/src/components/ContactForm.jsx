import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-3xl font-bold mb-6">
          Contact Us
        </h2>

        <div className="mb-4">
          <label>Name</label>
          <input
            className="border p-2 w-full"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label>Email</label>

          <input
            className="border p-2 w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label>Phone</label>

          <input
            className="border p-2 w-full"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />

          {errors.phone && (
            <p className="text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label>Subject</label>

          <input
            className="border p-2 w-full"
            {...register("subject", {
              required: "Subject is required",
            })}
          />

          {errors.subject && (
            <p className="text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label>Message</label>

          <textarea
            rows="5"
            className="border p-2 w-full"
            {...register("message")}
          />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >  
            {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      
    </>
  );
}

export default ContactForm;