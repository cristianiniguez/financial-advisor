import { Reducer } from 'redux';

import { Action } from '../actions';

export type State =
  | {
      riskLevel: number;
    }
  | undefined;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_RISK_LEVEL':
      return (
        state && {
          riskLevel: action.payload,
        }
      );
    default:
      return state;
  }
};

export default reducer;
