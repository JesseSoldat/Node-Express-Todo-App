import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>React-Node-Todo</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>

      <LinkContainer to="/dashboard">
        <NavItem eventKey={1} href="#"> 
            Dashboard
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/todos">
        <NavItem eventKey={2} href="#">
          Todos
        </NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const Header = () => {
    return navbarInstance;
 
}
export default Header;