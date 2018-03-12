
import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const LandingPage = () =>
  <div className="music-landing-container">
  <h1 className="music-landing-welcome">Welcome to Music Events</h1>
    <div className="music-landing-sign-in-sign-up">
      <h4 className="music-landing-sign-in"><Link to={routes.SIGN_IN}>Sign-In</Link></h4>
      <h4 className="music-landing-sign-up"><Link to={routes.SIGN_UP}>Sign-Up</Link></h4>
    </div>
  </div>
export default LandingPage;
