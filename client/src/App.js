import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Todos from './components/Todos';


class App extends Component {
  
  render() {
    const loginProps = { title: 'Login' }

    return (  
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <h3>React and Node</h3> 
            <hr/>  
            <Route exact path="/" component={Welcome} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/todos" component={Todos} />
            
            <Route path='/login' render={(props) => (
              <Login {...props} data={loginProps} />
            )} />

          </div>
        </BrowserRouter>     
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(App);
