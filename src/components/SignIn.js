
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div className='music-sign-in-container'>
    <div className='music-sign-in-list-item'>
        <h2 className="music-sign-in-title">Sign-In</h2>
        <SignInForm history={ history } />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
  </div>


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = ( event ) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();

  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return(
      <div className="music-sign-in-form">
        <form onSubmit={ this.onSubmit }>
          <input
            value={email}
            onChange={ event => this.setState(byPropKey('email', event.target.value ))}
            type="text"
            placeholer="Email Address"
           className="music-sign-in-email"/>
          <input
            value={password}
            onChange={ event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholer="Password"
            className="music-sign-in-password"
          />
          <button disable={isInvalid} type="submit" className="music-sign-in-button">
            Sign In
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    );
  }

}

export default withRouter(SignInPage);

export{
  SignInForm,
};
