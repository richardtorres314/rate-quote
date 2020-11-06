import React, { Fragment } from 'react';
import { Spinner, Table } from 'react-bootstrap';

import { RateQuote } from '../entities/RateQuote';

interface Props {
  loading: boolean;
  rateQuotes: RateQuote[];
}

export default function QuoteTable(props: Props) {
  return (
    <Table className="border" data-testid="quote-table" responsive>
      <thead>
        <tr>
          <th>Lender</th>
          <th>Product</th>
          <th>Rate</th>
          <th>Closing Costs</th>
          <th>Monthly Payment</th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        {props.rateQuotes.map((rateQuote, index) => (
          <Fragment key={`rate-quote-${index}`}>
            <tr>
              <td>{rateQuote.lenderName}</td>
              <td>{rateQuote.loanType}</td>
              <td>{rateQuote.interestRate}%</td>
              <td>${Math.round(rateQuote.closingCosts).toLocaleString()}</td>
              <td>${Math.round(rateQuote.monthlyPayment).toLocaleString()}</td>
              <td>{rateQuote.apr.toFixed(2)}%</td>
            </tr>
          </Fragment>
        ))}
        {
          props.loading === true &&
          <tr>
            <td colSpan={6} className="text-center p-4 text-muted">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading&hellip;</span>
              </Spinner>
            </td>
          </tr>
        }
        {
          props.rateQuotes.length === 0 &&
          props.loading === false &&
          <tr>
            <td colSpan={6} className="text-center p-4 text-muted">
              <p className="mb-0">Complete the form above to see rates.</p>
            </td>
          </tr>
        }
      </tbody>
    </Table>
  );
}
