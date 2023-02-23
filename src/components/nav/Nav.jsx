import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="#">Home</Link>
        </li>
      </ul>
    </nav>
  );
}
