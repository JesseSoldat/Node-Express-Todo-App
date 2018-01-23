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
        <h3>{this.props.data.title}</h3>
        <Form onHandleSubmit={this.onHandleSubmit} btnText={'Submit'} />
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

Login.defaultProps = {
  title: 'Login'
}

export default connect(mapStateToProps, actions)(Login);