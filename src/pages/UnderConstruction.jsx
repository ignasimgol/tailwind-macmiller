import React from 'react';
import BackButton from '../components/BackButton';
import '../App.css';

const UnderConstruction = () => {
  return (
    <div className="faces-page relative h-screen p-5">
      {/* Colocamos el botón de retroceso en la parte superior izquierda */}
      <div className="absolute top-12 left-4 z-10">
        <BackButton />
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Página en construcción</h1>
          <p className="text-xl">Estamos trabajando para traerte contenido increíble pronto.</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;