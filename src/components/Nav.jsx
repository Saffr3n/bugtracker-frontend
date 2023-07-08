import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInIcon from '../assets/icons/signin.svg';
import SignUpIcon from '../assets/icons/signup.svg';

export default function Nav({ session }) {
  return (
    <nav data-testid="nav">
      <ul>
        {session.status !== 401 ? (
          <>
            <li>
              <Link to="/dashboard" reloadDocument>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/projects" reloadDocument>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/tickets" reloadDocument>
                Tickets
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" reloadDocument>
                <SignInIcon role="none" />
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" reloadDocument>
                <SignUpIcon role="none" />
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
  session: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  }).isRequired
};
