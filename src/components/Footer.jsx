import React from 'react';
import GhIcon from '../assets/icons/github.svg';

export default function Footer() {
  return (
    <footer>
      <small>
        Copyright &copy; 2023
        <span className="visually-hidden">Saffren.</span>
        <a href="https://github.com/saffr3n" target="_blank" rel="noreferrer">
          <GhIcon aria-label="Visit the author's GitHub" />
          <span aria-hidden="true">Saffr3n</span>
        </a>
      </small>
    </footer>
  );
}
