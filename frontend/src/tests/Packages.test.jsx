import { render } from "@testing-library/react";
import Packages from "../components/Packages";

test("Packages component matches snapshot", () => {
  const { container } = render(<Packages />);
  expect(container).toMatchSnapshot();
});