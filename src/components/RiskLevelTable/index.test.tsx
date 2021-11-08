import RiskLevelTable from '.';
import { render } from '../../utils/test';

describe('<RiskLevelTable />', () => {
  test('renders with 10 rows and first row highlighted', () => {
    /* renders */
    const component = render(<RiskLevelTable />);
    expect(component.container).toBeDefined();

    /* has 10 rows */
    const table = component.getByRole('table');
    const rows = table.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(10);

    /* first row highlighted */
    const firstRow = rows[0];
    expect(firstRow).not.toHaveStyle({ backgroundColor: 'transparent' });
  });
});
