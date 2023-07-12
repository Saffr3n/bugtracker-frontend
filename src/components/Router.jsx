import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchResults from './Main/SearchResults';
import Dashboard from './Main/Dashboard';
import Projects from './Main/Projects';
import ProjectCreate from './Main/ProjectCreate';
import Project from './Main/Project';
import Tickets from './Main/Tickets';
import TicketCreate from './Main/TicketCreate';
import Ticket from './Main/Ticket';
import SignIn from './Main/SignIn';
import SignUp from './Main/SignUp';
import PageNotFound from './Main/PageNotFound';

export default function Router({ session, setSession }) {
  return (
    <Routes>
      {session.status !== 401 ? (
        <>
          <Route path="/signout" element={<h1>Signing out...</h1>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<Projects session={session} setSession={setSession} />} />
          <Route path="/projects/create" element={<ProjectCreate session={session} setSession={setSession} />} />
          <Route path="/projects/*" element={<Project session={session} setSession={setSession} />} />

          <Route path="/tickets" element={<Tickets session={session} setSession={setSession} />} />
          <Route path="/tickets/create" element={<TicketCreate session={session} setSession={setSession} />} />
          <Route path="/tickets/*" element={<Ticket session={session} setSession={setSession} />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<SignIn setSession={setSession} />} />
          <Route path="/signup" element={<SignUp setSession={setSession} />} />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
Router.propTypes = {
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
