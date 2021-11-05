import riskLevels from '../../data/riskLevels';

const RiskLevelTable = () => {
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
        {riskLevels.map((riskLevel) => (
          <tr key={`rl-tr-${riskLevel.level}`}>
            <td className='text-right'>{riskLevel.level}</td>
            <td className='text-right'>{riskLevel.bonds * 100}</td>
            <td className='text-right'>{riskLevel.largeCap * 100}</td>
            <td className='text-right'>{riskLevel.midCap * 100}</td>
            <td className='text-right'>{riskLevel.foreign * 100}</td>
            <td className='text-right'>{riskLevel.smallCap * 100}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RiskLevelTable;
