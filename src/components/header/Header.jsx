import React from 'react';
import Logo from '../../assets/logo.svg';
import SearchIcon from '../../assets/icons/search.svg';
import NotificationsIcon from '../../assets/icons/notifications.svg';
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
        <Logo />
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
          <SearchIcon aria-label="Perform search" />
        </button>
      </form>

      <div className="user-panel">
        <button type="button" aria-haspopup="menu" aria-expanded="false">
          <NotificationsIcon aria-label="Browse notifications" />
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
