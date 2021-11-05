import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { State } from '../../redux/reducers';
import riskLevels from '../../data/riskLevels';

const RiskLevelCurrent = () => {
  const storedLevel = useSelector<State>((state) => state?.riskLevel);
  const matchedLevel = riskLevels.find((riskLevel) => riskLevel.level === storedLevel);

  if (!matchedLevel) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <h5>Risk Level {matchedLevel.level}</h5>
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
            <td>{matchedLevel.bonds * 100}%</td>
            <td>{matchedLevel.largeCap * 100}%</td>
            <td>{matchedLevel.midCap * 100}%</td>
            <td>{matchedLevel.foreign * 100}%</td>
            <td>{matchedLevel.smallCap * 100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RiskLevelCurrent;
