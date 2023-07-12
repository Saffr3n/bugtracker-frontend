import React from 'react';
import PropTypes from 'prop-types';
import LinkBarAuthorized from './Nav/LinkBarAuthorized';
import LinkBarUnauthorized from './Nav/LinkBarUnauthorized';

export default function Nav({ session }) {
  return session.status !== 500 ? (
    <nav data-testid="nav">
      <ul>{session.status !== 401 ? <LinkBarAuthorized /> : <LinkBarUnauthorized />}</ul>
    </nav>
  ) : null;
}
Nav.propTypes = {
  session: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  }).isRequired
};
