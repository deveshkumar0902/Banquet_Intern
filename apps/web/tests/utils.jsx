import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

/** Renders `ui` inside a router at `route`. */
export const renderWithRouter = (ui, { route = '/' } = {}) =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
