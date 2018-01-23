import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
  state = {
    exampleArray: []
  }
  //----------------------------------
  //constructor()
  //componentWillMount() { }
  //render()
  componentDidMount() { //FETCH DATA
    try {
      let testArray = localStorage.getItem('testArray');
      //console.log('testArray', testArray);
      let parsedTestArray = JSON.parse(testArray);
      //console.log('parsedTestArray', parsedTestArray);
      
    } catch (error) {
      console.log(error);      
    }

    try {
      let storedValues = localStorage.getItem('exampleArray');
      if (storedValues) { //not NULL
        storedValues = storedValues.split(',');

        this.setState((prevState) => {
          return { exampleArray: prevState.exampleArray.concat(storedValues) }
        });
      }
    } catch (error) {
      console.log(error);     
    }   
  }
  //----------------------------------
  // componentWillReceiveProps() { }
  // shouldComponentUpdate() { return true; }
  // componentWillUpdate() { }
  //render()
  componentDidUpdate(prevProp, prevState) { //SAVE DATA
    if (prevState.exampleArray.length !== this.state.exampleArray.length) { 
      JSON.stringify(localStorage.setItem('exampleArray', this.state.exampleArray));

      //CORRECT WAY---------------------------------------
      let exampleArray = JSON.stringify(this.state.exampleArray);
      localStorage.setItem('testArray', exampleArray);     
    }
  }
  //----------------------------------
  // componentWillUnmount() { }
  //----------------------------------
  addRandomNumber = () => {
    let num = Math.floor(Math.random() * 1000) + 1;
    let numArray = [num];
    this.setState((prevState) => {
      return { exampleArray: numArray.concat(prevState.exampleArray)}
    });
  }

  removeNumber(i) {
    this.setState((prevState) => {
      return {
         exampleArray: prevState.exampleArray.filter((num, index )=> i !== index)
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
          <button type="button" 
            onClick={() => this.removeNumber(i)}
            className="close ml-auto" 
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      );
    })    
  }

  clearArray = () => {
    localStorage.setItem('exampleArray', null);
    this.setState((prevState) => ({exampleArray: []}));
  }

  getUser = () => {
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
        <ul className="list-group col-md-6 col-lg-8">
          {this.displayRandomNumbers()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({auth}) { return { auth }}

export default connect(mapStateToProps, actions)(Dashboard);