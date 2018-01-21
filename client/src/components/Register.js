import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import * as actions from '../actions';

class Register extends Component {
  
  onHandleSubmit = (form) => {
    this.props.registerUser(form);
  }

  render() {
    return (
      <div>
        <Form onHandleSubmit={this.onHandleSubmit}/>
      </div>
    );
  }
}

export default connect(null, actions)(Register);