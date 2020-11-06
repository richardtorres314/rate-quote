export interface RateQuote {
	lenderName: string;
	loanType: string;
	interestRate: number;
	closingCosts: number;
	monthlyPayment: number;
	apr: number;
}
