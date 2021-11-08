import { fireEvent } from '@testing-library/react';

import { render } from '../../utils/test';
import RiskLevelSelect from '.';

describe('<RiskLevelSelect />', () => {
  test('renders', () => {
    const component = render(<RiskLevelSelect />);
    expect(component.container).toBeDefined();
  });

  test('only first button has to be selected by default', () => {
    const component = render(<RiskLevelSelect />);
    const buttons = component.getAllByRole('button');

    expect(buttons[0]).not.toHaveClass('hollow');
    expect(buttons[1]).toHaveClass('hollow');
    expect(buttons[2]).toHaveClass('hollow');
    expect(buttons[3]).toHaveClass('hollow');
    expect(buttons[4]).toHaveClass('hollow');
    expect(buttons[5]).toHaveClass('hollow');
    expect(buttons[6]).toHaveClass('hollow');
    expect(buttons[7]).toHaveClass('hollow');
    expect(buttons[8]).toHaveClass('hollow');
    expect(buttons[9]).toHaveClass('hollow');
  });

  test('only second button has to be selected after is clicked', () => {
    const component = render(<RiskLevelSelect />);
    const buttons = component.getAllByRole('button');

    const button2 = buttons[1];
    fireEvent.click(button2);

    expect(buttons[0]).toHaveClass('hollow');
    expect(buttons[1]).not.toHaveClass('hollow');
    expect(buttons[2]).toHaveClass('hollow');
    expect(buttons[3]).toHaveClass('hollow');
    expect(buttons[4]).toHaveClass('hollow');
    expect(buttons[5]).toHaveClass('hollow');
    expect(buttons[6]).toHaveClass('hollow');
    expect(buttons[7]).toHaveClass('hollow');
    expect(buttons[8]).toHaveClass('hollow');
    expect(buttons[9]).toHaveClass('hollow');
  });
});
