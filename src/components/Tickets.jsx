import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Tickets({ setStatus }) {
  const pageTitle = 'Tickets';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${helpers.apiHost}/tickets`, { credentials: 'include' });

        setStatus(response.status);

        if (response.status === 500) return;
        if (response.status === 401) {
          window.location.assign('#/signin');
          return;
        }

        helpers.updateTitle(pageTitle);
      } catch {
        setStatus(500);
      }
    })();
  }, []);

  return <h1>{pageTitle}</h1>;
}
Tickets.propTypes = {
  setStatus: PropTypes.func.isRequired
};
