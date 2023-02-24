import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import './assets/styles/style.scss';

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </HashRouter>
  );
}
