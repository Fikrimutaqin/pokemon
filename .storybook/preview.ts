import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../src/store/store';

// Initialize a store instance for Storybook
const store = makeStore();

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(Provider, { store }, React.createElement(Story))
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },
};

export default preview;