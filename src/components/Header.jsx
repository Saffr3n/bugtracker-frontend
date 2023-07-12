import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Header/Logo';
import SearchBar from './Header/SearchBar';
import UserBar from './Header/UserBar';
import LinkBar from './Header/LinkBar';

export default function Header({ session, setSession }) {
  return (
    <header data-testid="header">
      <Logo />

      {session.status !== 500 ? (
        session.status !== 401 ? (
          <>
            <SearchBar />
            <UserBar setSession={setSession} />
          </>
        ) : (
          <LinkBar />
        )
      ) : null}
    </header>
  );
}
Header.propTypes = {
  session: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  }).isRequired,
  setSession: PropTypes.func.isRequired
};
