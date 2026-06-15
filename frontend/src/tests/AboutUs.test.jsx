import { render } from "@testing-library/react";
import AboutUs from "../pages/AboutUs";
import { test, expect } from "vitest";

test("matches AboutUs snapshot", () => {
  const { container } = render(
    <AboutUs />
  );

  expect(container).toMatchSnapshot();
});