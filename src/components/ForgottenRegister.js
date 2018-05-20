import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './../App.css';
import ReactLoading from 'react-loading';
import AuthAPI from '../APIs/AuthAPI';

class ForgottenRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      redirectToReferrer: false,
      errorText: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('emailAddress: ', this.state.emailAddress);
    // Add the request to get authenticated here
    // Navigate to a new screen on success / update current screen on failure
    this.setState({ loading: true });
    AuthAPI.registerReset(this.state.emailAddress).then((data) => {
      console.log('Success on reset / register');
      this.setState({ loading: false, errorText: 'Success', redirectToReferrer: true });
    }).catch((data) => {
      console.log('Error on reset / register');
      this.setState({ loading: false, errorText: 'Error on reset / register', redirectToReferrer: false });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, loading } = this.state;

    if (loading) {
      return (
        <div className="App-spinner-location">
          <ReactLoading type={'spin'} color="#2E86C1" />
        </div>);
    }

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="App-comps-location">
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your email address"
              floatingLabelText="Email Address"
              errorText= {this.state.errorText}
              onChange = {(event, newValue) => this.setState({ emailAddress: newValue })}
            />
            <br/>
            <RaisedButton label="Submit" primary style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};


ForgottenRegister.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }),
};

ForgottenRegister.defaultProps = {
  location: {
    state: '',
  },
};

export default ForgottenRegister;
