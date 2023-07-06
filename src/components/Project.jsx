import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Project({ setStatus }) {
  const [project, setProject] = useState(null);
  let pageTitle;

  useEffect(() => {
    (async () => {
      const id = window.location.hash.split('/')[2];

      try {
        const response = await fetch(`${helpers.apiHost}/projects/${id}`, { credentials: 'include' });

        setStatus(response.status);

        if (response.status === 500) return;
        if (response.status === 401) {
          window.location.assign('#/signin');
          return;
        }
        if (response.status === 400) {
          window.location.assign('#/404');
          return;
        }

        const project = await response.json();

        setProject(project);
        pageTitle = project.title;
        helpers.updateTitle(pageTitle);
      } catch {
        setStatus(500);
      }
    })();
  }, []);

  return project ? (
    <div className="list">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <small>
        Project Manager: <Link to={`/users/${project.manager._id}`} reloadDocument>{`${project.manager.firstName} ${project.manager.lastName}`}</Link>
      </small>
      <hr style={{ alignSelf: 'stretch' }} />
      <h2>Tickets</h2>
      {project.tickets.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={helpers.onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Submitter</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {project.tickets.map((ticket) => (
                <tr onClick={() => helpers.onTableRowClick(ticket._id)} tabIndex={0} aria-label={`Ticket: "${ticket.title}", status: ${ticket.status}, submitted by ${ticket.submitter.firstName} ${ticket.submitter.lastName}, click for details`}>
                  <td>{ticket.title}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.description}</td>
                  <td>{`${ticket.submitter.firstName} ${ticket.submitter.lastName}`}</td>
                  <td>{ticket.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no tickets yet...</p>
      )}
      <hr style={{ alignSelf: 'stretch' }} />
      <h2>Users</h2>
      {project.users.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={helpers.onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {project.users.map((user) => (
                <tr onClick={() => helpers.onTableRowClick(user._id)} tabIndex={0} aria-label={`User: ${user.firstName} ${user.lastName}, role: ${user.role}, click for details`}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.role}</td>
                  <td>{user.registered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no users yet...</p>
      )}
    </div>
  ) : null;
}
Project.propTypes = {
  setStatus: PropTypes.func.isRequired
};
