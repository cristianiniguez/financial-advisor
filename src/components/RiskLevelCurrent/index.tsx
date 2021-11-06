import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { State } from '../../redux/reducers';
import risks, { Level } from '../../data/risks';

const RiskLevelCurrent = () => {
  const storedLevel = useSelector<State, Level>((state) => state.riskLevel);
  const matchedRisk = risks.find((riskLevel) => riskLevel.level === storedLevel);

  if (!matchedRisk) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <h5>Risk Level {matchedRisk.level}</h5>
      <table>
        <thead>
          <tr>
            <th>Bonds</th>
            <th>Large Cap</th>
            <th>Mid Cap</th>
            <th>Foreign</th>
            <th>Small Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{matchedRisk.bonds * 100}%</td>
            <td>{matchedRisk.largeCap * 100}%</td>
            <td>{matchedRisk.midCap * 100}%</td>
            <td>{matchedRisk.foreign * 100}%</td>
            <td>{matchedRisk.smallCap * 100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RiskLevelCurrent;
