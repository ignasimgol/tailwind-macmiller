import React from 'react';
import Three from '../components/Three';
import Songs from '../components/Songs';
import '../App.css';

const Faces = () => {
  return (
    <div className="flex justify-between items-center h-screen p-5">
      <div className="flex-1 max-w-3/5">
        <Three />
      </div>

      <div className="flex-1 max-w-2/5 pl-5">
        <h1 className="text-2xl mb-4">Faces</h1>
        <Songs />
      </div>
    </div>
  );
};

export default Faces;
