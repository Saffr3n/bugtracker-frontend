import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function SignIn({ setSession }) {
  const pageTitle = 'Sign In';

  useEffect(() => helpers.updateTitle(pageTitle), []);

  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(helpers.apiHost, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.target.querySelector('#email').value,
          password: e.target.querySelector('#password').value
        }),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.status === 500) {
        setSession({ status: 500, message: 'Server Error' });
        return;
      }
      if (data.status === 400) {
        e.target.querySelector('#password').value = '';

        const alert = e.target.querySelector('p[role="alert"]');

        alert.textContent = `${data.message}.`;
        alert.style.display = 'block';
        return;
      }

      setSession(data);
      window.location.assign('#/dashboard');
    } catch {
      setSession({ status: 500, message: 'Server Error' });
    }
  };

  return (
    <div className="sign">
      <h1>{pageTitle}</h1>

      <form onSubmit={onSignIn}>
        <p role="alert" />
        <label htmlFor="email">
          Email
          <input type="text" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>

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
