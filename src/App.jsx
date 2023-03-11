import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import * as helpers from './helpers';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './assets/styles/style.scss';

export default function App() {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(helpers.apiHost, { credentials: 'include' });
      setAuthorized(response.status === 200);
    })();
  }, []);

  return authorized !== null ? (
    <HashRouter>
      <Header authorized={authorized} setAuthorized={setAuthorized} />
      <Nav authorized={authorized} />
      <Main authorized={authorized} setAuthorized={setAuthorized} />
      <Footer />
    </HashRouter>
  ) : null;
}
