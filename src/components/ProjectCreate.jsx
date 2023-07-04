import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function ProjectCreate({ setStatus }) {
  const pageTitle = 'New Project';
  useEffect(() => helpers.updateTitle(pageTitle), []);

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
      const response = await fetch(`${helpers.apiHost}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput.value,
          description: e.target.querySelector('textarea').value
        }),
        credentials: 'include'
      });

      if (response.status === 401) {
        setStatus(response.status);
        return;
      }

      const data = await response.json();

      if (response.status !== 200) {
        titleInput.classList.add('invalid');
        titleInput.setAttribute('aria-invalid', 'true');
        titleLabel.classList.add('invalid');
        titleHint.textContent = data.message;

        e.target.querySelector('.invalid').focus();
        return;
      }

      window.location.assign(`#/projects/${data.id}`);
    } catch {
      setStatus(500);
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
  setStatus: PropTypes.func.isRequired
};
