import React from 'react';
import Three from '../components/Three';
import Songs from '../components/Songs';
import '../App.css';

const Faces = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center h-screen p-5">
      <div className="flex-1 w-full lg:max-w-3/5">
        <Three />
      </div>

      <div className="flex-1 w-full lg:max-w-2/5 lg:pl-5">
        <Songs albumId={1} />
      </div>
    </div>
  );
};

export default Faces;

