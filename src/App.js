import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
/* pages */
import Login from './pages/Login'
import Admin from './pages/admin/Admin'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import MyAccount from './pages/MyAccount'
import ForgotPassword from './pages/ForgotPassword'

class App extends Component {
  render() {
    return (
      <Switch>    
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/create" component={CreateAccount} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect to="/login" />
      </Switch>
    );
  }
}

export default App;
