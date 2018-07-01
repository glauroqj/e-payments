import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
/* pages */
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <Switch>    
          <Route exact path="/login" component={Login} />
          <Route path="/create" component={CreateAccount} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/login" />
      </Switch>
    );
  }
}

export default App;
