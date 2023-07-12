import React from 'react';
import PropTypes from 'prop-types';
import Router from './Router';
import ServerError from './Main/ServerError';

export default function Main({ session, setSession }) {
  return <main data-testid="main">{session.status !== 500 ? <Router session={session} setSession={setSession} /> : <ServerError />}</main>;
}
Main.propTypes = {
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
