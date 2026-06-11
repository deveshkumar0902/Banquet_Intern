import { render } from "@testing-library/react";
import Services from "../pages/Services";
import { test, expect } from "vitest";

test("matches Services snapshot", () => {
  const { container } = render(
    <Services />
  );

  expect(container).toMatchSnapshot();
});