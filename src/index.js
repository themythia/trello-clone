import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Nav from './components/Nav';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.sass';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Nav />
    <App />
  </Provider>,
  document.getElementById('root')
);
