import { useSelector, useDispatch } from 'react-redux';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import risks from '../../data/risks';
import { State } from '../../redux/reducers';
import { setRiskLevel } from '../../redux/actions';

const RiskLevelSelect = () => {
  const storedLevel = useSelector<State>((state) => state?.riskLevel);
  const dispatch = useDispatch();

  return (
    <div>
      <Grid>
        <Cell auto='all'>Low</Cell>
        <Cell auto='all' className='text-right'>
          High
        </Cell>
      </Grid>
      <Grid className='grid-margin-x'>
        {risks.map((risk) => (
          <Cell auto='all' key={`rl-btn-${risk.level}`}>
            <Button
              color={Colors.PRIMARY}
              isHollow={risk.level !== storedLevel}
              onClick={() => dispatch(setRiskLevel(risk.level))}
              style={{ width: '100%' }}
            >
              {risk.level}
            </Button>
          </Cell>
        ))}
      </Grid>
    </div>
  );
};

export default RiskLevelSelect;
