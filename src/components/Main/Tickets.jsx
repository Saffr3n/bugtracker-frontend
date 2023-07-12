import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../../helpers';

export default function Tickets({ session, setSession }) {
  const [tickets, setTickets] = useState(null);
  const pageTitle = 'Tickets';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${helpers.apiHost}/tickets`, { credentials: 'include' });
        const data = await response.json();

        setSession({ ...data, user: session.user });

        if (data.status === 500) return;
        if (data.status === 401) {
          window.location.assign('#/signin');
          return;
        }

        setTickets(data.tickets);
        helpers.updateTitle(pageTitle);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();
  }, []);

  return tickets !== null ? (
    <div className="list">
      <h1>{pageTitle}</h1>
      {tickets.length ? (
        <>
          <input type="search" placeholder="Search..." onInput={helpers.onSearchInput} onFocus={helpers.onSearchFocus} onBlur={helpers.onSearchBlur} aria-label="Search in table" />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Project</th>
                <th>Submitter</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} onClick={() => helpers.onTableRowClick('tickets', ticket._id)} tabIndex={0} aria-label={`Ticket: "${ticket.title}", status: ${ticket.status}, submitted by ${ticket.submitter.firstName} ${ticket.submitter.lastName}, click for details`}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td style={{ color: ticket.status ? 'red' : 'green' }}>{ticket.status ? 'open' : 'closed'}</td>
                  <td>{ticket.project.title}</td>
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
      <button type="button" onClick={() => window.location.assign('#/tickets/create')}>
        New Ticket
      </button>
    </div>
  ) : null;
}
Tickets.propTypes = {
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
