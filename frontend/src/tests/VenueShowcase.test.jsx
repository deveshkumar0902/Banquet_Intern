import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import VenueShowcase from "../components/VenueShowcase";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "grand-ballroom",
          name: "Grand Ballroom",
          capacity: 500,
          description: "Test venue",
          image: "/test.jpg",
          features: ["Feature 1"],
        },
      ]),
  })
);

test("renders venue data", async () => {
  render(<VenueShowcase />);

  expect(
    await screen.findByText("Grand Ballroom")
  ).toBeInTheDocument();
});