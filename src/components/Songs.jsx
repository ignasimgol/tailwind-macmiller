import React from "react";
import { Play } from "lucide-react";
import songsData from "../assets/songs.json"; // Importa el JSON

const Songs = ({ albumId }) => {
  // Filtra las canciones por albumId
  const album = songsData.find((album) => album.albumId === albumId);

  if (!album) return <p className="text-white">Álbum no encontrado</p>;

  return (
    <div className="bg-black text-white p-6 max-w-md w-full mx-auto rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-center md:text-left">{album.albumName}</h2>
      <div className="max-h-80 overflow-y-auto custom-scrollbar pr-2 sm:pr-4">
        <ul className="space-y-3">
          {album.songs.map((song) => (
            <li 
              key={song.id} 
              className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-2 gap-3"
            >
              <span className="text-gray-400">{song.id}</span>
              <span className="flex-1 px-2 sm:px-4 truncate">{song.title}</span>
              <span className="text-gray-400">{song.duration}</span>
              <a 
                href={song.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-500 hover:text-green-400 transition pl-2"
              >
                <Play size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Songs;


