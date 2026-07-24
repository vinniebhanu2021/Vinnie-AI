"use client";
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import GameWorld from "../components/GameWorld";
import ErrorBoundary from "../components/ErrorBoundary";
import MobileControls from "../components/MobileControls";

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
      
      <style>{`
        .responsive-title { font-size: 2.5rem; }
        .responsive-subtitle { font-size: 1rem; }
        .controls-box { display: block; }
        @media (max-width: 768px) {
          .responsive-title { font-size: 1.5rem !important; }
          .responsive-subtitle { font-size: 0.8rem !important; }
          .controls-box { display: none !important; }
        }
      `}</style>

      <MobileControls />
      
      <ErrorBoundary>
        <KeyboardControls map={keyboardMap}>
          <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <color attach="background" args={["#1a1a2e"]} />
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} />
            
            <Suspense fallback={null}>
              <Physics gravity={[0, -9.81, 0]}>
                <GameWorld />
              </Physics>
            </Suspense>

          </Canvas>
        </KeyboardControls>
      </ErrorBoundary>
      
      {/* Universal UI Overlay */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', pointerEvents: 'none', fontFamily: 'monospace', zIndex: 100 }}>
        <h1 className="responsive-title" style={{ color: '#00ff9d', textShadow: '0 0 10px #00ff9d', margin: 0 }}>Hi, I'm Vinnie</h1>
        <p className="responsive-subtitle" style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>Jangam Udaya Bhanu</p>
        <p className="responsive-subtitle" style={{ margin: '0.2rem 0', color: '#ff00ff', fontWeight: 'bold' }}>AI Engineer & Full Stack Developer</p>
        
        <div className="controls-box" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(20,20,30,0.8)', border: '1px solid #fff', borderRadius: '8px', display: 'inline-block' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎮</span> CONTROLS
          </h3>
          <p style={{ margin: '0.2rem 0', fontSize: '0.8rem' }}>WASD - Move</p>
          <p style={{ margin: '0.2rem 0', fontSize: '0.8rem' }}>SPACE - Jump</p>
          <p style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', color: '#ffcc00' }}>Explore the colored zones to view portfolio data!</p>
        </div>
      </div>
    </main>
  );
}
