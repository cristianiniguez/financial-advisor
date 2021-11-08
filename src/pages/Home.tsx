import { Link } from 'react-router-dom';
import { Button, Cell, Colors, Grid, GridContainer } from 'react-foundation';

import RiskLevelSelect from '../components/RiskLevelSelect';
import RiskLevelTable from '../components/RiskLevelTable';

const HomePage = () => {
  return (
    <main>
      <section>
        <GridContainer>
          <Grid>
            <Cell small={12}>
              <h4 className='text-center'>
                Please select a Risk Level for your Investment Portfolio
              </h4>

              <Grid alignY='bottom' className='grid-padding-x'>
                <Cell small={10} className='risk-level__selector'>
                  <RiskLevelSelect />
                </Cell>
                <Cell small={2}>
                  <Link to='/calculator'>
                    <Button color={Colors.SUCCESS} isExpanded>
                      Continue
                    </Button>
                  </Link>
                </Cell>
              </Grid>

              <Grid className='grid-padding-x'>
                <Cell small={10} className='risk-level__table'>
                  <RiskLevelTable />
                </Cell>
                <Cell small={2}>
                  <Button color={Colors.WARNING} isHollow isExpanded>
                    Watch graph
                  </Button>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </GridContainer>
      </section>
    </main>
  );
};

export default HomePage;
