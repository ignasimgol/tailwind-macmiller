import React, { useRef } from "react";
import { gsap } from "gsap";

const Home = () => {
  // Referencias para las imágenes
  const face1Ref = useRef(null);
  const face2Ref = useRef(null);

  // Array de aviones con configuraciones iniciales
  const planes = [
    { id: 1, startX: -100, startY: 50, duration: 10, rotation: 360 },
    { id: 2, startX: -200, startY: 200, duration: 8, rotation: -360 },
    { id: 3, startX: -300, startY: 100, duration: 12, rotation: 180 },
  ];

  // Animación para cada avión
  React.useEffect(() => {
    planes.forEach((plane) => {
      const planeElement = document.getElementById(`plane-${plane.id}`);
      gsap.to(planeElement, {
        x: "100vw", // Mueve el avión de izquierda a derecha
        y: `+=${Math.random() * 200 - 100}`, // Movimiento aleatorio en el eje Y
        rotation: plane.rotation, // Gira el avión
        duration: plane.duration, // Duración de la animación
        repeat: -1, // Repetir infinitamente
        ease: "none", // Movimiento lineal
      });
    });
  }, [planes]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Container for all images */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Main central image group */}
        <div className="relative group z-10">
          {/* Primera imagen */}
          <img
            ref={face1Ref}
            src="/img/face-1.png"
            alt="Mac Miller"
            className="w-65 h-100 object-cover group-hover:opacity-0 transition-opacity duration-300"
          />
          {/* Segunda imagen */}
          <img
            ref={face2Ref}
            src="/img/face-2.png"
            alt="Mac Miller Hover"
            className="w-130 h-100 object-cover rounded-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Renderizar múltiples aviones */}
      {planes.map((plane) => (
        <div
          key={plane.id}
          id={`plane-${plane.id}`}
          className="absolute w-16 h-16 z-20"
          style={{
            backgroundImage: "url('/img/paper-plane.png')", // Ruta de la imagen del avión
            backgroundSize: "cover",
            top: `${plane.startY}px`, // Posición inicial en Y
            left: `${plane.startX}px`, // Posición inicial en X
          }}
        ></div>
      ))}

      {/* Title */}
      <h1 className="mt-6 text-4xl font-bold hover:hover:line-through"><a href="/music">MAC MILLER</a></h1>
    </div>
  );
};

export default Home;