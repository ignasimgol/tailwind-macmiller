import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function BasketballScene() {
  const { scene } = useGLTF("/assets/faces.glb");

  return <primitive object={scene} scale={[15, 15, 15]} position={[0, -3, 0]}/>;
}

export default function ThreeCanvas() {
  return (
    <div className="responsive-canvas">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          width: "100%",
          aspectRatio: "1/1",
          margin: "0 auto",
        }}
      >
        {/* Luces y controles dentro del Canvas */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow />
        <pointLight position={[0, 5, 0]} intensity={1.0} color="white" />
        <spotLight position={[2, 5, 3]} angle={0.3} intensity={1.2} castShadow />

        <OrbitControls
          enableDamping
          maxPolarAngle={Math.PI / 1} // Restringe el movimiento hasta 60 grados hacia abajo
          minPolarAngle={Math.PI / 6} // Restringe el movimiento hasta 30 grados hacia arriba
          enableZoom={false}
        />
        <BasketballScene />
      </Canvas>
    </div>
  );
}
