import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import FAQAccordion from "../components/FAQAccordion";

const mockFAQs = [
  {
    id: 1,
    question: "What is the capacity of our banquet hall?",
    answer:
      "Our banquet hall can accommodate up to 500 guests comfortably."
  },
  {
    id: 2,
    question: "Do you provide catering services?",
    answer:
      "Yes, we offer a variety of catering packages."
  }
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockFAQs),
    })
  );
});

test("renders FAQs and expands/collapses answers", async () => {
  render(<FAQAccordion />);

  const question = await screen.findByText(
    "What is the capacity of our banquet hall?"
  );

  expect(question).toBeInTheDocument();

  expect(
    screen.queryByText(
      "Our banquet hall can accommodate up to 500 guests comfortably."
    )
  ).not.toBeInTheDocument();

  fireEvent.click(question);

  await waitFor(() => {
    expect(
      screen.getByText(
        "Our banquet hall can accommodate up to 500 guests comfortably."
      )
    ).toBeInTheDocument();
  });

  fireEvent.click(question);

  await waitFor(() => {
    expect(
      screen.queryByText(
        "Our banquet hall can accommodate up to 500 guests comfortably."
      )
    ).not.toBeInTheDocument();
  });
});