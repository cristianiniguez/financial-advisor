import risks from './risks';
import { round } from '../utils';

describe('data', () => {
  test('every risk level values has a total of 100%', () => {
    const totals = risks.map(({ level, ...percents }) =>
      round(Object.values(percents).reduce((a, b) => a + b, 0)),
    );

    totals.forEach((total) => {
      expect(total).toBe(1);
    });
  });
});
