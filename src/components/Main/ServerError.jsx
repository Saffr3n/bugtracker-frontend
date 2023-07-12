import React, { useEffect } from 'react';
import { updateTitle } from '../../helpers';

export default function ServerError() {
  const pageTitle = 'Server Error';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <>
      <h1>Server Error</h1>
      <p style={{ textAlign: 'center' }}>Please try again later.</p>
    </>
  );
}
