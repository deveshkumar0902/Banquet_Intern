import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import EventStats from "../components/EventStats";

test("renders stats data", () => {
  render(<EventStats />);

  expect(
    screen.getByText(/Events Hosted/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Happy Guests/i)
  ).toBeInTheDocument();
});