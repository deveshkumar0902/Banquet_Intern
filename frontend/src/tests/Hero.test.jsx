import { render } from "@testing-library/react";
import Hero from "../components/Hero";
import { test, expect } from "vitest";

test("matches hero snapshot", () => {
  const { container } = render(<Hero />);
  expect(container).toMatchSnapshot();
});