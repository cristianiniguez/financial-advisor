import { useSelector } from 'react-redux';

import risks from '../../data/risks';
import { State } from '../../redux/reducers';

const RiskLevelTable = () => {
  const storedLevel = useSelector<State>((state) => state?.riskLevel);

  return (
    <table className='unstriped'>
      <thead>
        <tr>
          <th className='text-center'>Risk</th>
          <th className='text-center'>Bonds %</th>
          <th className='text-center'>Large Cap %</th>
          <th className='text-center'>Mid Cap %</th>
          <th className='text-center'>Foreign %</th>
          <th className='text-center'>Small Cap %</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((risk) => (
          <tr
            key={`rl-tr-${risk.level}`}
            style={{ backgroundColor: risk.level === storedLevel ? 'skyblue' : 'transparent' }}
          >
            <td className='text-right'>{risk.level}</td>
            <td className='text-right'>{risk.bonds * 100}</td>
            <td className='text-right'>{risk.largeCap * 100}</td>
            <td className='text-right'>{risk.midCap * 100}</td>
            <td className='text-right'>{risk.foreign * 100}</td>
            <td className='text-right'>{risk.smallCap * 100}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RiskLevelTable;
