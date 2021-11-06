import { Category, Level } from '../../data/risks';

export type Action =
  | {
      type: 'SET_RISK_LEVEL';
      payload: Level;
    }
  | {
      type: 'SET_CURRENT_AMOUNT';
      payload: {
        category: Category;
        amount: number;
      };
    };

export const setRiskLevel = (level: Level): Action => ({
  type: 'SET_RISK_LEVEL',
  payload: level,
});

export const setCurrentAmount = (category: Category, amount: number): Action => ({
  type: 'SET_CURRENT_AMOUNT',
  payload: { category, amount },
});
