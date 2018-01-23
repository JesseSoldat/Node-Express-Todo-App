import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Logout extends Component {

  componentDidMount() {
    this.props.logoutUser(this.props.auth.xauth);
  }

  renderComponent = () => {   
    
    if(!this.props.auth.uid) {
      return (
        <Redirect to='/' />
      );
    } else {
      return (
        <div>Loading.....</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Logout);