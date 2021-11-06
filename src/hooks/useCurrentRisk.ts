import { useSelector } from 'react-redux';

import { State } from '../redux/reducers';
import { Risk } from '../data/risks';
import { getRiskByLevel } from '../utils';

const useCurrentRisk = (): Risk | undefined => {
  const matchedRisk = useSelector<State, Risk | undefined>((state) =>
    getRiskByLevel(state.riskLevel),
  );

  return matchedRisk;
};

export default useCurrentRisk;
