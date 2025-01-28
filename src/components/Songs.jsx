import React from "react";
import { Play } from "lucide-react"; // Usa lucide-react para iconos

const songs = [
  { id: 1, title: "The Spins", duration: "3:15", spotifyUrl: "https://open.spotify.com/track/1" },
  { id: 2, title: "5 Dollar Pony Rides", duration: "3:42", spotifyUrl: "https://open.spotify.com/track/2" },
  { id: 3, title: "Congratulations (feat. Bilal)", duration: "4:16", spotifyUrl: "https://open.spotify.com/track/3" },
  { id: 4, title: "Love Lost", duration: "2:42", spotifyUrl: "https://open.spotify.com/track/4" },
  { id: 5, title: "Funny Papers", duration: "4:23", spotifyUrl: "https://open.spotify.com/track/5" },
  { id: 6, title: "The Spins", duration: "3:15", spotifyUrl: "https://open.spotify.com/track/1" },
  { id: 7, title: "5 Dollar Pony Rides", duration: "3:42", spotifyUrl: "https://open.spotify.com/track/2" },
  { id: 8, title: "Congratulations (feat. Bilal)", duration: "4:16", spotifyUrl: "https://open.spotify.com/track/3" },
  { id: 9, title: "Love Lost", duration: "2:42", spotifyUrl: "https://open.spotify.com/track/4" },
  { id: 10, title: "Funny Papers", duration: "4:23", spotifyUrl: "https://open.spotify.com/track/5" }
];

const Songs = () => {
  return (
    <div className="bg-black text-white p-6 max-w-lg mx-auto rounded-lg">
      <div className="max-h-80 overflow-y-auto custom-scrollbar pr-4"> {/* Contenedor con scroll */}
        <ul className="space-y-4">
          {songs.map((song) => (
            <li key={song.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="text-gray-400">{song.id}</span>
              <span className="flex-1 px-4">{song.title}</span>
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

