import { useState } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import riskLevels from '../../data/riskLevels';

const RiskLevelSelect = () => {
  const [level, setLevel] = useState(riskLevels[0].level);

  return (
    <div>
      <Grid className='risk-level__labels'>
        <Cell auto='all'>Low</Cell>
        <Cell auto='all' className='text-right'>
          High
        </Cell>
      </Grid>
      <Grid className='risk-level__buttons'>
        {riskLevels.map((riskLevel) => (
          <Cell auto='all' key={`rl-btn-${riskLevel.level}`}>
            <Button
              color={Colors.PRIMARY}
              isHollow={riskLevel.level !== level}
              onClick={() => setLevel(riskLevel.level)}
            >
              {riskLevel.level}
            </Button>
          </Cell>
        ))}
      </Grid>
    </div>
  );
};

export default RiskLevelSelect;
