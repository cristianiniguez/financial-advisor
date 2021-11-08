import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render } from '../utils/test';
import HomePage from './Home';

const Home = () => {
  return (
    <Router>
      <HomePage />
    </Router>
  );
};

describe('<Home />', () => {
  test('renders', () => {
    const component = render(<Home />);
    expect(component.container).toBeDefined();
  });

  test('shows the table by default', () => {
    const component = render(<Home />);
    const table = component.container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  test("doesn't show the graph by default", () => {
    const component = render(<Home />);
    const graph = component.container.querySelector('.donut');
    expect(graph).not.toBeInTheDocument();
  });

  test('hides the graph after clicking on "Watch graph" button', () => {
    const component = render(<Home />);
    const button = component.getByText('Watch graph');
    fireEvent.click(button);

    const table = component.container.querySelector('table');
    expect(table).not.toBeInTheDocument();
  });

  test('shows the graph after clicking on "Watch graph" button', () => {
    const component = render(<Home />);
    const button = component.getByText('Watch graph');
    fireEvent.click(button);

    const graph = component.container.querySelector('.donut');
    expect(graph).toBeInTheDocument();
  });
});
