import React from 'react';
import { Link } from 'react-router-dom';
import SignInIcon from '../../assets/icons/signin.svg';
import SignUpIcon from '../../assets/icons/signup.svg';

export default function LinkBarUnauthorized() {
  return (
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
  );
}
