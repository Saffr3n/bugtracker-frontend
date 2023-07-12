import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiHost, updateTitle } from '../../helpers';

export default function ProjectCreate({ session, setSession }) {
  const pageTitle = 'New Project';

  useEffect(() => updateTitle(pageTitle), []);

  const onProjectCreate = async (e) => {
    e.preventDefault();

    const titleInput = e.target.querySelector('input');
    const titleLabel = e.target.querySelector('label[for="title"]');
    const titleHint = e.target.querySelector('.hint');

    titleInput.classList.remove('invalid');
    titleInput.setAttribute('aria-invalid', 'false');
    titleLabel.classList.remove('invalid');
    titleHint.textContent = '';

    try {
      const response = await fetch(`${apiHost}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput.value,
          description: e.target.querySelector('textarea').value
        }),
        credentials: 'include'
      });
      const data = await response.json();

      setSession({ ...data, user: session.user });

      if (data.status === 500) return;
      if (data.status === 401) {
        window.location.assign('#/signin');
        return;
      }
      if (data.status === 400) {
        titleInput.setAttribute('aria-invalid', 'true');
        titleInput.classList.add('invalid');
        titleLabel.classList.add('invalid');
        titleHint.textContent = data.message;
        e.target.querySelector('.invalid').focus();
        return;
      }

      window.location.assign(`#${data.project.url}`);
    } catch {
      setSession({ status: 500, message: 'Server Error' });
    }
  };

  return (
    <div className="sign">
      <h1>{pageTitle}</h1>

      <form onSubmit={onProjectCreate} noValidate>
        <label htmlFor="title">
          Title
          <input type="text" id="title" aria-required aria-invalid="false" aria-describedby="title-hint" />
        </label>
        <span className="hint" id="title-hint" />

        <label htmlFor="description">
          Description
          <textarea cols="21" rows="4" id="description" />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
ProjectCreate.propTypes = {
  session: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setSession: PropTypes.func.isRequired
};
