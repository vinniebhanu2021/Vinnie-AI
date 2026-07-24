"use client";
import React, { useEffect, useState } from 'react';

// Global mutable state for extreme performance (no React re-renders required!)
export const mobileInputs = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
};

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only show controls if the device supports touch or screen is very small
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches || ('ontouchstart' in window));
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const btnStyle = {
    width: '60px', height: '60px',
    background: 'rgba(0, 255, 157, 0.15)',
    border: '2px solid rgba(0, 255, 157, 0.5)',
    borderRadius: '15px',
    color: '#00ff9d',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', userSelect: 'none',
    touchAction: 'none', // Critical to prevent scrolling/zooming when dragging on buttons
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 15px rgba(0, 255, 157, 0.2)'
  };

  const handleTouch = (dir, state) => (e) => {
    e.preventDefault();
    mobileInputs[dir] = state;
  };

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1000 }}>
      {/* D-Pad (Bottom Left) */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '1rem', pointerEvents: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div 
            style={btnStyle} 
            onTouchStart={handleTouch('forward', true)} 
            onTouchEnd={handleTouch('forward', false)}
          >W</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={btnStyle} onTouchStart={handleTouch('left', true)} onTouchEnd={handleTouch('left', false)}>A</div>
            <div style={btnStyle} onTouchStart={handleTouch('backward', true)} onTouchEnd={handleTouch('backward', false)}>S</div>
            <div style={btnStyle} onTouchStart={handleTouch('right', true)} onTouchEnd={handleTouch('right', false)}>D</div>
          </div>
        </div>
      </div>

      {/* Jump Button (Bottom Right) */}
      <div style={{ position: 'absolute', bottom: '2rem', right: '1.5rem', pointerEvents: 'auto' }}>
        <div 
          style={{ ...btnStyle, width: '80px', height: '80px', borderRadius: '50%', fontSize: '18px', fontWeight: 'bold' }} 
          onTouchStart={handleTouch('jump', true)} 
          onTouchEnd={handleTouch('jump', false)}
        >
          JUMP
        </div>
      </div>
    </div>
  );
}
