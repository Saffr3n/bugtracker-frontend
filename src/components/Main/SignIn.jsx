import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateTitle } from '../../helpers';
import Form from './SignIn/Form';

export default function SignIn({ setSession }) {
  const pageTitle = 'Sign In';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <div className="sign">
      <h1>{pageTitle}</h1>
      <Form setSession={setSession} />
      <p>
        Don&apos;t have an account yet?{' '}
        <Link to="/signup" reloadDocument>
          Sign up!
        </Link>
      </p>
    </div>
  );
}
SignIn.propTypes = {
  setSession: PropTypes.func.isRequired
};
