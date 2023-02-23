import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.scss';

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h1>Main</h1>} />
      </Routes>
    </main>
  );
}
