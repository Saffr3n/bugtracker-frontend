import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ServerError from './ServerError';
import PageNotFound from './PageNotFound';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SearchResults from './SearchResults';
import Dashboard from './Dashboard';
import Projects from './Projects';
import ProjectCreate from './ProjectCreate';
import Project from './Project';
import Tickets from './Tickets';

export default function Main({ status, setStatus }) {
  return (
    <main data-testid="main">
      {status === 500 ? (
        <ServerError />
      ) : (
        <Routes>
          {status === 200 ? (
            <>
              <Route path="/search" element={<SearchResults />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects setStatus={setStatus} />} />
              <Route path="/projects/create" element={<ProjectCreate setStatus={setStatus} />} />
              <Route path="/projects/*" element={<Project setStatus={setStatus} />} />
              <Route path="/tickets" element={<Tickets setStatus={setStatus} />} />
              <Route path="/signout" element={<h1>Signing out...</h1>} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignIn setStatus={setStatus} />} />
              <Route path="/signup" element={<SignUp setStatus={setStatus} />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </main>
  );
}
Main.propTypes = {
  status: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired
};
