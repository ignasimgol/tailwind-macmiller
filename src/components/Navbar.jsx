import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 relative">
      {/* Botón de Modo Oscuro */}
    
      <button className="text-2xl absolute top-4 left-4" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? '🎺' : '🎈'}
        </button>

      {/* Contenedor del botón de hamburguesa */}
      <div className="container mx-auto flex justify-end items-right">
        <button
          onClick={toggleMenu}
          className="focus:outline-none lg:absolute lg:top-4 lg:right-4"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Menú vertical (siempre en formato hamburguesa) */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute top-full right-0`}
      >
        <ul className="flex flex-col items-end space-y-2 p-4">
          <li>
            <Link
              to="/"
              className="uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/music"
              className="uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Music
            </Link>
          </li>
          <li>
            <Link
              to="https://www.youtube.com/channel/UC3SEvBYhullC-aaEmbEQflg"
              className="uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              You Tube
            </Link>
          </li>
          <li>
            <Link
              to="https://open.spotify.com/artist/4LLpKhyESsyAXpc4laK94U"
              className="uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Spotify
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
