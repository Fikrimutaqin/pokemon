import { render, screen } from '@testing-library/react';
import Home from './page';
import { describe, it, expect } from 'vitest';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
  });
});
