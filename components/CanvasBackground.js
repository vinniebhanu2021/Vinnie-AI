"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

const ParticleVortex = ({ count = 4000 }) => {
  const points = useRef();

  // Generate a galaxy/vortex shape
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5 + 0.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2;
      
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = height;
      p[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.1;
      points.current.rotation.z = Math.sin(time * 0.05) * 0.2;
    }
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default function CanvasBackground() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 2, 10]} />
        <ParticleVortex />
      </Canvas>
    </div>
  );
}
