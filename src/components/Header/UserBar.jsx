import React from 'react';
import PropTypes from 'prop-types';
import { onUserMenuClick } from '../../helpers';
import UserMenu from './UserBar/UserMenu';
import NotificationsIcon from '../../assets/icons/notifications.svg';

export default function UserBar({ setSession }) {
  const onUserBtnClick = (e) => {
    const expanded = JSON.parse(e.target.getAttribute('aria-expanded'));
    e.target.setAttribute('aria-expanded', !expanded);

    if (expanded) {
      document.querySelector('.user-menu').style.display = 'none';
      document.removeEventListener('click', onUserMenuClick);
    } else {
      document.querySelector('.user-menu').style.display = 'block';
      document.addEventListener('click', onUserMenuClick);
    }
  };

  return (
    <div className="user-bar">
      <button className="svg" type="button" aria-haspopup="true" aria-expanded="false">
        <NotificationsIcon aria-label="Browse notifications" />
      </button>
      <button className="user-btn" type="button" onClick={onUserBtnClick} aria-label="Open the user menu" aria-haspopup="true" aria-expanded="false" />
      <UserMenu setSession={setSession} />
    </div>
  );
}
UserBar.propTypes = {
  setSession: PropTypes.func.isRequired
};
