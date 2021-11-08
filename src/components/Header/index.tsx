import { Link } from 'react-router-dom';
import { GridContainer, Menu, MenuItem } from 'react-foundation';

import './styles.scss';

const Header = () => {
  return (
    <header className='header'>
      <GridContainer className='header__container'>
        <Menu>
          <MenuItem>
            <Link to='/' className='header__link'>
              Financial Advisor
            </Link>
          </MenuItem>
        </Menu>
      </GridContainer>
    </header>
  );
};

export default Header;
