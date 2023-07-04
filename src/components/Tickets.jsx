import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Tickets({ setStatus }) {
  const pageTitle = 'Tickets';

  useEffect(() => {
    (async () => {
      const response = await fetch(`${helpers.apiHost}/tickets`, { credentials: 'include' }).catch(() => setStatus(500));

      setStatus(response.status);

      if (response.status === 401) window.location.assign('#/signin');
    })();

    helpers.updateTitle(pageTitle);
  }, []);

  return <h1>{pageTitle}</h1>;
}
Tickets.propTypes = {
  setStatus: PropTypes.func.isRequired
};
