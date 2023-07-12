import React, { useEffect } from 'react';
import * as helpers from '../../helpers';

export default function SearchResults() {
  const pageTitle = 'Search Results';

  useEffect(() => helpers.updateTitle(pageTitle), []);

  return (
    <>
      <h1>Search Results</h1>
      <p style={{ textAlign: 'center' }}>Work in progress...</p>
    </>
  );
}
