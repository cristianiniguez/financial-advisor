import { useSelector, useDispatch } from 'react-redux';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import risks, { Level } from '../../data/risks';
import { State } from '../../redux/reducers';
import { setRiskLevel } from '../../redux/actions';

const RiskLevelSelect = () => {
  const storedLevel = useSelector<State, Level>((state) => state.riskLevel);
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
              role='button'
              color={Colors.PRIMARY}
              isHollow={risk.level !== storedLevel}
              isExpanded
              onClick={() => dispatch(setRiskLevel(risk.level))}
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
