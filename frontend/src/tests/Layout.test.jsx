import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

describe("Layout Components", () => {
  test("matches Header snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("matches Footer snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("matches Container snapshot", () => {
    const { container } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });
});