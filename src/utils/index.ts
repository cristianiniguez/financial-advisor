import risks, { categories, Category, Level, Portfolio, Risk } from '../data/risks';

export const getRiskByLevel = (level: Level): Risk | undefined => {
  return risks.find((risk) => risk.level === level);
};

export const getNewAmounts = (portfolio: Portfolio, risk: Risk): Portfolio => {
  const totalAmount = getTotalAmount(portfolio);

  return {
    bonds: totalAmount * risk.bonds,
    largeCap: totalAmount * risk.largeCap,
    midCap: totalAmount * risk.midCap,
    foreign: totalAmount * risk.foreign,
    smallCap: totalAmount * risk.smallCap,
  };
};

const getTotalAmount = (p: Portfolio): number => {
  return Object.values(p).reduce((a, b) => a + b, 0);
};

const getTransfers = (diffs: Portfolio) => {
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
    return (
      sortedPositiveDiffs.some((diff) => diff.value) ||
      sortedNegativeDiffs.some((diff) => diff.value)
    );
  };

  while (thereAreNonZeroDiffs()) {
    const firstPositiveDiff = sortedPositiveDiffs[0];
    const firstNegativeDiff = sortedNegativeDiffs[0];

    const newTransfer = {
      from: firstNegativeDiff.category,
      to: firstPositiveDiff.category,
    };

    if (firstPositiveDiff.value > firstNegativeDiff.value) {
      sortedPositiveDiffs[0].value -= firstNegativeDiff.value;
      const [, ...nonZeroNegativeDiffs] = negativeDiffs;
      sortedNegativeDiffs = nonZeroNegativeDiffs;

      transfers.push({ ...newTransfer, value: firstNegativeDiff.value });
    } else if (firstPositiveDiff.value < firstNegativeDiff.value) {
      sortedNegativeDiffs[0].value -= firstPositiveDiff.value;
      const [, ...nonZeroPositiveDiffs] = positiveDiffs;
      sortedPositiveDiffs = nonZeroPositiveDiffs;

      transfers.push({ ...newTransfer, value: firstPositiveDiff.value });
    } else {
      const [, ...nonZeroNegativeDiffs] = negativeDiffs;
      sortedNegativeDiffs = nonZeroNegativeDiffs;

      const [, ...nonZeroPositiveDiffs] = positiveDiffs;
      sortedPositiveDiffs = nonZeroPositiveDiffs;

      transfers.push({ ...newTransfer, value: firstPositiveDiff.value });
    }
  }

  return transfers;
};

export const getResults = (portfolio: Portfolio, risk: Risk) => {
  const newAmounts = getNewAmounts(portfolio, risk);

  const diffs = {
    bonds: newAmounts.bonds - portfolio.bonds,
    largeCap: newAmounts.largeCap - portfolio.largeCap,
    midCap: newAmounts.midCap - portfolio.midCap,
    foreign: newAmounts.foreign - portfolio.foreign,
    smallCap: newAmounts.smallCap - portfolio.smallCap,
  };

  const transfers = getTransfers(diffs);

  return {
    newAmounts,
    diffs,
    transfers,
  };
};
