import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  getUser = () => {
    // console.log('getUser Dashboard', this.props.auth);
    
    this.props.getUser(this.props.auth.xauth);
  }

  render() {
    return (
      <div>
        <h4>Dashboard</h4>
        <button onClick={this.getUser}>Get User</button>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps, actions)(Dashboard);