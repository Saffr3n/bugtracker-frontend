import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function TicketCreate({ session, setSession }) {
  const [projects, setProjects] = useState(null);
  const pageTitle = 'New Ticket';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${helpers.apiHost}/projects`, { credentials: 'include' });
        const data = await response.json();

        setSession({ ...data, user: session.user });

        if (data.status === 500) return;
        if (data.status === 401) {
          window.location.assign('#/signin');
          return;
        }

        setProjects(data.projects);
        helpers.updateTitle(pageTitle);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();
  }, []);

  const onTicketCreate = async (e) => {
    e.preventDefault();

    const inputs = {};
    [inputs.project, inputs.title, inputs.description] = e.target.querySelectorAll('select, input, textarea');

    const labels = {};
    [labels.project, labels.title, labels.description] = e.target.querySelectorAll('label');

    const hints = {};
    [hints.project, hints.title, hints.description] = e.target.querySelectorAll('.hint');

    for (let i = 0, l = Object.keys(inputs).length; i < l; i++) {
      const key = Object.keys(inputs)[i];

      inputs[key].classList.remove('invalid');
      inputs[key].setAttribute('aria-invalid', 'false');
      labels[key].classList.remove('invalid');
      hints[key].textContent = '';
    }

    try {
      const response = await fetch(`${helpers.apiHost}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: inputs.project.value,
          title: inputs.title.value,
          description: inputs.description.value
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
        const errors = data.message.split('. ');

        errors.forEach((err) => {
          const source = err.split(' ')[0].toLowerCase();

          inputs[source].setAttribute('aria-invalid', 'true');
          inputs[source].classList.add('invalid');
          labels[source].classList.add('invalid');
          hints[source].textContent = err;
        });

        e.target.querySelector('.invalid').focus();
        return;
      }

      window.location.assign(`#${data.ticket.url}`);
    } catch {
      setSession({ status: 500, message: 'Server Error' });
    }
  };

  return projects !== null ? (
    <div className="sign">
      <h1>{pageTitle}</h1>

      <form onSubmit={onTicketCreate} noValidate>
        <label htmlFor="project">
          Project
          <select id="project" aria-required aria-invalid="false" aria-describedby="project-hint">
            <option hidden disabled selected value="" aria-hidden="true" />
            {projects.map((project) => (
              <option value={project._id}>{project.title}</option>
            ))}
          </select>
        </label>
        <span className="hint" id="project-hint" />

        <label htmlFor="title">
          Title
          <input type="text" id="title" aria-required aria-invalid="false" aria-describedby="title-hint" />
        </label>
        <span className="hint" id="title-hint" />

        <label htmlFor="description">
          Description
          <textarea cols="21" rows="4" id="description" aria-required aria-invalid="false" aria-describedby="description-hint" />
        </label>
        <span className="hint" id="description-hint" />

        <button type="submit">Submit</button>
      </form>
    </div>
  ) : null;
}
TicketCreate.propTypes = {
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
