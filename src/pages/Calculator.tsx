import { Cell, Grid, GridContainer } from 'react-foundation';

import RiskLevelCurrent from '../components/RiskLevelCurrent';
import Calculator from '../components/Calculator';

const CalculatorPage = () => {
  return (
    <main>
      <section>
        <GridContainer>
          <Grid>
            <Cell small={12}>
              <h4 className='text-center'>Personalized Portfolio</h4>

              <Grid>
                <Cell small={8} offsetOnSmall={2}>
                  <RiskLevelCurrent />
                </Cell>
              </Grid>

              <Calculator />
            </Cell>
          </Grid>
        </GridContainer>
      </section>
    </main>
  );
};

export default CalculatorPage;
