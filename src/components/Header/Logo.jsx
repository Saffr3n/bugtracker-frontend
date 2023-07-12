import React from 'react';
import Image from '../../assets/logo.svg';

export default function Logo() {
  return (
    <div className="logo" aria-hidden="true">
      <Image />
      <span>BugTracker</span>
    </div>
  );
}
