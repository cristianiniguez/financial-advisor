import { ChangeEventHandler, FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import { State } from '../../redux/reducers';
import { setCurrentAmount } from '../../redux/actions';
import { Category, labels, Allocation } from '../../data/risks';
import useCurrentRisk from '../../hooks/useCurrentRisk';

import './styles.scss';
import { getResults } from '../../utils';

type CalculatorInputsProps = {
  name: Category;
  value: number;
  newAmount: number | undefined;
  diff: number | undefined;
  onChange: (value: number) => void;
};

const CalculatorInputs: FC<CalculatorInputsProps> = ({
  name,
  value,
  newAmount = '',
  diff = '',
  onChange,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    onChange(value ? parseFloat(value) : 0);
  };

  return (
    <>
      <td>
        <label htmlFor={`current-${name}`}>{labels[name]} $:</label>
      </td>
      <td>
        <input
          className='text-right'
          type='number'
          min={0}
          step={100}
          id={`current-${name}`}
          value={value}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type='number'
          readOnly
          value={diff}
          className={['text-right', diff > 0 ? 'diff-p' : diff < 0 ? 'diff-n' : ''].join(' ')}
        />
      </td>
      <td>
        <input type='number' readOnly value={newAmount} className='text-right new-amount' />
      </td>
    </>
  );
};

const Calculator = () => {
  const risk = useCurrentRisk();
  const allocation = useSelector<State, Allocation>((state) => state.currentAllocation);
  const dispatch = useDispatch();

  const results = useMemo(() => risk && getResults(allocation, risk), [allocation, risk]);

  return (
    <div>
      <Grid>
        <Cell small={10}>
          <h5>Please Enter Your Current allocation</h5>
        </Cell>

        <Cell small={2}>
          <Button color={Colors.PRIMARY} isExpanded isDisabled>
            Rebalance
          </Button>
        </Cell>

        <Cell small={12}>
          <table className='unstriped calculator__table'>
            <thead>
              <tr>
                <th style={{ width: '30%' }} className='text-center' colSpan={2}>
                  Current Amount
                </th>
                <th style={{ width: '20%' }} className='text-center'>
                  Difference
                </th>
                <th style={{ width: '20%' }} className='text-center'>
                  New Amount
                </th>
                <th style={{ width: '20%' }} className='text-center'>
                  Recommended Transfers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CalculatorInputs
                  name='bonds'
                  value={allocation.bonds}
                  newAmount={results?.newAmounts.bonds}
                  diff={results?.diffs.bonds}
                  onChange={(value) => dispatch(setCurrentAmount('bonds', value))}
                />
                <td rowSpan={5} className='calculator__transfers'>
                  <ul>
                    {results?.transfers.map((transfer, i) => (
                      <li key={`transfer-${i}`}>
                        Transfer ${transfer.value} from {labels[transfer.from]} to{' '}
                        {labels[transfer.to]}.
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <CalculatorInputs
                  name='largeCap'
                  value={allocation.largeCap}
                  newAmount={results?.newAmounts.largeCap}
                  diff={results?.diffs.largeCap}
                  onChange={(value) => dispatch(setCurrentAmount('largeCap', value))}
                />
              </tr>
              <tr>
                <CalculatorInputs
                  name='midCap'
                  value={allocation.midCap}
                  newAmount={results?.newAmounts.midCap}
                  diff={results?.diffs.midCap}
                  onChange={(value) => dispatch(setCurrentAmount('midCap', value))}
                />
              </tr>
              <tr>
                <CalculatorInputs
                  name='foreign'
                  value={allocation.foreign}
                  newAmount={results?.newAmounts.foreign}
                  diff={results?.diffs.foreign}
                  onChange={(value) => dispatch(setCurrentAmount('foreign', value))}
                />
              </tr>
              <tr>
                <CalculatorInputs
                  name='smallCap'
                  value={allocation.smallCap}
                  newAmount={results?.newAmounts.smallCap}
                  diff={results?.diffs.smallCap}
                  onChange={(value) => dispatch(setCurrentAmount('smallCap', value))}
                />
              </tr>
            </tbody>
          </table>
        </Cell>
      </Grid>
    </div>
  );
};

export default Calculator;
