import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import * as helpers from './helpers';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './assets/styles/style.scss';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(helpers.apiHost, { credentials: 'include' });
        const data = await response.json();

        setSession(data);

        if (data.status === 500) return;

        if (!window.location.hash) {
          window.location.assign(data.status === 200 ? '#/dashboard' : '#/signin');
        } else {
          setTimeout(() => helpers.onHashChange());
        }

        window.addEventListener('hashchange', helpers.onHashChange);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();

    return () => window.removeEventListener('hashchange', helpers.onHashChange);
  }, []);

  return session !== null ? (
    <HashRouter>
      <Header session={session} setSession={setSession} />
      {session !== 500 ? <Nav session={session} /> : null}
      <Main session={session} setSession={setSession} />
      <Footer />
    </HashRouter>
  ) : null;
}
