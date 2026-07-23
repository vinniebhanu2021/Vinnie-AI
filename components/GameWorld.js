"use client";
import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Html, Text, Stars, MeshReflectorMaterial, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import Player from "./Player";

const AnimatedScenery = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  const dataCubes = useRef();
  const knot = useRef();

  useFrame((state, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.2;
      ring1.current.rotation.y += delta * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.x -= delta * 0.1;
      ring2.current.rotation.z += delta * 0.4;
    }
    if (dataCubes.current) {
      dataCubes.current.rotation.y += delta * 0.05;
      dataCubes.current.position.y = Math.sin(state.clock.elapsedTime) * 2;
    }
    if (knot.current) {
      knot.current.rotation.x += delta * 0.5;
      knot.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={[0, 20, -50]}>
      <mesh ref={ring1}>
        <torusGeometry args={[30, 0.5, 16, 100]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[25, 1, 16, 100]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
      <mesh ref={dataCubes} position={[0, 0, 0]}>
        <icosahedronGeometry args={[5, 1]} />
        <meshStandardMaterial color="#ff0055" wireframe />
      </mesh>
      
      {/* Mesmerizing Infinite Torus Knot Animation */}
      <Float speed={2} rotationIntensity={2} floatIntensity={5}>
        <mesh ref={knot} position={[0, 15, -20]}>
          <torusKnotGeometry args={[8, 1, 200, 32]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1.5} wireframe />
        </mesh>
      </Float>
    </group>
  );
};

const InteractiveZone = ({ position, color, title, children, playerPositionRef }) => {
  const [isActive, setIsActive] = useState(false);
  const zonePos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(() => {
    if (!playerPositionRef.current) return;
    const dist = playerPositionRef.current.distanceTo(zonePos);
    if (dist < 5 && !isActive) setIsActive(true);
    if (dist >= 5 && isActive) setIsActive(false);
  });

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <cylinderGeometry args={[3, 3, 0.4, 32]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[2.8, 0.1, 16, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 2 : 0.5} />
        </mesh>
      </RigidBody>
      
      <Text position={[0, 3, 0]} fontSize={0.6} color="#ffffff" outlineWidth={0.02} outlineColor="#000">
        {title}
      </Text>

      {isActive && (
        <Html position={[0, 4, 0]} center transform scale={0.3} style={{ width: '400px', pointerEvents: 'auto' }}>
          <div style={{ background: 'rgba(10, 15, 25, 0.85)', padding: '1.5rem', borderRadius: '15px', border: `2px solid ${color}`, color: '#fff', backdropFilter: 'blur(10px)', boxShadow: `0 0 20px ${color}` }}>
            <h2 style={{ color, marginBottom: '1rem', borderBottom: `1px solid ${color}`, paddingBottom: '0.5rem', fontFamily: 'monospace' }}>{title}</h2>
            {children}
          </div>
        </Html>
      )}
    </group>
  );
};

export default function GameWorld() {
  const playerPositionRef = useRef(new THREE.Vector3(0, 0, 0));

  return (
    <>
      {/* Dynamic Background Atmosphere */}
      <fog attach="fog" args={["#1a1a2e", 10, 80]} />
      <Stars radius={150} depth={50} count={3000} factor={6} saturation={1} fade />
      <Sparkles count={2000} scale={100} size={2} speed={0.4} opacity={0.2} color="#00ff9d" />
      
      <AnimatedScenery />
      <Player playerPositionRef={playerPositionRef} />

      {/* The Upgraded Obsidian Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[150, 150]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={0.2}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050508"
            metalness={0.8}
            mirror={1}
          />
        </mesh>
        
        {/* We keep a very subtle grid over the reflection for scale */}
        <gridHelper args={[150, 75, "#00ff9d", "#333333"]} position={[0, 0.01, 0]} material-opacity={0.1} material-transparent />
      </RigidBody>

      {/* ZONE 1: ABOUT (First) */}
      <InteractiveZone position={[0, 0, -15]} color="#00ff9d" title="THE ARCHIVES (ABOUT)" playerPositionRef={playerPositionRef}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          <strong>Hi, I'm Vinnie!</strong><br/><br/>
          I am a passionate AI Engineer and Full Stack Developer with 5+ years of experience building scalable applications, AI integrations, and robust backend architectures. 
          <br/><br/>
          Strong fit for full-stack development, delivering intelligent AI solutions, and crafting beautiful interactive user experiences!
        </p>
      </InteractiveZone>

      {/* ZONE 2: EXPERIENCE */}
      <InteractiveZone position={[-20, 0, -30]} color="#00f0ff" title="TRAINING GROUNDS (EXPERIENCE)" playerPositionRef={playerPositionRef}>
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ color: '#00f0ff', fontSize: '1.2rem' }}>AI Research Assistant (Healthcare Data)</strong>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Bridgewater State University | Jan 2025 - Present</p>
          <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Built automated validation workflows eliminating 70% of manual effort across research data and AI platforms.</p>
        </div>
        <div>
          <strong style={{ color: '#00f0ff', fontSize: '1.2rem' }}>Senior Software Engineer (Billing & Platform)</strong>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Netcracker Technology | Feb 2021 - Dec 2024</p>
          <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Supported production reliability for T-Mobile subscription systems. Improved CI/CD deployment cycle times from 4 hrs to under 2 hrs.</p>
        </div>
      </InteractiveZone>

      {/* ZONE 3: SKILLS */}
      <InteractiveZone position={[20, 0, -30]} color="#ff0055" title="THE ARSENAL (SKILLS)" playerPositionRef={playerPositionRef}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {[
            'Java', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'C', 'C++',
            'HTML5', 'CSS3', 'Bootstrap', 'Vue.js', 'Flutter',
            'Node.js', 'Express', 'GraphQL', '.NET',
            'MySQL', 'PostgreSQL', 'SQLite',
            'GCP', 'Kubernetes', 'NGINX', 'Ansible',
            'Git', 'GitHub Actions', 'Jenkins', 'GitLab', 'Selenium',
            'PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG', 'LLMs', 'OpenAI API'
          ].map(skill => (
            <span key={skill} style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,0,85,0.1)', border: '1px solid #ff0055', borderRadius: '50px', fontSize: '1rem', fontFamily: 'monospace' }}>{skill}</span>
          ))}
        </div>
      </InteractiveZone>

      {/* ZONE 4: PROJECTS */}
      <InteractiveZone position={[-20, 0, -50]} color="#8a2be2" title="THE LABORATORY (PROJECTS)" playerPositionRef={playerPositionRef}>
        <div style={{ marginBottom: '1.2rem' }}>
          <strong style={{ color: '#8a2be2', fontSize: '1.2rem' }}>OvaSense</strong>
          <p style={{ fontSize: '0.95rem', marginTop: '0.3rem' }}>Built a privacy-first women's health application tracking patterns, organizing reports, parsing PDFs/OCR locally, and generating doctor-ready summaries. (React, TypeScript, FastAPI)</p>
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <strong style={{ color: '#8a2be2', fontSize: '1.2rem' }}>ResilientGateway</strong>
          <p style={{ fontSize: '0.95rem', marginTop: '0.3rem' }}>Live reliability dashboard for third-party API behavior tracking latency trends and rate limits. Deployed via Docker/Kubernetes.</p>
        </div>
        <div>
          <strong style={{ color: '#8a2be2', fontSize: '1.2rem' }}>Cancer Diagnosis ML Research</strong>
          <p style={{ fontSize: '0.95rem', marginTop: '0.3rem' }}>Processed 4,000+ genetic mutation datapoints achieving 97% accuracy. Publishing through Springer LNNS.</p>
        </div>
      </InteractiveZone>

      {/* ZONE 5: EDUCATION & AWARDS */}
      <InteractiveZone position={[20, 0, -50]} color="#ffd700" title="TROPHY ROOM (EDUCATION)" playerPositionRef={playerPositionRef}>
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ffd700', fontSize: '1.2rem' }}>MS Computer Science (GPA: 3.92)</strong>
          <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Bridgewater State University, MA | Jan 2025</p>
        </div>
        <div>
          <strong style={{ color: '#ffd700', fontSize: '1.2rem' }}>B.E. Computer Science (GPA: 3.74)</strong>
          <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>CMR Institute of Technology | Jun 2018 - Aug 2021</p>
        </div>
      </InteractiveZone>

      {/* ZONE 6: CONTACT & LINKS (Last) */}
      <InteractiveZone position={[0, 0, -65]} color="#ff8800" title="COMMUNICATIONS (LINKS)" playerPositionRef={playerPositionRef}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <a href="https://github.com/vinniebhanu2021" target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,136,0,0.2)', border: '1px solid #ff8800', borderRadius: '5px', color: '#fff', textDecoration: 'none', fontSize: '1.2rem', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
            📂 GitHub
          </a>
          <a href="https://www.linkedin.com/in/udayajangam/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'rgba(0,119,181,0.2)', border: '1px solid #0077b5', borderRadius: '5px', color: '#fff', textDecoration: 'none', fontSize: '1.2rem', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
            💼 LinkedIn
          </a>
        </div>
      </InteractiveZone>

      {/* Boundary Walls */}
      <RigidBody type="fixed">
        <mesh position={[0, 5, -75]}><boxGeometry args={[150, 10, 1]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        <mesh position={[0, 5, 75]}><boxGeometry args={[150, 10, 1]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        <mesh position={[-75, 5, 0]}><boxGeometry args={[1, 10, 150]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        <mesh position={[75, 5, 0]}><boxGeometry args={[1, 10, 150]} /><meshStandardMaterial transparent opacity={0} /></mesh>
      </RigidBody>
    </>
  );
}
