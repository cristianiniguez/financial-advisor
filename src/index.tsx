import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './router/App';
import reducers from './redux/reducers';

import 'foundation-sites/dist/css/foundation.min.css';
import './styles.scss';

const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__?.());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
