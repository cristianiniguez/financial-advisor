import { Navigate } from 'react-router';

import useCurrentRisk from '../../hooks/useCurrentRisk';

const RiskLevelCurrent = () => {
  const risk = useCurrentRisk();

  if (!risk) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <h5>Risk Level {risk.level}</h5>
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
            <td>{risk.bonds * 100}%</td>
            <td>{risk.largeCap * 100}%</td>
            <td>{risk.midCap * 100}%</td>
            <td>{risk.foreign * 100}%</td>
            <td>{risk.smallCap * 100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RiskLevelCurrent;
