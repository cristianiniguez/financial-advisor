import { Level } from '../../data/risks';

export type Action = {
  type: 'SET_RISK_LEVEL';
  payload: Level;
};

export const setRiskLevel = (level: Level): Action => ({
  type: 'SET_RISK_LEVEL',
  payload: level,
});
