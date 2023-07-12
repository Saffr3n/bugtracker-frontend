import React from 'react';
import PropTypes from 'prop-types';
import { apiHost } from '../../../helpers';

export default function Form({ setSession }) {
  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiHost, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.target.querySelector('#email').value,
          password: e.target.querySelector('#password').value
        }),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.status === 400) {
        e.target.querySelector('#email').focus();
        e.target.querySelector('#password').value = '';

        const alert = e.target.querySelector('p[role="alert"]');
        alert.textContent = `${data.message}.`;
        alert.style.display = 'block';

        return;
      }

      setSession(data);
      if (data.status === 500) return;
      window.location.assign('#/dashboard');
    } catch {
      setSession({ status: 500, message: 'Server Error' });
    }
  };

  return (
    <form onSubmit={onSignIn} noValidate>
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
  );
}
Form.propTypes = {
  setSession: PropTypes.func.isRequired
};
