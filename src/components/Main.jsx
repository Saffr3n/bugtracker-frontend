import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Main({ status, setStatus }) {
  return (
    <main data-testid="main">
      {status === 500 ? (
        <>
          <h1>Server Error</h1>
          <p style={{ textAlign: 'center' }}>Please try again later.</p>
        </>
      ) : (
        <Routes>
          {status === 200 ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/search" element={<h1>Search</h1>} />
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/projects" element={<h1>Projects</h1>} />
              <Route path="/tickets" element={<h1>Tickets</h1>} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/signout" element={<Navigate to="/signin" />} />
              <Route path="/signin" element={<SignIn setStatus={setStatus} />} />
              <Route path="/signup" element={<SignUp setStatus={setStatus} />} />
            </>
          )}
        </Routes>
      )}
    </main>
  );
}
Main.propTypes = {
  status: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired
};
