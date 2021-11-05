export type Action = {
  type: 'SET_RISK_LEVEL';
  payload: number;
};

export const setRiskLevel = (payload: number): Action => ({
  type: 'SET_RISK_LEVEL',
  payload,
});
