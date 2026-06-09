import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EnquiryForm from "../components/EnquiryForm";
test("shows validation errors when form is submitted empty", async () => {
  render(<EnquiryForm />);

  const submitButton = screen.getByRole("button", {
    name: /submit enquiry/i,
  });

  await userEvent.click(submitButton);

  expect(
    screen.getByText("Event Type is required")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Event Name is required")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Guest count is required")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Name is required")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Phone number is required")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Email is required")
  ).toBeInTheDocument();
});
