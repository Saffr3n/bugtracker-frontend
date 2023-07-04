import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Projects({ setStatus, setProject }) {
  const [projects, setProjects] = useState([]);
  const pageTitle = 'Projects';

  useEffect(() => {
    (async () => {
      helpers.updateTitle(pageTitle);

      let status;
      try {
        const response = await fetch(`${helpers.apiHost}/projects`, { credentials: 'include' });
        status = response.status;
        setStatus(response.status);
        setProjects(await response.json());
      } catch {
        setStatus(500);
      }
      if (status === 401) window.location.assign('#/signin');
    })();
  }, []);

  const onSearchInput = (e) => {
    const rows = [...document.querySelectorAll('tbody tr')];

    for (let i = 0; i < rows.length; i++) {
      let hidden = true;
      const cells = rows[i].querySelectorAll('td');

      for (let j = 0; j < cells.length; j++) {
        const data = cells[j].textContent.toUpperCase();
        const query = e.target.value.toUpperCase();
        if (data.includes(query)) hidden = false;
      }

      if (hidden) rows[i].style.display = 'none';
      else rows[i].style.display = 'table-row';
    }
  };

  const onTableRowClick = (project) => {
    setProject(project);
    window.location.assign(`#/projects/${project._id}`);
  };

  return (
    <div className="list">
      <h1>{pageTitle}</h1>
      {projects.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
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
                <tr onClick={() => onTableRowClick(project)} tabIndex={0} aria-label={`"${project.title}", managed by ${project.manager.firstName} ${project.manager.lastName}, click for details`}>
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
  );
}
Projects.propTypes = {
  setStatus: PropTypes.func.isRequired,
  setProject: PropTypes.func.isRequired
};
