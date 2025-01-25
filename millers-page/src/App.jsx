import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define Home como una ruta */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;


