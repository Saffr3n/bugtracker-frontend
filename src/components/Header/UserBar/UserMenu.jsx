import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { apiHost, onUserMenuClick } from '../../../helpers';

export default function UserMenu({ setSession }) {
  const onSignOut = async () => {
    document.removeEventListener('click', onUserMenuClick);

    try {
      const response = await fetch(apiHost, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();

      setSession(data);
      window.location.assign('#/signin');
    } catch {
      setSession({ status: 500, message: 'Server Error' });
    }
  };

  return (
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
  );
}
UserMenu.propTypes = {
  setSession: PropTypes.func.isRequired
};
