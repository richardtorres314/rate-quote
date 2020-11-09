import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { render, screen } from '@testing-library/react';

import App from './App';
import rootReducer from './redux';

const store = createStore(rootReducer, {});

it('should render the button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const form = screen.getByTestId('quote-form');
  expect(form).toBeDefined();

  const table = screen.getByTestId('quote-table');
  expect(table).toBeDefined();
});
