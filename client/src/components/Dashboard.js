import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
  state = {
    exampleArray: []
  }
  //----------------------------------
  //constructor()
  componentWillMount() { }
  //render()
  componentDidMount() {
    //FETCH DATA
    let storedValues = localStorage.getItem('exampleArray');
    if(storedValues) {
      storedValues = storedValues.split(',');
    }
    
    if(storedValues) {
      this.setState((prevState) => {
        return {
          exampleArray: prevState.exampleArray.concat(storedValues)
        }
      });
    }  
  }

  //----------------------------------
  componentWillReceiveProps() { }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUpdate() { }
  //render()
  componentDidUpdate(prevProp, prevState) {
    //SAVE DATA
    if (prevState.exampleArray.length !== this.state.exampleArray.length) {
      
      JSON.stringify(localStorage.setItem('exampleArray', this.state.exampleArray));
    }
  }

  //----------------------------------
  componentWillUnmount() { }

  addRandomNumber = () => {
    this.setState((prevState) => {
      let num = Math.floor(Math.random() * 10) +1;
      let numArray = [num];
      return { 
        exampleArray: numArray.concat(prevState.exampleArray)
      }
    });
  }

  displayRandomNumbers = () => {
    if(this.state.exampleArray.length < 1) {
      return <li className="list-group-item">No Numbers</li>;
    }
    return this.state.exampleArray.map((num, i) => {
      return (
        <li key={i}
          className="list-group-item">
          {num}
        </li>
      );
    })    
  }

  clearArray = () => {
    localStorage.setItem('exampleArray', []);
    this.setState((prevState) => ({exampleArray: []}));
  }

  getUser = () => {
    // console.log('getUser Dashboard', this.props.auth);
    
    this.props.getUser(this.props.auth.xauth);
  }

  render() {
    return (
      <div>
        <h4>Dashboard</h4>
        <button className="btn btn-primary" 
          style={{marginRight: '5px'}}
          onClick={this.addRandomNumber}>
          Random Number
        </button>
        <button className="btn btn-danger"
          style={{marginRight: '5px'}} 
          onClick={this.clearArray}>
          clearArray
        </button>
        <button className="btn btn-success" 
          onClick={this.getUser}>
          Get User
        </button>
        <hr/>
        <h3>Random Numbers</h3>
        <ul className="list-group">
          {this.displayRandomNumbers()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps, actions)(Dashboard);