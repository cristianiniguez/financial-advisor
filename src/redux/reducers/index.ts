import { Reducer } from 'redux';

import { Action } from '../actions';
import { Allocation, Level } from '../../data/risks';

export type State = {
  riskLevel: Level;
  currentAllocation: Allocation;
};

const initialState: State = {
  riskLevel: 1,
  currentAllocation: {
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
        currentAllocation: {
          ...state.currentAllocation,
          [action.payload.category]: action.payload.amount,
        },
      };
    default:
      return state;
  }
};

export default reducer;
