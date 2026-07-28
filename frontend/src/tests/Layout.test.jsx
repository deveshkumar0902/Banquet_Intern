import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

describe("Layout Components", () => {
  it("matches Header snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches Footer snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches Container snapshot", () => {
    const { asFragment } = render(
      <Container>
        <p>Test Content</p>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});