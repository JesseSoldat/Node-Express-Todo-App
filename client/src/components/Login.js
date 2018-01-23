import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

class Login extends Component {

  onHandleSubmit = (form) => {
    this.props.loginUser(form);
  }

  render() {
    if(this.props.auth && this.props.auth.uid) {
      return (
        <Redirect to='/dashboard' />
      );
    }
    return (
      <div>
        <h3>Login</h3>
        <Form onHandleSubmit={this.onHandleSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Login);