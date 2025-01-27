import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Faces from './pages/Faces';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      {/* Navbar fuera de Routes, pero dentro de Router */}
      <Navbar />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faces" element={<Faces />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
};

export default App;


