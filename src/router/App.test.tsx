import { render } from '../utils/test';
import App from './App';

describe('<App />', () => {
  test('renders', () => {
    const component = render(<App />);
    expect(component.container).toBeDefined();
  });
});
