import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/enquiry",
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
    } catch (error) {
      toast.error("Failed to submit enquiry.");
    }
};

  return (
   <> 
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-3xl font-bold mb-6">
        Quick Enquiry
      </h2>

      <div className="mb-4">
        <label>Event Type</label>
        <input
          className="border p-2 w-full"
          {...register("eventType", {
            required: "Event Type is required"
          })}
        />
        {errors.eventType && (
          <p className="text-red-500">
            {errors.eventType.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label>Event Name</label>
        <input
          className="border p-2 w-full"
          {...register("eventName", {
            required: "Event Name is required"
          })}
        />
        {errors.eventName && (
          <p className="text-red-500">
            {errors.eventName.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label>Guests</label>
        <input
            type="number"
            className="border p-2 w-full"
            {...register("guests", {
                required: "Guest count is required",
                min: {
                    value: 1,
                    message: "Guests must be at least 1",
                },
          })}
        />

        {errors.guests && (
            <p className="text-red-500">
                {errors.guests.message}
            </p>
        )}
      </div>

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
        <label>Email</label>
        <input
          className="border p-2 w-full"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        className="bg-purple-700 text-white px-4 py-2 rounded"
        type="submit"
      >
        Submit Enquiry
      </button>
    </form>

    <ToastContainer 
      position = "top-right"
      autoClose = {3000}
    />
  </>
  );
}

export default EnquiryForm;