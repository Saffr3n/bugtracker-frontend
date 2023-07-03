import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Projects({ setStatus }) {
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

  return (
    <div className="list">
      <h1>{pageTitle}</h1>
      {projects.length ? <p>project list...</p> : <p>You don&apos;t have any projects yet...</p>}
      <button type="button" onClick={() => window.location.assign('#/projects/create')}>
        New Project
      </button>
    </div>
  );
}
Projects.propTypes = {
  setStatus: PropTypes.func.isRequired
};
