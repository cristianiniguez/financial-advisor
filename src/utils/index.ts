import risks, { Level, Portfolio, Risk } from '../data/risks';

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

export const getResults = (portfolio: Portfolio, risk: Risk) => {
  const newAmounts = getNewAmounts(portfolio, risk);

  const diffs = {
    bonds: newAmounts.bonds - portfolio.bonds,
    largeCap: newAmounts.largeCap - portfolio.largeCap,
    midCap: newAmounts.midCap - portfolio.midCap,
    foreign: newAmounts.foreign - portfolio.foreign,
    smallCap: newAmounts.smallCap - portfolio.smallCap,
  };

  return {
    newAmounts,
    diffs,
  };
};
