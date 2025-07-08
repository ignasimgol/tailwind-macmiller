import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const music = [
  { title: "Balloonerism", author: "2025", image: "/img/balloonerism.jpg", link: "/music/good" },  
  { title: "Circles", author: "2020", image: "/img/circles.jpeg", link: "/under-construction" },
  { title: "Swimming", author: "2018", image: "/img/swimming.jpeg", link: "/music/swimming" },
  { title: "The Divine Fem", author: "2016", image: "/img/the-divine-femenine.jpeg", link: "/under-construction" },
  { title: "GO:OD AM", author: "2015", image: "/img/good-am.jpeg", link: "/music/good" },
  { title: "Faces", author: "2014", image: "/img/faces.jpeg", link: "/music/faces" },
  { title: "Delusional Thomas", author: "2013", image: "/img/delusional-thomas.jpg", link: "/faces" },
  { title: "Live From Space", author: "2013", image: "/img/from-space.jpeg" },
  { title: "Macadelic", author: "2012", image: "/img/macadelic.jpeg" },
  { title: "Blue Slide Park", author: "2011", image: "/img/blue-slide-park.jpeg", link: "/song-2" },
  { title: "Best Day Ever", author: "2011", image: "/img/best-day-ever.png", link: "/under-construction" },
  { title: "K.I.D.S", author: "2010", image: "/img/kids.jpg", link: "/under-construction" },
];

export default function Music() {
  return (
  <div className="relative h-screen p-5">
    {/* Colocamos el botón de retroceso en la parte superior izquierda */}
    <div className="absolute top-12 left-4 z-10">
      <BackButton />
    </div>
    <div className="px-5 py-10 mt-50">
      <CustomCarousel>
        {music.map((song, index) => {
          return <Card key={index} song={song} />;
        })}
      </CustomCarousel>
    </div>
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
      const targetScrollLeft = sliderRef.scrollLeft + e.deltaY * 1;
    
      const animateScroll = () => {
        if (Math.abs(sliderRef.scrollLeft - targetScrollLeft) > 1) {
          sliderRef.scrollLeft += (targetScrollLeft - sliderRef.scrollLeft) * 0.1;
          requestAnimationFrame(animateScroll);
        }
      };
    
      animateScroll();
    };

    sliderRef.addEventListener("wheel", handleWheel, { passive: false });

    sliderRef.addEventListener("touchstart", handleMouseDown);
    sliderRef.addEventListener("touchend", handleMouseUp);
    sliderRef.addEventListener("touchmove", handleMouseMove);

    return () => {
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
    <div className="overflow-hidden cursor-grab smooth-scroll" ref={slider}>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

function Card({ song }) {
  const { link, image, title, author } = song;
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link); // Usar navigate en lugar de window.location.href
    }
  };
  return (
    <div className="justify-end">
      <div
        className="min-w-[250px] h-[350px] relative group transition-transform duration-300"
        onClick={handleClick}
        style={{ cursor: link ? "pointer" : "default" }}
      >
        {/* Album cover */}
        <div className="w-full h-[70%] overflow-hidden relative mt-12">
          <img
            src={image}
            alt={title || 'Album cover'}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>

        {/* CD/Vinyl with sliding animation */}
        <div className="absolute top-[5%] left-1/2 w-[200px] h-[200px] -translate-x-1/2 transform transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-y-16 -z-10">
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
          <p className="text-sm">{author || 'Unknown Artist'}</p>
        </div>
      </div>
    </div>
  );
}