import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from './Form';
import * as actions from '../actions';

class Register extends Component {
  
  onHandleSubmit = (form) => {
    this.props.registerUser(form);
  }

  render() {
    if (this.props.auth && this.props.auth.uid) {
      return (
        <Redirect to='/dashboard' />
      );
    }

    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form onHandleSubmit={this.onHandleSubmit} btnText={'Submit'}/>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

Register.defaultProps = {
  title: 'Register'
}

export default connect(mapStateToProps, actions)(Register);