import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Tickets({ setStatus }) {
  useEffect(() => {
    (async () => {
      let status;
      try {
        const response = await fetch(`${helpers.apiHost}/tickets`, { credentials: 'include' });
        status = response.status;
        setStatus(response.status);
      } catch {
        setStatus(500);
      }
      if (status === 401) window.location.assign('#/signin');
    })();
  }, []);

  return <h1>Tickets</h1>;
}
Tickets.propTypes = {
  setStatus: PropTypes.func.isRequired
};
