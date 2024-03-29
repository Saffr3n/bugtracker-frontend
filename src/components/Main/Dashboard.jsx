import React, { useEffect } from 'react';
import { updateTitle } from '../../helpers';

export default function Dashboard() {
  const pageTitle = 'Dashboard';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{ textAlign: 'center' }}>Work in progress...</p>
    </>
  );
}
