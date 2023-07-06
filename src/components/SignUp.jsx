import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function SignUp({ setStatus }) {
  const pageTitle = 'Sign Up';

  useEffect(() => helpers.updateTitle(pageTitle), []);

  const onSignUp = async (e) => {
    e.preventDefault();

    const inputs = {};
    [inputs.email, inputs.password, inputs.confirm, inputs.first, inputs.last] = e.target.querySelectorAll('input');

    const labels = {};
    [labels.email, labels.password, labels.confirm, labels.first, labels.last] = e.target.querySelectorAll('label');

    const hints = {};
    [hints.email, hints.password, hints.confirm, hints.first, hints.last] = e.target.querySelectorAll('.hint');

    for (let i = 0, l = Object.keys(inputs).length; i < l; i++) {
      const key = Object.keys(inputs)[i];

      inputs[key].classList.remove('invalid');
      inputs[key].setAttribute('aria-invalid', 'false');
      labels[key].classList.remove('invalid');
      hints[key].textContent = '';
    }

    if (inputs.password.value !== inputs.confirm.value) {
      inputs.confirm.classList.add('invalid');
      inputs.confirm.setAttribute('aria-invalid', 'true');
      labels.confirm.classList.add('invalid');
      hints.confirm.textContent = "Passwords don't match";
      inputs.confirm.focus();
      return;
    }

    try {
      const response = await fetch(`${helpers.apiHost}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputs.email.value,
          password: inputs.password.value,
          firstName: inputs.first.value,
          lastName: inputs.last.value
        }),
        credentials: 'include'
      });

      if (response.status === 500) {
        setStatus(500);
        return;
      }

      if (response.status === 400) {
        const data = await response.json();
        const alert = e.target.querySelector('p[role="alert"]');

        if (data.message.includes('User')) {
          alert.textContent = 'User with provided email already exists.';
          alert.style.display = 'block';
          return;
        }

        alert.style.display = 'none';

        const errors = data.message.split('. ');

        errors.forEach((err) => {
          const source = err.split(' ')[0].toLowerCase();
          inputs[source].classList.add('invalid');
          inputs[source].setAttribute('aria-invalid', 'true');
          labels[source].classList.add('invalid');
          hints[source].textContent = err;
        });

        e.target.querySelector('.invalid').focus();
        return;
      }
    } catch {
      setStatus(500);
      return;
    }

    setStatus(200);
    window.location.assign('#/dashboard');
  };

  return (
    <div className="sign">
      <h1>{pageTitle}</h1>

      <form onSubmit={onSignUp} noValidate>
        <p role="alert" />

        <label htmlFor="email">
          Email
          <input type="email" id="email" aria-required aria-invalid="false" aria-describedby="email-hint" />
        </label>
        <span className="hint" id="email-hint" />

        <label htmlFor="password">
          Password
          <input type="password" id="password" aria-required aria-invalid="false" aria-describedby="password-hint" />
        </label>
        <span className="hint" id="password-hint" />

        <label htmlFor="confirm">
          Confirm password
          <input type="password" id="confirm" aria-required aria-invalid="false" aria-describedby="confirm-hint" />
        </label>
        <span className="hint" id="confirm-hint" />

        <label htmlFor="first-name">
          First name
          <input type="text" id="first-name" aria-required aria-invalid="false" aria-describedby="first-name-hint" />
        </label>
        <span className="hint" id="first-name-hint" />

        <label htmlFor="last-name">
          Last name
          <input type="text" id="last-name" aria-required aria-invalid="false" aria-describedby="last-name-hint" />
        </label>
        <span className="hint" id="last-name-hint" />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
SignUp.propTypes = {
  setStatus: PropTypes.func.isRequired
};
