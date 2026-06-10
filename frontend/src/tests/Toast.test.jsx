import { render, screen } from "@testing-library/react";
import { toast, ToastContainer } from "react-toastify";

test("shows success toast", async () => {
  render(<ToastContainer />);

  toast.success("Enquiry submitted successfully!");

  expect(
    await screen.findByText(
      "Enquiry submitted successfully!"
    )
  ).toBeInTheDocument();
});