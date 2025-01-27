import React, { useEffect, useRef } from "react";

const music = [
  { title: "Canción 1", author: "By Ignasi Muñoz", image: "/img/best-day-ever.png", link: "/song-1" },
  { title: "Canción 2", author: "By Ignasi Muñoz", image: "/img/blue-slide-park.jpeg", link: "/song-2" },
  { title: "Canción 3", author: "By Ignasi Muñoz", image: "/img/circles.jpeg", link: "/song-3" },
  { title: "Canción 4", author: "By Ignasi Muñoz", image: "/img/faces.jpeg", link: "/song-4" },
  { title: "Canción 5", author: "Próximamente", image: "/img/from-space.jpeg" },
  { title: "Canción 6", author: "Próximamente", image: "/img/macadelic.jpeg" },
];

export default function Music() {
  return (
    <div className="px-5 py-10 mt-50">
      <CustomCarousel>
        {music.map((song, index) => {
          return <Card key={index} song={song} />;
        })}
      </CustomCarousel>
    </div>
  );
}

function CustomCarousel({ children }) {
  const slider = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);

  useEffect(() => {
    const sliderRef = slider.current;

    // Add mouse wheel support
    const handleWheel = (e) => {
      e.preventDefault();
      sliderRef.scrollLeft += e.deltaY * 2; // Adjust speed with a multiplier
    };

    sliderRef.addEventListener("mousedown", handleMouseDown);
    sliderRef.addEventListener("mouseleave", handleMouseLeave);
    sliderRef.addEventListener("mouseup", handleMouseUp);
    sliderRef.addEventListener("mousemove", handleMouseMove);
    sliderRef.addEventListener("wheel", handleWheel, { passive: false });

    sliderRef.addEventListener("touchstart", handleMouseDown);
    sliderRef.addEventListener("touchend", handleMouseUp);
    sliderRef.addEventListener("touchmove", handleMouseMove);

    return () => {
      sliderRef.removeEventListener("mousedown", handleMouseDown);
      sliderRef.removeEventListener("mouseleave", handleMouseLeave);
      sliderRef.removeEventListener("mouseup", handleMouseUp);
      sliderRef.removeEventListener("mousemove", handleMouseMove);
      sliderRef.removeEventListener("wheel", handleWheel);

      sliderRef.removeEventListener("touchstart", handleMouseDown);
      sliderRef.removeEventListener("touchend", handleMouseUp);
      sliderRef.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  function handleMouseDown(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
    slider.current.style.cursor = "grabbing";
  }

  function handleMouseLeave() {
    isDown.current = false;
    slider.current.style.cursor = "grab";
  }

  function handleMouseMove(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft = scrollLeft.current - walk;
  }

  function handleMouseUp() {
    isDown.current = false;
    slider.current.style.cursor = "grab";
  }

  return (
    <div className="overflow-hidden cursor-grab" ref={slider}>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

function Card({ song }) {
    const { link, image, title, author } = song;
    
    return (
        <div
          className="min-w-[250px] h-[350px] relative group transition-transform duration-300"
          onClick={() => link && window.open(link, "_blank")}
          style={{ cursor: link ? "pointer" : "default" }}
        >
          {/* Album cover */}
          <div className="w-full h-[70%] rounded-lg overflow-hidden relative">
            <img
              src={image}
              alt={title || 'Album cover'}
              className="w-full h-full object-cover rounded-lg"
              draggable="false"
            />
          </div>
          
          {/* CD/Vinyl with sliding animation */}
          <div className="absolute top-[25%] left-1/2 w-[200px] h-[200px] -translate-x-1/2 transform transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-y-16">
            <img
              src="/img/vinyl.png"
              alt="Vinyl"
              className="w-full h-full object-contain"
              draggable="false"
              style={{
                filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
              }}
            />
          </div>
    
          {/* Title and author */}
          <div className="text-center mt-2">
            <h3 className="font-bold">{title || 'Untitled'}</h3>
            <p className="text-sm text-gray-500">{author || 'Unknown Artist'}</p>
          </div>
        </div>
      );
    };
    