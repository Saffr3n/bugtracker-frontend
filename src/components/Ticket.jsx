import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';

export default function Ticket({ session, setSession }) {
  const [ticket, setTicket] = useState(null);
  let pageTitle;

  useEffect(() => {
    (async () => {
      const id = window.location.hash.split('/')[2];

      try {
        const response = await fetch(`${helpers.apiHost}/tickets/${id}`, { credentials: 'include' });
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

        const { ticket } = data;

        setTicket(ticket);
        pageTitle = ticket.title;
        helpers.updateTitle(pageTitle);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();
  }, []);

  return ticket ? (
    <div className="list">
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <small>
        <span>
          Status: <span style={{ color: ticket.status ? 'red' : 'green' }}>{ticket.status ? 'open' : 'closed'}</span>
        </span>
        <span>
          Submitter: <Link to={`/users/${ticket.submitter._id}`} reloadDocument>{`${ticket.submitter.firstName} ${ticket.submitter.lastName}`}</Link>
        </span>
        <span>Created: {new Date(ticket.created).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
      </small>
      {/* {session.user.role === 'Admin' || session.user._id === ticket.submitter._id ? <button type="button">Edit</button> : null} */}
      <hr style={{ alignSelf: 'stretch' }} />
      <h2>Developers</h2>
      {ticket.devs.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={helpers.onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {ticket.devs.map((dev) => (
                <tr key={dev._id} onClick={() => helpers.onTableRowClick('users', dev._id)} tabIndex={0} aria-label={`Developer: ${dev.firstName} ${dev.lastName}, click for details`}>
                  <td>{`${dev.firstName} ${dev.lastName}`}</td>
                  <td>{new Date(dev.registered).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>There are no developers yet...</p>
      )}
      <button type="button" onClick={() => {}}>
        Add Developers
      </button>
      {/* <hr style={{ alignSelf: 'stretch' }} />
      <h2>Comments</h2>
      {ticket.comments.length ? (
        'TODO'
      ) : (
        <p>There are no comments yet...</p>
      )} */}
    </div>
  ) : null;
}
Ticket.propTypes = {
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
