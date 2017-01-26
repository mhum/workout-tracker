import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar id="navbar">
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <IndexLinkContainer to={'/'}>
          <NavItem>{'Home'}</NavItem>
        </IndexLinkContainer>
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

        <LinkContainer to={'/signin'}>
          <NavItem>{'Sign In'}</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
