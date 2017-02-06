import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import { submitSignOut } from '../../redux/actions/session';

const generateUserMenu = function generateUserMenu(dispatch, loggedIn) {
  if (loggedIn) {
    return (
    [
      <LinkContainer to={'cycles'} key={1}>
        <NavItem>{'Cycles'}</NavItem>
      </LinkContainer>,
      <LinkContainer to={'reports'} key={2}>
        <NavItem>{'Reports'}</NavItem>
      </LinkContainer>,
      <NavDropdown title="Account" id="account-dropdown" key={3}>
        <LinkContainer to={'profile'}><MenuItem >Update Profile</MenuItem></LinkContainer>
        <MenuItem divider />
        <MenuItem onClick={() => dispatch(submitSignOut())}>Sign Out</MenuItem>
      </NavDropdown>
    ]
    );
  }

  return (
  [
    <LinkContainer to={'/signin'} key={4}>
      <NavItem>{'Sign In'}</NavItem>
    </LinkContainer>
  ]
  );
};

generateUserMenu.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

const Header = ({ session, dispatch }) => (
  <Navbar id="navbar">
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav />
      <Nav pullRight>
        <IndexLinkContainer to={'/'}>
          <NavItem>{'Home'}</NavItem>
        </IndexLinkContainer>
        {generateUserMenu(dispatch, session.loggedIn).map(component => component)}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  session: React.PropTypes.shape({}).isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default Header;
