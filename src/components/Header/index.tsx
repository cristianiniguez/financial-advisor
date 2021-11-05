import { Link } from 'react-router-dom';
import { Menu, MenuItem, MenuText } from 'react-foundation';

import './styles.scss';

const Header = () => {
  return (
    <header className='header'>
      <Menu>
        <MenuText>Financial Advisor</MenuText>
        <MenuItem>
          <Link to='/' className='header__link'>
            Home
          </Link>
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
