import { ChangeEventHandler, FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State } from '../../redux/reducers';
import { setCurrentAmount } from '../../redux/actions';
import { Category, labels, Allocation } from '../../data/risks';
import useCurrentRisk from '../../hooks/useCurrentRisk';

import './styles.scss';
import { getResults, hasZeroValues } from '../../utils';
import classNames from 'classnames';

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
          type='text'
          readOnly
          value={diff > 0 ? `+${diff}` : diff}
          className={classNames('text-right', { 'diff-p': diff > 0, 'diff-n': diff < 0 })}
        />
      </td>
      <td>
        <input type='text' readOnly value={newAmount} className='text-right new-amount' />
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
    <div className='calculator'>
      <h5 className='calculator__title'>Please Enter Your Current allocation</h5>

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
              {results &&
                !hasZeroValues(allocation) &&
                (results.transfers.length > 0 ? (
                  <ul>
                    {results.transfers.map((transfer, i) => (
                      <li key={`transfer-${i}`}>
                        Transfer ${transfer.value} from {labels[transfer.from]} to{' '}
                        {labels[transfer.to]}.
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-center'>No transfers to make 👍🏻</p>
                ))}
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
    </div>
  );
};

export default Calculator;
