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
import TicketCreate from './TicketCreate';
// import Ticket from './Ticket';

export default function Main({ session, setSession }) {
  return (
    <main data-testid="main">
      {session.status === 500 ? (
        <ServerError />
      ) : (
        <Routes>
          {session.status !== 401 ? (
            <>
              <Route path="/search" element={<SearchResults />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/projects" element={<Projects session={session} setSession={setSession} />} />
              <Route path="/projects/create" element={<ProjectCreate session={session} setSession={setSession} />} />
              <Route path="/projects/*" element={<Project session={session} setSession={setSession} />} />

              <Route path="/tickets" element={<Tickets session={session} setSession={setSession} />} />
              <Route path="/tickets/create" element={<TicketCreate session={session} setSession={setSession} />} />
              {/* <Route path="/tickets/*" element={<Ticket setSession={setSession} />} /> */}

              <Route path="/signout" element={<h1>Signing out...</h1>} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignIn setSession={setSession} />} />
              <Route path="/signup" element={<SignUp setSession={setSession} />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </main>
  );
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
