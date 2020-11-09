import React from 'react';

import { render, screen } from '@testing-library/react';

import QuoteTable from './Table';

it('should render the initial table', () => {
	const props = {
		loading: false,
		rateQuotes: []
	};

	render(<QuoteTable {...props} />);

	const initialTable = screen.getByTestId('initial-table');
	expect(initialTable).toBeDefined();
});

it('should render the loading message', () => {
	const props = {
		loading: true,
		rateQuotes: []
	};

	render(<QuoteTable {...props} />);

	const loadingTable = screen.getByTestId('loading-table');
	expect(loadingTable).toBeDefined();
});

it('shold render the rate quotes', () => {
	const props = {
		loading: false,
		rateQuotes: [
			{
				lenderName: '',
				loanType: '',
				interestRate: 0,
				closingCosts: 0,
				monthlyPayment: 0,
				apr: 0
			}
		]
	};

	render(<QuoteTable {...props} />);
});
