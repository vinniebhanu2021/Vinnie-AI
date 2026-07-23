"use client";
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import GameWorld from "../components/GameWorld";
import ErrorBoundary from "../components/ErrorBoundary";
import Preloader from "../components/Preloader";

export default function Home() {
  const keyboardMap = useMemo(() => [
    { name: "forward", keys: ["ArrowUp", "w", "W"] },
    { name: "backward", keys: ["ArrowDown", "s", "S"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
    { name: "jump", keys: ["Space"] },
  ], []);

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#1a1a2e', overflow: 'hidden' }}>
      <ErrorBoundary>
        <KeyboardControls map={keyboardMap}>
          <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <color attach="background" args={["#1a1a2e"]} />
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} />
            
            <Suspense fallback={<Preloader />}>
              <Physics gravity={[0, -9.81, 0]}>
                <GameWorld />
              </Physics>
            </Suspense>

          </Canvas>
        </KeyboardControls>
      </ErrorBoundary>
      
      {/* Universal UI Overlay */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', pointerEvents: 'none', fontFamily: 'monospace', zIndex: 100 }}>
        <h1 style={{ fontSize: '2.5rem', color: '#00ff9d', textShadow: '0 0 10px #00ff9d', margin: 0 }}>Hi, I'm Vinnie</h1>
        <h2 style={{ fontSize: '1.2rem', margin: '0.2rem 0 0 0', color: 'rgba(255,255,255,0.8)' }}>Jangam Udaya Bhanu</h2>
        <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#ff00ff' }}>AI Engineer & Full Stack Developer</p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '10px', border: '1px solid #fff' }}>
          <p>🎮 <b>CONTROLS</b></p>
          <p>WASD - Move</p>
          <p>SPACE - Jump</p>
          <p style={{ marginTop: '0.5rem', color: '#ffd700' }}>Explore the colored zones to view portfolio data!</p>
        </div>
      </div>
    </main>
  );
}
