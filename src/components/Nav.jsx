import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';
import SignInIcon from '../assets/icons/signin.svg';
import SignUpIcon from '../assets/icons/signup.svg';

export default function Nav({ authorized }) {
  return (
    <nav>
      <ul>
        {authorized ? (
          <>
            <li>
              <Link to="/dashboard" className="active" onClick={helpers.reactivateLinks}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/projects" onClick={helpers.reactivateLinks}>
                Projects
              </Link>
            </li>

            <li>
              <Link to="/tickets" onClick={helpers.reactivateLinks}>
                Tickets
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="active" onClick={helpers.reactivateLinks}>
                <SignInIcon />
                Sign In
              </Link>
            </li>

            <li>
              <Link to="/signup" onClick={helpers.reactivateLinks}>
                <SignUpIcon />
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
Nav.propTypes = {
  authorized: PropTypes.bool.isRequired
};
