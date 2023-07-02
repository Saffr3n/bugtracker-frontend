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
      try {
        const response = await fetch(helpers.apiHost, { credentials: 'include' });
        setStatus(response.status);
        if (response.status === 200 && !window.location.hash) window.location.assign('#/dashboard');
        if (response.status === 401 && !window.location.hash) window.location.assign('#/signin');
        setTimeout(() => {
          helpers.deactivateLinks();
          helpers.activateLinks();
        });
      } catch {
        setStatus(500);
      }
    })();

    const onHashChange = () => {
      helpers.deactivateLinks();
      helpers.activateLinks();
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
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
