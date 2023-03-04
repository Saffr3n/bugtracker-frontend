import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';
import Logo from '../assets/logo.svg';
import SearchIcon from '../assets/icons/search.svg';
import NotificationsIcon from '../assets/icons/notifications.svg';

export default function Header({ authorized }) {
  const onSearchFocus = (e) => {
    e.target.placeholder = '';
  };

  const onSearchBlur = (e) => {
    e.target.placeholder = 'Search...';
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    helpers.deactivateLinks();
    const searchQuery = e.target.childNodes[0].value;
    const url = `#/search?q=${searchQuery}`;
    window.location.assign(url);
  };

  return (
    <header>
      <div aria-hidden="true">
        <Logo />
        <span>BugTracker</span>
      </div>

      {authorized ? (
        <>
          <form onSubmit={onSearchSubmit} role="search" noValidate>
            <input
              type="search"
              placeholder="Search..."
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              aria-label="Search"
            />

            <button type="submit" className="svg">
              <SearchIcon aria-label="Perform search" />
            </button>
          </form>

          <div>
            <button
              type="button"
              className="svg"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <NotificationsIcon aria-label="Browse notifications" />
            </button>

            <button
              type="button"
              className="user"
              aria-label="Open user menu"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </div>
        </>
      ) : (
        <div>
          <Link to="/signin" className="active" onClick={helpers.reactivateLinks}>
            Sign In
          </Link>

          <Link to="/signup" onClick={helpers.reactivateLinks}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
Header.propTypes = {
  authorized: PropTypes.bool.isRequired
};
