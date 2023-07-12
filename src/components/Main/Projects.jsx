import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../../helpers';

export default function Projects({ session, setSession }) {
  const [projects, setProjects] = useState(null);
  const pageTitle = 'Projects';

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

  return projects !== null ? (
    <div className="list">
      <h1>{pageTitle}</h1>
      {projects.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={helpers.onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} onClick={() => helpers.onTableRowClick('projects', project._id)} tabIndex={0} aria-label={`"${project.title}", managed by ${project.manager.firstName} ${project.manager.lastName}, click for details`}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{`${project.manager.firstName} ${project.manager.lastName}`}</td>
                  <td>{new Date(project.created).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no projects yet...</p>
      )}
      {session.user.role === 'Admin' || session.user.role === 'Project Manager' ? (
        <button type="button" onClick={() => window.location.assign('#/projects/create')}>
          New Project
        </button>
      ) : null}
    </div>
  ) : null;
}
Projects.propTypes = {
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
