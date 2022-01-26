import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'toastr/build/toastr.min.css'
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Clients from './components/Clients';
import Projects from './components/Projects';
import { useState } from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/clients" element={<Clients />} />
    </Routes>
  )
}

export default App;
