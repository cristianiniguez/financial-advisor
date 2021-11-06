import { useSelector } from 'react-redux';

import { State } from '../redux/reducers';
import risks, { Risk } from '../data/risks';

const useCurrentRisk = (): Risk | undefined => {
  const matchedRisk = useSelector<State, Risk | undefined>((state) =>
    risks.find((risk) => risk.level === state.riskLevel),
  );

  return matchedRisk;
};

export default useCurrentRisk;
