import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from './styledComponents';
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </Router>,
  document.getElementById('root')
);
