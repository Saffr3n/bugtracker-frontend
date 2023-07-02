import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';
import Logo from '../assets/logo.svg';
import SearchIcon from '../assets/icons/search.svg';
import NotificationsIcon from '../assets/icons/notifications.svg';

export default function Header({ status, setStatus }) {
  const onSearchFocus = (e) => {
    e.target.placeholder = '';
  };

  const onSearchBlur = (e) => {
    e.target.placeholder = 'Search...';
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.querySelector('input').value;
    const url = `#/search?q=${searchQuery}`;
    window.location.assign(url);
  };

  const userMenuClickHandler = (e) => {
    const clickedUserMenu = (target) => {
      if (!target || !target.classList) return false;
      if (target.classList.contains('user-menu')) return true;
      return clickedUserMenu(target.parentNode);
    };
    if (clickedUserMenu(e.target)) return;

    document.querySelector('.user').setAttribute('aria-expanded', false);
    document.querySelector('.user-menu').style.display = 'none';
    document.removeEventListener('click', userMenuClickHandler);
  };

  const onUserBtnClick = (e) => {
    e.stopPropagation();
    const expanded = JSON.parse(e.target.getAttribute('aria-expanded'));
    e.target.setAttribute('aria-expanded', !expanded);

    if (expanded) {
      document.querySelector('.user-menu').style.display = 'none';
      document.removeEventListener('click', userMenuClickHandler);
    } else {
      document.querySelector('.user-menu').style.display = 'block';
      document.addEventListener('click', userMenuClickHandler);
    }
  };

  const onSignOut = async () => {
    document.removeEventListener('click', userMenuClickHandler);
    await fetch(helpers.apiHost, {
      method: 'DELETE',
      credentials: 'include'
    });
    setStatus(400);
    window.location.assign('#/signin');
  };

  return (
    <header data-testid="header">
      <div aria-hidden="true">
        <Logo />
        <span>BugTracker</span>
      </div>

      {status === 500 ? null : status === 200 ? (
        <>
          <form onSubmit={onSearchSubmit} role="search" noValidate>
            <input type="search" placeholder="Search..." onFocus={onSearchFocus} onBlur={onSearchBlur} aria-label="Search" />
            <button type="submit" className="svg">
              <SearchIcon aria-label="Perform search" />
            </button>
          </form>

          <div>
            <button type="button" className="svg" aria-haspopup="true" aria-expanded="false">
              <NotificationsIcon aria-label="Browse notifications" />
            </button>
            <button type="button" className="user" onClick={onUserBtnClick} aria-label="Open the user menu" aria-haspopup="true" aria-expanded="false" />
            <div className="user-menu">
              <ul>
                <li>Some</li>
                <li>Stuff</li>
                <li>Here</li>
                <li>
                  <Link to="/signout" onClick={onSignOut}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div aria-hidden="true">
          <Link to="/signin" reloadDocument tabIndex="-1">
            Sign In
          </Link>
          <Link to="/signup" reloadDocument tabIndex="-1">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
Header.propTypes = {
  status: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired
};
