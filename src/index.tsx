import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './router/App';
import reducers, { State } from './redux/reducers';

import 'foundation-sites/dist/css/foundation.min.css';
import './styles.scss';

const initialState: State = {
  riskLevel: 1,
  currentPortfolio: {
    bonds: 0,
    largeCap: 0,
    midCap: 0,
    foreign: 0,
    smallCap: 0,
  },
};

const store = createStore(reducers, initialState, (window as any).__REDUX_DEVTOOLS_EXTENSION__?.());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
