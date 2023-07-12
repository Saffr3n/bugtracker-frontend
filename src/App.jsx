import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { apiHost, onHashChange } from './helpers';
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
        const response = await fetch(apiHost, { credentials: 'include' });
        const data = await response.json();

        setSession(data);
        if (data.status === 500) return;

        if (!window.location.hash) {
          window.location.assign(data.status === 200 ? '#/dashboard' : '#/signin');
        } else {
          setTimeout(() => onHashChange());
        }

        window.addEventListener('hashchange', onHashChange);
      } catch {
        setSession({ status: 500, message: 'Server Error' });
      }
    })();

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return session !== null ? (
    <HashRouter>
      <Header session={session} setSession={setSession} />
      <Nav session={session} />
      <Main session={session} setSession={setSession} />
      <Footer />
    </HashRouter>
  ) : null;
}
