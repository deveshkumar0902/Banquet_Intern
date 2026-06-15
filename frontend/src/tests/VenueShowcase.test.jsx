import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VenueShowcase from "../components/VenueShowcase";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "grand-ballroom",
          name: "Grand Ballroom",
          capacity: 500,
          description: "Large indoor venue",
          image: "/images/venues/ballroom.jpg",
          features: ["AC Hall"],
        },
      ]),
  })
);

test("renders venue showcase heading", async () => {
  render(<VenueShowcase />);

  expect(
    screen.getByText(/Venue Showcase/i)
  ).toBeInTheDocument();
});