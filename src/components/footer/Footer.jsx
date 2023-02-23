import React from 'react';
import GhIcon from '../../assets/icons/github.svg';
import './footer.scss';

export default function Footer() {
  return (
    <footer>
      <small>
        Copyright &copy; 2023{' '}
        <a href="https://github.com/saffr3n" target="_blank" rel="noreferrer">
          <GhIcon aria-label="Visit author's GitHub" />
          Saffr3n
        </a>
      </small>
    </footer>
  );
}
