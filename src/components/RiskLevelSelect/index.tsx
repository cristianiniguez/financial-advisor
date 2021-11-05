import { useSelector, useDispatch } from 'react-redux';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import riskLevels from '../../data/riskLevels';
import { State } from '../../redux/reducers';
import { setRiskLevel } from '../../redux/actions';

const RiskLevelSelect = () => {
  const storedLevel = useSelector<State>((state) => state?.riskLevel);
  const dispatch = useDispatch();

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
              isHollow={riskLevel.level !== storedLevel}
              onClick={() => dispatch(setRiskLevel(riskLevel.level))}
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
