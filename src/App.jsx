import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Faces from './pages/Faces';
import Swimming from './pages/Swimming';
import Good from './pages/Good';
import Music from './pages/Music';
import UnderConstruction from './pages/UnderConstruction';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // Aplicar o quitar la clase .dark-mode en el <html> dependiendo del estado
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
       <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/faces" element={<Faces />} />
        <Route path="/music/swimming" element={<Swimming />} />
        <Route path="/music/good" element={<Good />} />
        <Route path="/under-construction" element={<UnderConstruction />} />
      </Routes>
    </Router>
  );
};

export default App;
