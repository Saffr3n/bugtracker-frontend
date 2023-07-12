import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkBarAuthorized() {
  return (
    <>
      <li>
        <Link to="/dashboard" reloadDocument>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/projects" reloadDocument>
          Projects
        </Link>
      </li>
      <li>
        <Link to="/tickets" reloadDocument>
          Tickets
        </Link>
      </li>
    </>
  );
}
