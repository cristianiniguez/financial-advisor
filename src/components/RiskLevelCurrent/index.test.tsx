import RiskLevelCurrent from '.';
import { render } from '../../utils/test';

import risks from '../../data/risks';
import { percentFormat } from '../../utils';

describe('<RiskLevelCurrent />', () => {
  test('renders with first risk level data', () => {
    /* renders */
    const component = render(<RiskLevelCurrent />);
    expect(component.container).toBeDefined();

    const table = component.getByRole('table');
    const cells = table.querySelectorAll('tbody td');

    expect(cells[0]).toHaveTextContent(percentFormat(risks[0].bonds));
    expect(cells[1]).toHaveTextContent(percentFormat(risks[0].largeCap));
    expect(cells[2]).toHaveTextContent(percentFormat(risks[0].midCap));
    expect(cells[3]).toHaveTextContent(percentFormat(risks[0].foreign));
    expect(cells[4]).toHaveTextContent(percentFormat(risks[0].smallCap));
  });
});
