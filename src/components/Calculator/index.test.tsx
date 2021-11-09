import { fireEvent } from '@testing-library/react';

import Calculator from '.';
import { render } from '../../utils/test';

describe('<Calculator />', () => {
  test('renders', () => {
    const component = render(<Calculator />);
    expect(component.container).toBeDefined();
  });

  test('renders with zeros on number inputs', () => {
    const component = render(<Calculator />);
    const inputs = component.getAllByLabelText('current');

    inputs.forEach((input) => {
      expect(input).toHaveValue(0);
    });
  });

  test('renders with nothing on transfers', () => {
    const component = render(<Calculator />);
    const transfers = component.container.querySelector('.calculator__transfers');
    expect(transfers).toBeEmptyDOMElement();
  });

  describe('when an input value change', () => {
    test('shows new value and shows something on transfers', () => {
      const component = render(<Calculator />);
      const value = '100';

      const inputs = component.getAllByLabelText('current');
      const firstInput = inputs[0];
      fireEvent.change(firstInput, { target: { value } });

      expect((firstInput as HTMLInputElement).value).toBe(value);

      const transfers = component.container.querySelector('.calculator__transfers');
      expect(transfers).not.toBeEmptyDOMElement();
    });
  });
});
