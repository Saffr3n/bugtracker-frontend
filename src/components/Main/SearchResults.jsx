import React, { useEffect } from 'react';
import { updateTitle } from '../../helpers';

export default function SearchResults() {
  const pageTitle = 'Search Results';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <>
      <h1>Search Results</h1>
      <p style={{ textAlign: 'center' }}>Work in progress...</p>
    </>
  );
}
