import { render, RenderOptions } from '@testing-library/react';

import { FC, ReactElement } from 'react';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import reducers from '../redux/reducers';

const store = createStore(reducers);

const Provider: FC = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Provider, ...options });

export * from '@testing-library/react';
export { customRender as render };
