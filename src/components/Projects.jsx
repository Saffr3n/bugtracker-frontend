import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Projects({ setStatus }) {
  const [projects, setProjects] = useState(null);
  const pageTitle = 'Projects';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${helpers.apiHost}/projects`, { credentials: 'include' });

        setStatus(response.status);

        if (response.status === 500) return;
        if (response.status === 401) {
          window.location.assign('#/signin');
          return;
        }

        setProjects(await response.json());
        helpers.updateTitle(pageTitle);
      } catch {
        setStatus(500);
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
                <tr onClick={() => helpers.onTableRowClick(project._id)} tabIndex={0} aria-label={`"${project.title}", managed by ${project.manager.firstName} ${project.manager.lastName}, click for details`}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{`${project.manager.firstName} ${project.manager.lastName}`}</td>
                  <td>{project.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no projects yet...</p>
      )}
      <button type="button" onClick={() => window.location.assign('#/projects/create')}>
        New Project
      </button>
    </div>
  ) : null;
}
Projects.propTypes = {
  setStatus: PropTypes.func.isRequired
};
