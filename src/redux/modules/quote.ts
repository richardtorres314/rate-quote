import { RateQuote } from '../../entities/RateQuote';

type QuoteState = {
  quotes: RateQuote[];
};

const initialState: QuoteState = {
  quotes: []
};

export const listQuote = (quotes: RateQuote[]) => ({
  type: 'quote/LIST_QUOTE',
  payload: quotes
});

type QuoteAction = ReturnType<typeof listQuote>;

export function quoteReducer(state = initialState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'quote/LIST_QUOTE':
      return { quotes: action.payload };
    default:
      return state;
  }
}
