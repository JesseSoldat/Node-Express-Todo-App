import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Form extends Component {
    state = {
      email: '',
      password: ''
    };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }
  
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onHandleSubmit(this.state);
  }

  getEmailValidationState = () => {
    let valid;
    if(this.state.email.length >= 1) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = re.test(this.state.email.toLowerCase());
    }
    if(valid === false) {
      return 'error';
    }
    if(valid === true) {
      return 'success';
    }

    return null;
  }

  getPasswordValidationState = () => {
    const length = this.state.password.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }


  render() {
    return (
      <form>
        <FormGroup
          controlId="email"
          validationState={this.getEmailValidationState()}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleEmailChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on a valid Email.</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="password"
          validationState={this.getPasswordValidationState()}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Enter text"
            onChange={this.handlePasswordChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on Password length.</HelpBlock>
        </FormGroup>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Form;