import React from 'react';
import PropTypes from 'prop-types';

export default function Project({ project }) {
  return (
    <>
      <h1>{project.title}</h1>
      <p style={{ textAlign: 'center' }}>{project.description}</p>
    </>
  );
}
Project.propTypes = {
  project: PropTypes.func.isRequired
};
