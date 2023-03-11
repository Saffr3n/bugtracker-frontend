import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Main({ authorized, setAuthorized }) {
  return (
    <main>
      <Routes>
        {authorized ? (
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
            <Route path="/signin" element={<SignIn setAuthorized={setAuthorized} />} />
            <Route path="/signup" element={<SignUp setAuthorized={setAuthorized} />} />
          </>
        )}
      </Routes>
    </main>
  );
}
Main.propTypes = {
  authorized: PropTypes.bool.isRequired,
  setAuthorized: PropTypes.func.isRequired
};
