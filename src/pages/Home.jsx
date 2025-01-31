import React, { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import * as THREE from 'three';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shaderEnabled, setShaderEnabled] = useState(true);
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(null);
  const renderer = useRef(null);
  const shaderMaterial = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const animationId = useRef(null);

  // Referencias para las imágenes
  const face1Ref = useRef(null);

  // Shaders
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    void main() {
      vec2 pos = vUv * 2.0 - 1.0;
      float distance = length(pos);
      
      vec2 mouseDelta = u_mouse - vUv;
      float mouseDistance = length(mouseDelta);
      float wave = sin(distance * 10.0 - u_time * 2.0 + mouseDistance * 5.0) * 0.5 + 0.5;
      
      vec3 baseColor = mix(
        vec3(0.988, 0.969, 0.973),  
        vec3(0.141, 0.388, 0.682),
        smoothstep(0.0, 1.0, u_mouse.x)
      );
      
      vec2 distortedUV = vUv + (u_mouse - 0.5) * 0.1 * sin(u_time);
      float pattern = sin(distortedUV.x * 20.0 + u_time) * 
                     cos(distortedUV.y * 20.0 + u_time) * 
                     (1.0 - mouseDistance);
      
      vec3 color = mix(baseColor, vec3(pattern), wave);
      color *= (1.0 - distance * 0.1);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Array de aviones
  const planes = [
    { id: 1, startX: -100, startY: 50, duration: 10, rotation: 360 },
    { id: 2, startX: -200, startY: 200, duration: 8, rotation: -360 },
    { id: 3, startX: -300, startY: 100, duration: 12, rotation: 180 },
  ];

  // Three.js setup
  useEffect(() => {
    if (!shaderEnabled) return;

    // Configurar cámara ortográfica para pantalla completa
    camera.current = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near
      1 // far
    );

    renderer.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.current.domElement);

    // Geometría para pantalla completa
    const geometry = new THREE.PlaneGeometry(2, 2);
    shaderMaterial.current = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
      }
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial.current);
    scene.current.add(mesh);

    // Manejar movimiento del mouse
    const handleMouseMove = (event) => {
      mousePos.current.x = event.clientX / window.innerWidth;
      mousePos.current.y = 1.0 - (event.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animación
    const animate = () => {
      if (shaderEnabled) {
        shaderMaterial.current.uniforms.u_time.value += 0.01;
        shaderMaterial.current.uniforms.u_mouse.value.set(
          mousePos.current.x,
          mousePos.current.y
        );
        renderer.current.render(scene.current, camera.current);
      }
      animationId.current = requestAnimationFrame(animate);
    };
    animate();

    // Manejar resize
    const handleResize = () => {
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.current.domElement) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
      cancelAnimationFrame(animationId.current);
      scene.current.remove(mesh);
      geometry.dispose();
      shaderMaterial.current.dispose();
    };
  }, [shaderEnabled]);

  // Animación de los aviones
  useEffect(() => {
    planes.forEach((plane) => {
      const planeElement = document.getElementById(`plane-${plane.id}`);
      gsap.to(planeElement, {
        x: "100vw",
        y: `+=${Math.random() * 200 - 100}`,
        rotation: plane.rotation,
        duration: plane.duration,
        repeat: -1,
        ease: "none",
      });
    });
  }, [planes]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Botón de toggle */}
      <button
        className="fixed text-2xl absolute top-16 left-4 z-50"
        onClick={() => setShaderEnabled(!shaderEnabled)}
      >
        {shaderEnabled ? "❌" : "🪄"}
      </button>

      {/* Canvas para Three.js */}
      <div 
        ref={mountRef} 
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{ display: shaderEnabled ? 'block' : 'none' }}
      />
      
      {/* Contenido principal */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center z-10">
        <div className="relative group z-10">
          <img
            ref={face1Ref}
            src="/img/face-1.png"
            alt="Mac Miller"
            className="w-65 h-100 object-cover"
            draggable="false"
          />
        </div>
      </div>

      {/* Aviones */}
      {planes.map((plane) => (
        <div
          key={plane.id}
          id={`plane-${plane.id}`}
          className="absolute w-16 h-16 z-20"
          style={{
            backgroundImage: "url('/img/paper-plane.png')",
            backgroundSize: "cover",
            top: `${plane.startY}px`,
            left: `${plane.startX}px`,
          }}
        ></div>
      ))}

      {/* Título */}
      <h1 className="mt-6 text-4xl font-bold hover:line-through z-10">
        <Link
          to="/music"
          className="uppercase hover:line-through block"
          onClick={() => setIsOpen(false)}
        >
          Mac Miller
        </Link>
      </h1>
    </div>
  );
};

export default Home;