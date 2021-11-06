import { Reducer } from 'redux';

import { Action } from '../actions';
import { Portfolio, Level } from '../../data/risks';

export type State = {
  riskLevel: Level;
  currentPortfolio: Portfolio;
};

const initialState: State = {
  riskLevel: 1,
  currentPortfolio: {
    bonds: 0,
    largeCap: 0,
    midCap: 0,
    foreign: 0,
    smallCap: 0,
  },
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RISK_LEVEL':
      return {
        ...state,
        riskLevel: action.payload,
      };
    case 'SET_CURRENT_AMOUNT':
      return {
        ...state,
        currentPortfolio: {
          ...state.currentPortfolio,
          [action.payload.category]: action.payload.amount,
        },
      };
    default:
      return state;
  }
};

export default reducer;
