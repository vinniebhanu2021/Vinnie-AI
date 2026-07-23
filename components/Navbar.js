"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '2rem',
        padding: '1rem 3rem',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-pill)',
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}
    >
      {['About', 'Skills', 'Projects', 'Awards'].map((item, i) => (
        <a 
          key={i} 
          href={`#${item.toLowerCase()}`}
          style={{
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          {item}
        </a>
      ))}
    </motion.nav>
  );
}
