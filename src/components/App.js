import React from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom';

import  './App.css';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import SearchPage from './Search';
import SearchResultsPage from './SearchResults';
import AccountPage from './Account';
import EventPage from './EventDetails';

import MusicDetails from './MusicDetails'

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div className="page-container">
      <header>
        <Navigation />
      </header>
      <main>
        <Route exact path={routes.LANDING} component={ LandingPage } />
        <Route exact path={routes.SIGN_UP} component={ SignUpPage } />
        <Route exact path={routes.SIGN_IN} component={ SignInPage } />
        <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage } />
        <Route exact path={routes.HOME} component={ HomePage} />
        <Route exact path={routes.ACCOUNT} component={ AccountPage } />
        <Route exact path={routes.SEARCH} component={ SearchPage } />
        <Route path={routes.SEARCH_RESULTS} component={ SearchResultsPage } />
        <Route exact path={routes.EVENT} component={ EventPage } />

        <Route exact path={routes.MUSIC_DETAILS} component={ MusicDetails } />
      </main>

    </div>
  </Router>

export default withAuthentication(App);
