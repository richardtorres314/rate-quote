import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';

interface RateQuery {
  loanSize: string;
  creditScore: string;
  propertyType: string;
  occupancy: string;
}

interface RateQuote {
  lenderName: string;
  loanType: string;
  interestRate: number;
  closingCosts: number;
  monthlyPayment: number;
  apr: number;
}

function App() {
  const [quote, setQuote] = useState<RateQuery>({
    loanSize: '',
    creditScore: '',
    propertyType: '',
    occupancy: ''
  });
  const [rateQuotes, setRateQuotes] = useState<RateQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (key: keyof RateQuery, value: string) => {
    setQuote(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      let params = [];
      let key: keyof RateQuery;

      for (key in quote) {
        params.push(`${key}=${quote[key]}`);
      }

      const response = await fetch(`https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?${params.join('&')}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `OU-AUTH ${process.env.REACT_APP_TOKEN}`
        }
      });
      const { rateQuotes } = await response.json();
      setLoading(false);
      setRateQuotes(rateQuotes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="py-4">
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="form-body">
          <Form.Row>
            <Form.Group as={Col} controlId="loan-size">
              <Row noGutters>
                <Col className="d-flex align-items-center justify-content-end mr-2">
                  <Form.Label className="mb-0">Loan Size</Form.Label>
                </Col>
                <Col>
                  <Form.Control required onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput('loanSize', e.currentTarget.value)} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} controlId="property-type">
              <Row noGutters>
                <Col className="d-flex align-items-center justify-content-end mr-2">
                  <Form.Label className="mb-0">Property Type</Form.Label>
                </Col>
                <Col>
                  <Form.Control required as="select" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInput('propertyType', e.currentTarget.value)}>
                    <option value="">Select a property type</option>
                    <option value="SingleFamily">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="MultiFamily">Multi Family</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </Form.Row>
          <Row>
            <Col>
              <Form.Group controlId="credit-score">
                <Row noGutters>
                  <Col className="d-flex align-items-center justify-content-end mr-2">
                    <Form.Label className="mb-0">Credit Score</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control required onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput('creditScore', e.currentTarget.value)} />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="occupancy">
                <Row noGutters>
                  <Col className="d-flex align-items-center justify-content-end mr-2">
                    <Form.Label className="mb-0">Occupancy</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control required as="select" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInput('occupancy', e.currentTarget.value)}>
                      <option value="">Select an occupancy</option>
                      <option value="Primary">Primary</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Investment">Investment</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="form-footer text-right">
          <Button type="submit" className="form__quote-button">Quote Rates</Button>
        </div>
      </Form>

      <Table className="border">
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
          {rateQuotes.map((rateQuote, index) => (
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
            loading === true &&
            <tr>
              <td colSpan={6} className="text-center p-4 text-muted">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading&hellip;</span>
                </Spinner>
              </td>
            </tr>
          }
          {
            rateQuotes.length === 0 &&
            loading === false &&
            <tr>
              <td colSpan={6} className="text-center p-4 text-muted">
                <p className="mb-0">Complete the form above to see rates.</p>
              </td>
            </tr>
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
