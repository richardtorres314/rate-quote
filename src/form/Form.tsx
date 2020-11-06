import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { RateQuote } from '../entities/RateQuote';

interface Props {
  setLoading: (value: boolean) => void;
  listQuote: (quotes: RateQuote[]) => void;
}

interface RateQuery {
  loanSize: string;
  creditScore: string;
  propertyType: string;
  occupancy: string;
}

export default function QuoteForm(props: Props) {
  const [quote, setQuote] = useState<RateQuery>({
    loanSize: '',
    creditScore: '',
    propertyType: '',
    occupancy: ''
  });

  const handleInput = (key: keyof RateQuery, value: string) => {
    setQuote(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      props.setLoading(true);
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
      const { rateQuotes }: { rateQuotes: RateQuote[]; } = await response.json();
      props.setLoading(false);
      props.listQuote(rateQuotes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4" data-testid="quote-form">
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
  );
}
