import React from 'react';
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/icons/search.svg';
import notificationsIcon from '../../assets/icons/notifications.svg';
import './header.scss';

export default function Header() {
  const onSearchFocus = (e) => {
    e.target.placeholder = '';
  };

  const onSearchBlur = (e) => {
    e.target.placeholder = 'Search...';
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.childNodes[0].value;
    const url = `#/search?q=${searchQuery}`;
    window.location.assign(url);
  };

  return (
    <header>
      <div className="logo" aria-hidden="true">
        <img src={logo} width="48" height="48" alt="" />
        <span className="hidden">BugTracker</span>
      </div>

      <form className="search" onSubmit={onSearchSubmit} role="search">
        <input
          type="search"
          aria-label="Search"
          placeholder="Search..."
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
        <button type="submit">
          <img src={searchIcon} width="24" height="24" alt="Perform search" />
        </button>
      </form>

      <div className="user-panel">
        <button type="button" aria-haspopup="menu" aria-expanded="false">
          <img
            src={notificationsIcon}
            width="24"
            height="24"
            alt="Browse notifications"
          />
        </button>
        <button
          className="menu"
          type="button"
          aria-label="Open user menu"
          aria-haspopup="true"
          aria-expanded="false"
        />
      </div>
    </header>
  );
}
