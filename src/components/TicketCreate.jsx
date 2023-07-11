import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function TicketCreate({ session, setSession }) {
  const [projects, setProjects] = useState(null);
  const pageTitle = 'New Ticket';

  useEffect(() => {
    helpers.updateTitle(pageTitle);

    const [, projectId] = window.location.hash.split('=');

    (async () => {
      try {
        const response = await fetch(`${helpers.apiHost}/projects/${projectId || ''}`, { credentials: 'include' });
        const data = await response.json();

        setSession({ ...data, user: session.user });

        if (data.status === 500) return;
        if (data.status === 401) {
          window.location.assign('#/signin');
          return;
        }
        if (data.status === 400) {
          window.location.assign('#/404');
          return;
        }

        setProjects(data.project ? [data.project] : data.projects);
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
      {projects.length !== 0 ? (
        <form onSubmit={onTicketCreate} noValidate>
          <label htmlFor="project">
            Project
            <select id="project" defaultValue={projects.length === 1 ? projects[0]._id : ''} disabled={projects.length === 1} aria-required aria-invalid="false" aria-describedby="project-hint">
              {projects.length === 1 ? (
                <option key={projects[0]._id} value={projects[0]._id}>
                  {projects[0].title}
                </option>
              ) : (
                <>
                  <option key="0" value="" disabled hidden aria-hidden="true" />
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </>
              )}
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
      ) : (
        <p>Cannot create a ticket, since there are no projects yet.</p>
      )}
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
