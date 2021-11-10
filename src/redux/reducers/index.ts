import { Reducer } from 'redux';

import { Action } from '../actions';
import { Level } from '../../data/risks';

export type State = {
  riskLevel: Level;
};

const initialState: State = {
  riskLevel: 1,
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RISK_LEVEL':
      return {
        ...state,
        riskLevel: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
