import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Projects from './Projects';
import Tickets from './Tickets';

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
              <Route
                path="/search"
                element={
                  <>
                    <h1>Search</h1>
                    <p style={{ textAlign: 'center' }}>Work in progress...</p>
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <h1>Dashboard</h1>
                    <p style={{ textAlign: 'center' }}>Work in progress...</p>
                  </>
                }
              />
              <Route path="/projects" element={<Projects setStatus={setStatus} />} />
              <Route path="/tickets" element={<Tickets setStatus={setStatus} />} />
              <Route path="/signout" element={<h1>Signing out...</h1>} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignIn setStatus={setStatus} />} />
              <Route path="/signup" element={<SignUp setStatus={setStatus} />} />
            </>
          )}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      )}
    </main>
  );
}
Main.propTypes = {
  status: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired
};
