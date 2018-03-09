import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
  <nav className='navigation'>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </nav>

  Navigation.contextTypes = {
    authUser: PropTypes.object,
  };

const NavigationAuth = () =>
  <div className='muisc-navigation-auth-route-list'>
    {/*   <p>You login as: { authUser.email}</p>  */}
    <Link to={routes.HOME} className="music-navigation-auth-route-home">home</Link>
    <Link to={routes.SEARCH} className="music-navigation-auth-route-search-eventful">search-eventful</Link>
    <Link to={routes.ACCOUNT} className="music-navigation-auth-route-account">account</Link>
    {/* <Link to={routes.SIGN_OUT}  className="music-navigation-auth-route-sign-out">sign-out</Link> */}
  </div>

const NavigationNonAuth = () =>
  <div className='muisc-navigation-non-auth-route-list'>
  {/* <Link to={routes.LANDING} className="music-navigation-non-auth-route-landing"></Link> */}
  </div>

export default Navigation;
