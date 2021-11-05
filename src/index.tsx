import React from 'react';
import ReactDOM from 'react-dom';

import App from './router/App';

import 'foundation-sites/dist/css/foundation.min.css';
import './styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
