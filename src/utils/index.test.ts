import { getResults } from '.';
import risks, { Allocation } from '../data/risks';

const mockAmount: Allocation = {
  bonds: 1000,
  largeCap: 1000,
  midCap: 1000,
  foreign: 1000,
  smallCap: 1000,
};

describe('getResults', () => {
  test('results have to include new amounts, differences and transfers', () => {
    const results = getResults(mockAmount, risks[0]);
    expect(results).toHaveProperty('newAmounts');
    expect(results).toHaveProperty('diffs');
    expect(results).toHaveProperty('transfers');
  });

  test('sum of values of diff object has to be 0', () => {
    const { diffs } = getResults(mockAmount, risks[0]);

    let sum = 0;
    Object.values(diffs).forEach((v) => (sum += v));

    expect(sum).toBe(0);
  });

  test('results have to be the expected', () => {
    const expectedNewAmounts: Allocation = {
      bonds: 4000,
      largeCap: 1000,
      midCap: 0,
      foreign: 0,
      smallCap: 0,
    };

    const expectedDiffs: Allocation = {
      bonds: 3000,
      largeCap: 0,
      midCap: -1000,
      foreign: -1000,
      smallCap: -1000,
    };

    const { newAmounts, diffs, transfers } = getResults(mockAmount, risks[0]);

    expect(newAmounts).toStrictEqual(expectedNewAmounts);
    expect(diffs).toStrictEqual(expectedDiffs);
    expect(transfers).toHaveLength(3);
  });

  describe('when all allocation values are 0', () => {
    test('newAmounts and diffs values are 0 and there are no transfers', () => {
      const { newAmounts, diffs, transfers } = getResults(
        { bonds: 0, largeCap: 0, midCap: 0, foreign: 0, smallCap: 0 },
        risks[0],
      );

      Object.values(newAmounts).forEach((v) => {
        expect(v).toBe(0);
      });

      Object.values(diffs).forEach((v) => {
        expect(v).toBe(0);
      });

      expect(transfers).toHaveLength(0);
    });
  });
});
