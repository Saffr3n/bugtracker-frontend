import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import * as helpers from './helpers';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './assets/styles/style.scss';

export default function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(helpers.apiHost, { credentials: 'include' }).catch(() => setStatus(500));

      setStatus(response.status);

      if (!window.location.hash) {
        window.location.assign(response.status === 200 ? '#/dashboard' : '#/signin');
      } else {
        setTimeout(() => helpers.onHashChange());
      }
    })();

    window.addEventListener('hashchange', helpers.onHashChange);
    return () => window.removeEventListener('hashchange', helpers.onHashChange);
  }, []);

  return status !== null ? (
    <HashRouter>
      <Header status={status} setStatus={setStatus} />
      {status !== 500 ? <Nav status={status} /> : null}
      <Main status={status} setStatus={setStatus} />
      <Footer />
    </HashRouter>
  ) : null;
}
