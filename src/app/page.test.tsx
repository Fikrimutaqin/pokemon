// vitest - jest for unit testing 
import { describe, it, expect } from 'vitest';
// @testing-library/react - react testing library
import { render, screen } from '@testing-library/react';
// @tanstack/react-query - tanstack query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// @reduxjs/toolkit - redux toolkit
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
// Page
import Home from './page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const store = makeStore();

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </Provider>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeDefined();
  });
});
