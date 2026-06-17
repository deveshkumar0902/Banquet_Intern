import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Testimonials from "../components/Testimonials";

test("renders at least one testimonial", () => {
  render(<Testimonials />);

  expect(
    screen.getByText(/Rahul Sharma/i)
  ).toBeInTheDocument();
});