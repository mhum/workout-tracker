import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const generateUserMenu = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <div>
        <LinkContainer to={'cycles'}>
          <NavItem>{'Cycles'}</NavItem>
        </LinkContainer>
        <LinkContainer to={'reports'}>
          <NavItem>{'Reports'}</NavItem>
        </LinkContainer>
        <NavDropdown title="Account" id="account-dropdown">
          <LinkContainer to={'profile'}><MenuItem >Update Profile</MenuItem></LinkContainer>
          <MenuItem divider />
          <LinkContainer to={'signout'}><MenuItem >Sign Out</MenuItem></LinkContainer>
        </NavDropdown>
      </div>
    );
  }

  return (
    <LinkContainer to={'/signin'}>
      <NavItem>{'Sign In'}</NavItem>
    </LinkContainer>
  );
};

generateUserMenu.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

const Header = ({ session }) => (
  <Navbar id="navbar">
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <IndexLinkContainer to={'/'}>
          <NavItem>{'Home'}</NavItem>
        </IndexLinkContainer>
        {generateUserMenu(session.loggedIn)}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  session: React.PropTypes.shape({}).isRequired
};

export default Header;
