import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkBar() {
  return (
    <div className="link-bar" aria-hidden="true">
      <Link to="/signin" reloadDocument tabIndex="-1">
        Sign In
      </Link>
      <Link to="/signup" reloadDocument tabIndex="-1">
        Sign Up
      </Link>
    </div>
  );
}
