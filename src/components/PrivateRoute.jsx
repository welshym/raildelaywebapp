import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
//import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated: Authenticated, ...rest }) => {
  console.log('PrivateRoute:render ', Authenticated);
  return (<Route {...rest} render= {props => Authenticated ? ( <Component {...props} /> ) : ( <Redirect to={{ pathname: '/login', state: { from: props.location } }}/> )} />);
};

/*PrivateRoute.propTypes = {
  location: PropTypes.string.isRequired
};*/

export default PrivateRoute;

/*
Working
const PrivateRoute = ({ component: Component, location: Location, ...rest }) => (
  <Route {...rest} render= {props => fakeAuth.isAuthenticated ? ( <Component {...props} /> ) : ( <Redirect to={{ pathname: '/login', state: { from: props.location } }}/> )} />
);
*************

<Route {...rest} render= {props => ( <Component {...props} /> )}/>

  <Redirect to={{
    pathname: '/login',
    state: { from: rest.location }
  }}
  />

<Route {...rest} render={(props) => (
    <Redirect to={{
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
        />

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => fakeAuth.isAuthenticated ? ( <Component {...props} /> ) : ( <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>)}/>
);

*/
