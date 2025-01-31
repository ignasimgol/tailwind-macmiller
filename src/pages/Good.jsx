import React from 'react';
import ThreeGood from '../components/ThreeGood';
import Songs from '../components/Songs';
import BackButton from '../components/BackButton';
import '../App.css';

const Good = () => {
  return (
    <div className="faces-page relative h-screen p-5">
      {/* Colocamos el botón de retroceso en la parte superior izquierda */}
      <div className="absolute top-12 left-4 z-10">
        <BackButton />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center h-full">
        <div className="flex-1 w-full lg:max-w-3/5">
          <ThreeGood />
        </div>

        <div className="flex-1 w-full lg:max-w-2/5 lg:pl-5">
          <Songs albumId={2} />
        </div>
      </div>
    </div>
  );
};

export default Good;