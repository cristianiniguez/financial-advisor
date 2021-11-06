import { Reducer } from 'redux';

import { Action } from '../actions';
import { Portfolio, Level } from '../../data/risks';

export type State =
  | {
      riskLevel: Level;
      currentPortfolio: Portfolio;
    }
  | undefined;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_RISK_LEVEL':
      return (
        state && {
          ...state,
          riskLevel: action.payload,
        }
      );
    default:
      return state;
  }
};

export default reducer;
