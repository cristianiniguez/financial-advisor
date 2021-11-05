import { useState } from 'react';
import { Button, Cell, Colors, Grid, GridContainer } from 'react-foundation';
import { Link } from 'react-router-dom';

import riskLevels from '../../data/riskLevels';

const RiskLevelSelect = () => {
  const [level, setLevel] = useState(riskLevels[0].level);

  return (
    <GridContainer>
      <Grid>
        <Cell small={8} offsetOnSmall={2}>
          <h4 className='text-center'>Please select a Risk Level for your Investment Portfolio</h4>
          <Grid alignY='bottom' className='grid-padding-x'>
            <Cell small={10} className='risk-level__selector'>
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
            </Cell>
            <Cell small={2}>
              <Link to='/calculator'>
                <Button color={Colors.SUCCESS}>Continue</Button>
              </Link>
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    </GridContainer>
  );
};

export default RiskLevelSelect;
