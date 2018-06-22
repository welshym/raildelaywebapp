import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './../App.css';
import AuthAction from '../Actions/AuthActions';
import AuthStore from '../Stores/AuthStore';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom';

const ForgottenRegister = withRouter(
  ({ history }) => <RaisedButton label="Forgotten/Register" primary style={styleForgottenRegister} onClick={(event) => history.push('/registerreset')}/>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      loading: false,
      error: false,
      errorText: ''
    };

    this._onChange = this._onChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillUnMount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    let authData = AuthStore.getAuthData();

    this.setState({ loading: false, error: authData.error });
    if (authData.error) {
      this.setState({ errorText: 'Username or Password error' });
    } else {
      this.setState({ errorText: '' });
    }

    if (authData.loggedIn) {
      this.setState({ redirectToReferrer: true });
    };
  }

  handleSubmitClick(event) {
    console.log('Username: ', this.state.username);
    console.log('Password: ', this.state.password);
    // Add the request to get authenticated here
    // Navigate to a new screen on success / update current screen on failure
    this.setState({ loading: true });
    AuthAction.login(this.state.username, this.state.password);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, loading } = this.state;
    let authenticated = this.props.authenticated;

    if (loading) {
      return (
        <div className="App-spinner-location">
          <ReactLoading type={'spin'} color="#2E86C1" />
        </div>);
    }

    if ((redirectToReferrer) || (authenticated)) {
      return <Redirect to={from} />;
    }

    return (
      <div className="App-comps-location">
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your username"
              floatingLabelText="User Name"
              errorText= {this.state.errorText}
              onChange = {(event, newValue) => this.setState({ username: newValue })}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              errorText= {this.state.errorText}
              onChange = {(event, newValue) => this.setState({ password: newValue })}
            />
            <br/>
            <RaisedButton label="Submit" primary style={styleSubmit} onClick={(event) => this.handleSubmitClick(event)}/>
            <ForgottenRegister />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const styleSubmit = {
  margin: 0,
};

const styleForgottenRegister = {
  margin: 10,
};


Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  authenticated: PropTypes.bool
};

Login.defaultProps = {
  location: {
    state: '',
  },
  authenticated: false
};

export default Login;


/*
            <ErrorBanner error={error} username={username} password={password}/>
import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";
import "./styles.css";

const Example = () => (
  <Section>
    <Title>React Loading</Title>
    {list.map(l => (
      <Article key={l.prop}>
        <ReactLoading type={l.prop} color="#fff" />
        <Prop>{l.name}</Prop>
      </Article>
    ))}
  </Section>
);

export default Example;
*/
