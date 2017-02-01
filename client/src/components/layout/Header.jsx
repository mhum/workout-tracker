import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const generateUserMenu = function generateUserMenu(loggedIn) {
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
        <LinkContainer to={'signout'}><MenuItem >Sign Out</MenuItem></LinkContainer>
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

const Header = ({ session }) => (
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
        {generateUserMenu(session.loggedIn).map(component => component)}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  session: React.PropTypes.shape({}).isRequired
};

export default Header;
