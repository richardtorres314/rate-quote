import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { RateQuote } from './entities/RateQuote';
import QuoteForm from './form/Form';
import { RootState } from './redux';
import { listQuote } from './redux/modules/quote';
import QuoteTable from './table/Table';

interface Props {
  quotes: RateQuote[];
  listQuote: (quotes: RateQuote[]) => { type: string, payload: RateQuote[]; };
}

function UnconnectedApp(props: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <Container className="py-4">
      <QuoteForm listQuote={props.listQuote} setLoading={setLoading} />
      <QuoteTable rateQuotes={props.quotes} loading={loading} />
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  quotes: state.quote.quotes
});

const mapDispatchToProps = { listQuote };

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp);

export default App;
