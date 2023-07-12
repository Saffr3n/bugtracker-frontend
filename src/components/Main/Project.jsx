import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { apiHost, updateTitle, onSearchFocus, onSearchBlur, onSearchInput, onTableRowClick } from '../../helpers';

export default function Project({ session, setSession }) {
  const [project, setProject] = useState(null);
  let pageTitle;

  useEffect(() => {
    (async () => {
      const id = window.location.hash.split('/')[2];

      try {
        const response = await fetch(`${apiHost}/projects/${id}`, { credentials: 'include' });
        const data = await response.json();

        setSession({ ...data, user: session.user });

        if (data.status === 500) return;
        if (data.status === 401) {
          window.location.assign('#/signin');
          return;
        }
        if (data.status === 400) {
          window.location.assign('#/404');
          return;
        }

        const { project } = data;

        setProject(project);
        pageTitle = project.title;
        updateTitle(pageTitle);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();
  }, []);

  const onProjectEdit = () => {};

  return project ? (
    <div className="list">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <small>
        <span>
          Project Manager: <Link to={`/users/${project.manager._id}`} reloadDocument>{`${project.manager.firstName} ${project.manager.lastName}`}</Link>
        </span>
        <span>Created: {new Date(project.created).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
      </small>
      {session.user.role === 'Admin' || session.user._id === project.manager._id ? (
        <button type="button" onClick={onProjectEdit}>
          Edit
        </button>
      ) : null}
      <hr style={{ alignSelf: 'stretch' }} />
      <h2>Tickets</h2>
      {project.tickets.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={onSearchInput} onFocus={onSearchFocus} onBlur={onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Submitter</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {project.tickets.map((ticket) => (
                <tr key={ticket._id} onClick={() => onTableRowClick('tickets', ticket._id)} tabIndex={0} aria-label={`Ticket: "${ticket.title}", status: ${ticket.status}, submitted by ${ticket.submitter.firstName} ${ticket.submitter.lastName}, click for details`}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td style={{ color: ticket.status ? 'red' : 'green' }}>{ticket.status ? 'open' : 'closed'}</td>
                  <td>{`${ticket.submitter.firstName} ${ticket.submitter.lastName}`}</td>
                  <td>{new Date(ticket.created).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no tickets yet...</p>
      )}
      <button type="button" onClick={() => window.location.assign(`#/tickets/create?p=${project._id}`)}>
        New Ticket
      </button>
      <hr style={{ alignSelf: 'stretch' }} />
      <h2>Users</h2>
      <input type="search" placeholder="Search..." onInput={onSearchInput} onFocus={onSearchFocus} onBlur={onSearchBlur} aria-label="Search in table" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          <tr key={project.manager._id} onClick={() => onTableRowClick('users', project.manager._id)} tabIndex={0} aria-label={`User: ${project.manager.firstName} ${project.manager.lastName}, role: Project Manager, click for details`}>
            <td>{`${project.manager.firstName} ${project.manager.lastName}`}</td>
            <td>Project Manager</td>
            <td>{new Date(project.manager.registered).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</td>
          </tr>
          {project.users.length
            ? project.users.map((user) => (
                <tr key={user._id} onClick={() => onTableRowClick('users', user._id)} tabIndex={0} aria-label={`User: ${user.firstName} ${user.lastName}, role: ${user.role}, click for details`}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.registered).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  ) : null;
}
Project.propTypes = {
  session: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setSession: PropTypes.func.isRequired
};
