import Calculator from '.';
import { render } from '../../utils/test';

describe('<Calculator />', () => {
  test('renders', () => {
    const component = render(<Calculator />);
    expect(component.container).toBeDefined();
  });

  test('renders with zeros on number inputs', () => {
    const component = render(<Calculator />);
    const table = component.getByRole('table');
    const inputs = table.querySelectorAll('input[type="number"]');

    inputs.forEach((input) => {
      expect(input).toHaveValue(0);
    });
  });

  test('renders with nothing on transfers', () => {
    const component = render(<Calculator />);
    const transfers = component.container.querySelector('.calculator__transfers ul');
    expect(transfers).toBeEmptyDOMElement();
  });
});
