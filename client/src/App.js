import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Todos from './components/Todos';


class App extends Component {
  render() {
    return (  
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <h3>React and Node</h3> 
            <hr/>  
            <Route exact path="/" component={Welcome} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/todos" component={Todos} />
          </div>
        </BrowserRouter>     
      </div> 
    );
  }
}

export default App;
