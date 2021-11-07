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
      sortedPositiveDiffs[0].value -= firstNegativeDiff.value;
      const [, ...nonZeroNegativeDiffs] = sortedNegativeDiffs;
      sortedNegativeDiffs = nonZeroNegativeDiffs;

      transfers.push({ ...newTransfer, value: firstNegativeDiff.value });
    } else if (firstPositiveDiff.value < firstNegativeDiff.value) {
      sortedNegativeDiffs[0].value -= firstPositiveDiff.value;
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

export const getResults = (portfolio: Portfolio, risk: Risk) => {
  const newAmounts = getNewAmounts(portfolio, risk);

  const diffs = {
    /* using rounded numbers in case there are very small amounts on portfolio */
    bonds: round(newAmounts.bonds - portfolio.bonds),
    largeCap: round(newAmounts.largeCap - portfolio.largeCap),
    midCap: round(newAmounts.midCap - portfolio.midCap),
    foreign: round(newAmounts.foreign - portfolio.foreign),
    smallCap: round(newAmounts.smallCap - portfolio.smallCap),
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
