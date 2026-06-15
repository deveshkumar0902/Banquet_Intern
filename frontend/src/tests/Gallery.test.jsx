import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import GalleryPage from "../pages/Gallery";

test("renders gallery heading", () => {
  render(<GalleryPage />);

  expect(
    screen.getByText("Gallery")
  ).toBeInTheDocument();
});