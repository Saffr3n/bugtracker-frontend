import React, { useEffect } from 'react';
import * as helpers from '../helpers';

export default function ServerError() {
  const pageTitle = 'Server Error';

  useEffect(() => helpers.updateTitle(pageTitle), []);

  return (
    <>
      <h1>Server Error</h1>
      <p style={{ textAlign: 'center' }}>Please try again later.</p>
    </>
  );
}
