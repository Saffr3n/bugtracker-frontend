import React, { useEffect } from 'react';
import * as helpers from '../../helpers';

export default function PageNotFound() {
  const pageTitle = 'Page Not Found';

  useEffect(() => helpers.updateTitle(pageTitle), []);

  return (
    <>
      <h1>Page Not Found</h1>
      <p style={{ textAlign: 'center' }}>Please provide a correct address.</p>
    </>
  );
}
