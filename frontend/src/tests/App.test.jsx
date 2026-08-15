import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders hero section", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /celebrate.*your dream.*wedding/i,
    })
  ).toBeInTheDocument();
});