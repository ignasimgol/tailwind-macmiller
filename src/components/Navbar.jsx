import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 relative" style={{ backgroundColor: '#E3E5E7' }}>
      {/* Contenedor del botón de hamburguesa */}
      <div className="container mx-auto flex justify-end items-right">
        {/* Botón de hamburguesa (posicionado absolutamente en pantallas grandes) */}
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none lg:absolute lg:top-4 lg:right-4"
        >
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
        </button>
      </div>

      {/* Menú vertical (siempre en formato hamburguesa) */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute top-full right-0`}
        style={{ backgroundColor: '#E3E5E7' }}
      >
        <ul className="flex flex-col items-end space-y-2 p-4">
          <li>
            <Link
              to="/"
              className="text-black uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/faces"
              className="text-black uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Faces
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black uppercase hover:text-gray-600 block"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;