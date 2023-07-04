import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Project({ setStatus }) {
  const [project, setProject] = useState({});
  let pageTitle;

  useEffect(() => {
    (async () => {
      const id = window.location.hash.split('/')[2];
      const response = await fetch(`${helpers.apiHost}/projects/${id}`, { credentials: 'include' }).catch(() => setStatus(500));

      setStatus(response.status);

      const project = await response.json();

      setProject(project);
      pageTitle = project.title;
      helpers.updateTitle(pageTitle);

      if (response.status === 401) window.location.assign('#/signin');
    })();
  }, []);

  return (
    <>
      <h1>{project.title}</h1>
      <p style={{ textAlign: 'center' }}>{project.description}</p>
    </>
  );
}
Project.propTypes = {
  setStatus: PropTypes.func.isRequired
};
