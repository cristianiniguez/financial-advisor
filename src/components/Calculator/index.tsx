import { FC } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';

import './styles.scss';

type CalculatorInputsProps = {
  name: string;
  label: string;
};

const CalculatorInputs: FC<CalculatorInputsProps> = ({ name, label }) => {
  return (
    <>
      <td>
        <label htmlFor={`current-${name}`}>{label} $:</label>
      </td>
      <td>
        <input type='number' min={0} step={100} id={`current-${name}`} />
      </td>
      <td>
        <input type='number' readOnly />
      </td>
      <td>
        <input type='number' readOnly />
      </td>
    </>
  );
};

const Calculator = () => {
  return (
    <div>
      <Grid>
        <Cell small={10}>
          <h5>Please Enter Your Current Portfolio</h5>
        </Cell>

        <Cell small={2}>
          <Button color={Colors.PRIMARY} style={{ width: '100%' }} isDisabled>
            Rebalance
          </Button>
        </Cell>

        <Cell small={12}>
          <table className='unstriped calculator__table'>
            <thead>
              <tr>
                <th className='text-center' colSpan={2}>
                  Current Amount
                </th>
                <th className='text-center'>Difference</th>
                <th className='text-center'>New Amount</th>
                <th className='text-center'>Recommended Transfers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CalculatorInputs name='bonds' label='Bonds' />
                <td rowSpan={5} className='calculator__transfers'></td>
              </tr>
              <tr>
                <CalculatorInputs name='largeCap' label='Large Cap' />
              </tr>
              <tr>
                <CalculatorInputs name='midCap' label='Mid Cap' />
              </tr>
              <tr>
                <CalculatorInputs name='foreign' label='Foreign' />
              </tr>
              <tr>
                <CalculatorInputs name='smallCap' label='Small Cap' />
              </tr>
            </tbody>
          </table>
        </Cell>
      </Grid>
    </div>
  );
};

export default Calculator;
