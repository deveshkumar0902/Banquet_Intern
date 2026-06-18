import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import EventStats from "../components/EventStats";

test("renders stats data", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          eventsHosted: 500,
          guestsServed: 25000,
          weddingsConducted: 300,
          corporateEvents: 120,
          yearsInBusiness: 15,
          happyClients: 450,
        }),
    })
  );

  render(<EventStats />);

  expect(
    await screen.findByText(/Events Hosted/i)
  ).toBeInTheDocument();

  expect(
    await screen.findByText(/Happy Clients/i)
  ).toBeInTheDocument();
});