"use client";
import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function Preloader() {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);

  // Smooth fade out when loading finishes
  useEffect(() => {
    if (!active) {
      setTimeout(() => setShow(false), 500); // 500ms fade delay
    }
  }, [active]);

  if (!show) return null;

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
      background: '#1a1a2e', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', zIndex: 999999,
      perspective: '1000px', overflow: 'hidden',
      opacity: active ? 1 : 0, transition: 'opacity 0.5s ease-out'
    }}>
      <style>{`
        @keyframes spin1 { 0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); } 100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); } }
        @keyframes spin2 { 0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); } 100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); } }
        @keyframes spin3 { 0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); } 100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; text-shadow: 0 0 20px #00ff9d; } }
      `}</style>

      <div style={{ position: 'relative', width: '120px', height: '120px', transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#00ff9d', borderRightColor: '#00ff9d', boxShadow: '0 0 20px rgba(0, 255, 157, 0.5)', animation: 'spin1 2s linear infinite' }}></div>
        <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#00f0ff', borderLeftColor: '#00f0ff', boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)', animation: 'spin2 2.5s linear infinite' }}></div>
        <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '3px solid transparent', borderBottomColor: '#ff00ff', borderRightColor: '#ff00ff', boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)', animation: 'spin3 3s linear infinite' }}></div>
      </div>
      
      <h3 style={{ marginTop: '3rem', fontFamily: 'monospace', color: '#fff', letterSpacing: '4px', animation: 'pulse 1.5s ease-in-out infinite' }}>
        INITIALIZING SYSTEM... {Math.round(progress)}%
      </h3>
    </div>
  );
}
