import React from 'react';
import ReactDOM from 'react-dom';
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './state'
import './index.css';
import App from './App';

const overmind = createOvermind(config, {
  devtools: "localhost:3000"
});

ReactDOM.render((
  <Provider value={overmind}>
    <App />
  </Provider>),
  document.getElementById('root')
);
