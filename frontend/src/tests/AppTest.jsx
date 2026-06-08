import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders hero text", () => {
  render(<App />);

  expect(
    screen.getByText("Welcome to Banquet Hall")
  ).toBeInTheDocument();
});