import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import QuoteForm from './Form';

beforeAll(() => {
  jest.spyOn(window, 'fetch');
});

beforeEach(() => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  (window.fetch as any).mockImplementation(() => mockFetchPromise as any);
});

it('should render the form', async () => {
  const props = {
    setLoading: jest.fn(),
    listQuote: jest.fn()
  };

  render(<QuoteForm {...props} />);

  const quote = {
    loanSize: '100000',
    propertyType: 'SingleFamily',
    creditScore: '680',
    occupancy: 'Primary'
  };

  const loanSizeInput = screen.getByTestId('loan-size');
  fireEvent.change(loanSizeInput, {
    target: {
      value: quote.loanSize
    }
  });

  const propertyTypeInput = screen.getByTestId('property-type');
  fireEvent.change(propertyTypeInput, {
    target: {
      value: quote.propertyType
    }
  });

  const creditScoreInput = screen.getByTestId('credit-score');
  fireEvent.change(creditScoreInput, {
    target: {
      value: quote.creditScore
    }
  });

  const occupancyInput = screen.getByTestId('occupancy');
  fireEvent.change(occupancyInput, {
    target: {
      value: quote.occupancy
    }
  });

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(window.fetch).toHaveBeenCalled();
  expect(loanSizeInput).toHaveValue(quote.loanSize);
  expect(propertyTypeInput).toHaveValue(quote.propertyType);
  expect(creditScoreInput).toHaveValue(quote.creditScore);
  expect(occupancyInput).toHaveValue(quote.occupancy);
});
