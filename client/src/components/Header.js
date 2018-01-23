import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';

class Header extends Component {
  state = {
    activeClass: ''
  }

  componentWillMount() {
    let url = window.location.href;
    let href = url.split('/').pop();
    // console.log(href);
    this.setState({activeClass: href});
  
  }

  setActive = (link) => {
    this.setState({activeClass: link});
  }
  
  authenticated = () => {
    let uid = this.props.auth.uid;
  
    if(uid) {
      return (
        [
          <LinkContainer to="/dashboard" key="1" >
            <NavItem eventKey={1} href="#" 
              className={this.state.activeClass === 'dashboard' ? 'active' : ''}
              onClick={() => this.setActive('dashboard')}> 
              Dashboard
            </NavItem>
          </LinkContainer>,
          <LinkContainer to="/todos" key="2">
            <NavItem eventKey={2} href="#"
              className={this.state.activeClass === 'todo' ? 'active' : ''}
              onClick={() => this.setActive('todo')}>
              Todos
            </NavItem>
          </LinkContainer>,
          <LinkContainer to="/logout" key="5">
            <NavItem eventKey={5} href="#">
              Logout
            </NavItem>
          </LinkContainer>
        ]
      );
    } else {
      return (
        [
          <LinkContainer to="/register" key="3">
            <NavItem eventKey={3} href="#"
              className={this.state.activeClass === 'register' ? 'active' : ''}
              onClick={() => this.setActive('register')}>
              Register
            </NavItem>
          </LinkContainer>,
          <LinkContainer to="/login" key="4">
            <NavItem eventKey={4} href="#"
              className={this.state.activeClass === 'login' ? 'active' : ''}
              onClick={() => this.setActive('login')}>
              Login
            </NavItem>
          </LinkContainer>
        ]
      );
    }
  }
  
  render() {

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>React-Node-Todo</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {this.authenticated()}
        </Nav>
      </Navbar>
    );
  }
 
}

function mapStateToProps({auth}, ownProps) {
  return {
    auth,
    ownProps
  }
}
export default connect(mapStateToProps)(Header);