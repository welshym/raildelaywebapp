import React, { Component } from 'react';
import Application from './App';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import ForgottenRegister from './Components/ForgottenRegister';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import swrLogo from './swr.png';
import './App.css';
import AuthStore from './Stores/AuthStore';

//const AppRoutes = () => (
class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillUnMount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    let authData = AuthStore.getAuthData();
    if (authData.loggedIn) {
      this.setState({ authenticated: true });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <header className="App-header">
                <img src={swrLogo} className="App-logo" alt="SWR Logo" />
                <h1 className="App-title">South Western Railways - Train Delay Details</h1>
            </header>
          </div>
          <Switch>
            <PrivateRoute exact path="/" component={Application} authenticated={this.state.authenticated}/>
            <Route path="/login" component={Login} />
            <Route path="/registerreset" component={ForgottenRegister} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default AppRoutes;

