import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Contact from "../pages/Contact";

test("renders Google Map iframe", () => {
  render(<Contact />);

  const map = screen.getByTitle(/Google Map/i);

  expect(map).toBeInTheDocument();
});