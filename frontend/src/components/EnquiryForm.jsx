import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/enquiries",
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

      toast.success("Enquiry submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to submit enquiry.");
    }
  };

  return (
    <form
      id="enquiry-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        Quick Enquiry
      </h2>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Event Type
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
            {...register("eventType", {
              required: "Event Type is required",
            })}
          />

          {errors.eventType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Event Name
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
            {...register("eventName", {
              required: "Event Name is required",
            })}
          />

          {errors.eventName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Guests
          </label>

          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
            {...register("guests", {
              required: "Guest count is required",
              min: {
                value: 1,
                message: "Guests must be at least 1",
              },
            })}
          />

          {errors.guests && (
            <p className="text-red-500 text-sm mt-1">
              {errors.guests.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
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

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
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

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED]"
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

        <button
          type="submit"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg font-semibold transition"
        >
          Submit Enquiry
        </button>

      </div>
    </form>
  );
}

export default EnquiryForm;