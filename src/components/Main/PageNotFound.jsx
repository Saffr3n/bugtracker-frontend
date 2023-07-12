import React, { useEffect } from 'react';
import { updateTitle } from '../../helpers';

export default function PageNotFound() {
  const pageTitle = 'Page Not Found';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <>
      <h1>Page Not Found</h1>
      <p style={{ textAlign: 'center' }}>Please provide a correct address.</p>
    </>
  );
}
