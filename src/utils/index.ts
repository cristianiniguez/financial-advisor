import risks, { categories, Category, Level, Allocation, Risk } from '../data/risks';

export const getRiskByLevel = (level: Level): Risk | undefined => {
  return risks.find((risk) => risk.level === level);
};

const getNewAmounts = (allocation: Allocation, risk: Risk): Allocation => {
  const totalAmount = getTotalAmount(allocation);

  return {
    bonds: totalAmount * risk.bonds,
    largeCap: totalAmount * risk.largeCap,
    midCap: totalAmount * risk.midCap,
    foreign: totalAmount * risk.foreign,
    smallCap: totalAmount * risk.smallCap,
  };
};

const getTotalAmount = (allocation: Allocation): number => {
  return Object.values(allocation).reduce((a, b) => a + b, 0);
};

const getTransfers = (diffs: Allocation) => {
  type Transfer = {
    from: Category;
    to: Category;
    value: number;
  };

  type Diff = {
    category: Category;
    value: number;
  };

  const transfers: Transfer[] = [];
  const positiveDiffs: Diff[] = [];
  const negativeDiffs: Diff[] = [];

  categories.forEach((c) => {
    if (diffs[c] > 0) {
      positiveDiffs.push({ category: c, value: diffs[c] });
    }

    if (diffs[c] < 0) {
      negativeDiffs.push({ category: c, value: -diffs[c] });
    }
  });

  let sortedPositiveDiffs = positiveDiffs.sort((a, b) => a.value - b.value);
  let sortedNegativeDiffs = negativeDiffs.sort((a, b) => a.value - b.value);

  const thereAreNonZeroDiffs = () => {
    return sortedPositiveDiffs.length > 0 || sortedNegativeDiffs.length > 0;
  };

  while (thereAreNonZeroDiffs()) {
    const [firstPositiveDiff] = sortedPositiveDiffs;
    const [firstNegativeDiff] = sortedNegativeDiffs;

    const newTransfer = {
      from: firstNegativeDiff.category,
      to: firstPositiveDiff.category,
    };

    if (firstPositiveDiff.value > firstNegativeDiff.value) {
      sortedPositiveDiffs[0].value = round(sortedPositiveDiffs[0].value - firstNegativeDiff.value);
      const [, ...nonZeroNegativeDiffs] = sortedNegativeDiffs;
      sortedNegativeDiffs = nonZeroNegativeDiffs;

      transfers.push({ ...newTransfer, value: firstNegativeDiff.value });
    } else if (firstPositiveDiff.value < firstNegativeDiff.value) {
      sortedNegativeDiffs[0].value = round(sortedNegativeDiffs[0].value - firstPositiveDiff.value);
      const [, ...nonZeroPositiveDiffs] = sortedPositiveDiffs;
      sortedPositiveDiffs = nonZeroPositiveDiffs;

      transfers.push({ ...newTransfer, value: firstPositiveDiff.value });
    } else {
      const [, ...nonZeroNegativeDiffs] = sortedNegativeDiffs;
      sortedNegativeDiffs = nonZeroNegativeDiffs;

      const [, ...nonZeroPositiveDiffs] = sortedPositiveDiffs;
      sortedPositiveDiffs = nonZeroPositiveDiffs;

      transfers.push({ ...newTransfer, value: firstPositiveDiff.value });
    }
  }

  return transfers;
};

export const getResults = (allocation: Allocation, risk: Risk) => {
  const newAmounts = getNewAmounts(allocation, risk);

  const diffs: Allocation = {
    /* using rounded numbers in case there are very small amounts on allocation */
    bonds: round(newAmounts.bonds - allocation.bonds),
    largeCap: round(newAmounts.largeCap - allocation.largeCap),
    midCap: round(newAmounts.midCap - allocation.midCap),
    foreign: round(newAmounts.foreign - allocation.foreign),
    smallCap: round(newAmounts.smallCap - allocation.smallCap),
  };

  const transfers = getTransfers(diffs);

  return {
    newAmounts,
    diffs,
    transfers,
  };
};

export const round = (number: number, decimals: number = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
};

export const percentFormat = (number: number): string => {
  return `${number * 100}%`;
};

export const hasZeroValues = (allocation: Allocation): boolean => {
  return Object.values(allocation).every((value) => value === 0);
};
