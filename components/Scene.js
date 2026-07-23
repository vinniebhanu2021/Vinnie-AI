"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Scroll, Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// The Neural Data Stream Component
const NeuralStream = ({ count = 5000 }) => {
  const points = useRef();

  // Generate a massive cylindrical data stream
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 10 + 2;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 100; // Very long Z axis for scrolling through
      
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = Math.sin(angle) * radius;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.z = time * 0.05; // Slow rotation of the tunnel
    }
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff9d" // Matrix/Cyber green
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default function Scene() {
  const scroll = useScroll();
  const cameraGroup = useRef();

  useFrame(() => {
    // scroll.offset goes from 0 to 1 over the 7 pages.
    // We move the camera group forward through the Neural Stream
    const offset = scroll.offset;
    cameraGroup.current.position.z = -(offset * 50); // Move deep into the negative Z space
  });

  return (
    <>
      <Environment preset="night" />
      <fog attach="fog" args={["#020202", 5, 20]} />
      <ambientLight intensity={0.5} />

      {/* 3D Neural Stream Environment */}
      <NeuralStream count={10000} />

      {/* The Camera Group that moves forward */}
      <group ref={cameraGroup}>
        {/* We can place floating data cubes or nodes relative to the camera if we want, 
            but the primary visual is flying through the NeuralStream tunnel */}
      </group>

      {/* HTML OVERLAYS - 7 Pages */}
      <Scroll html style={{ width: '100%', height: '100%' }}>
        
        {/* PAGE 1: Hero (Input Layer) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10vw' }}>
          <h1 style={{ fontSize: '6vw', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', color: '#fff', textShadow: '0 0 30px #00ff9d' }}>
            Jangam Udaya<br/>Bhanu
          </h1>
          <h2 style={{ fontSize: '2.5vw', marginTop: '1rem', color: '#00ff9d', fontFamily: 'monospace' }}>
            &gt; AI ENGINEER & DEVELOPER_
          </h2>
          <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>[ Initiate Scroll Sequence ] ↓</p>
        </div>

        {/* PAGE 2: About (Hidden Layer 1) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '10vw' }}>
          <div style={{ padding: '3rem', width: '45vw', background: 'rgba(0,20,10,0.6)', borderLeft: '4px solid #00ff9d', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff', fontFamily: 'monospace' }}>// SYSTEM.ABOUT</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
              Hi, Amigos! I'm Udaya, a full stack developer in the deep quest for developing impactful solutions. 
              Perhaps not a master of all, but definitely a jack of all trades, as people have caught me dancing, singing, cycling, crafting, and baking delicious cakes effortlessly out of the blue.
              <br/><br/>
              By the way, thanks for stopping by!!
            </p>
          </div>
        </div>

        {/* PAGE 3: Education (Hidden Layer 2) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10vw' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #00f0ff', fontFamily: 'monospace' }}>// EDUCATION.LOG</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '50vw' }}>
            <div style={{ padding: '2rem', background: 'rgba(0,10,20,0.6)', borderLeft: '4px solid #00f0ff' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#00f0ff' }}>Bachelors Degree CSE</h3>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.5rem' }}>CMR Institute Of Technology (July 2017 – 2021)</p>
              <p style={{ color: '#00ff9d', marginTop: '0.5rem', fontFamily: 'monospace' }}>CGPA: 9.11</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(0,10,20,0.6)', borderLeft: '4px solid #00f0ff' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#00f0ff' }}>Higher Secondary MPC</h3>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.5rem' }}>SRI GAYATRI JUNIOR COLLEGE (2015 - 2017)</p>
              <p style={{ color: '#00ff9d', marginTop: '0.5rem', fontFamily: 'monospace' }}>CGPA: 9.7</p>
            </div>
          </div>
        </div>

        {/* PAGE 4: Experience (Hidden Layer 3) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '10vw' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #ff0055', fontFamily: 'monospace' }}>// EXPERIENCE.LOG</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '50vw' }}>
            <div style={{ padding: '2rem', background: 'rgba(20,0,10,0.6)', borderRight: '4px solid #ff0055' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#ff0055' }}>SOFTWARE ENGINEER (2022 - PRESENT)</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>Hands on experience on REST WEB SERVICES, SPRINGBOOT, KAFKA, SPRING SECURITY, MAVEN.</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(20,0,10,0.6)', borderRight: '4px solid #ff0055' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#ff0055' }}>JUNIOR SOFTWARE ENGINEER (OCT 2022)</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>As an RB Custom developer, I crafted and enhanced reports and modules, resolved merge conflicts, and created automated SQL scripts to improve efficiency and accuracy.</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(20,0,10,0.6)', borderRight: '4px solid #ff0055' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#ff0055' }}>NETCRACKER INTERNSHIP TRAINEE (2021)</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>Strong understanding of Telco business processes, subscription management, and order management and hands-on experience on perl and unix.</p>
            </div>
          </div>
        </div>

        {/* PAGE 5: Skills (Hidden Layer 4) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10vw' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #00ff9d', fontFamily: 'monospace' }}>// NEURAL_WEIGHTS (SKILLS)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '50vw' }}>
            {['PYTHON', 'JAVA', 'REACT JS', 'NODE.JS', 'MONGODB', 'SQL', 'PERL', 'HTML', 'CSS', 'JAVASCRIPT', 'GIT', 'TAILWIND CSS'].map(skill => (
              <div key={skill} style={{ padding: '1rem 2rem', background: 'rgba(0,20,10,0.4)', border: '1px solid #00ff9d', color: '#00ff9d', fontFamily: 'monospace', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(0,255,157,0.2)' }}>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 6: Projects (Hidden Layer 5) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '10vw' }}>
           <h2 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #8a2be2', fontFamily: 'monospace' }}>// DEPLOYED_MODELS (PROJECTS)</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '50vw' }}>
              <div style={{ padding: '2rem', background: 'rgba(10,0,20,0.6)', borderLeft: '4px solid #8a2be2' }}>
                <h3 style={{ color: '#8a2be2', fontSize: '1.8rem' }}>RAG_LLAMA_INTEGRATION_APP</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>RAG (Retrieval Augmented Generation) enhances Large Language Models (LLMs) by providing real-time access to external, up-to-date information, improving their accuracy and factual grounding.</p>
              </div>
              <div style={{ padding: '2rem', background: 'rgba(10,0,20,0.6)', borderLeft: '4px solid #8a2be2' }}>
                <h3 style={{ color: '#8a2be2', fontSize: '1.8rem' }}>Hospital Inventory Management System</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>Database Management, Easy tracking of details regarding Ventilators by their status.</p>
              </div>
              <div style={{ padding: '2rem', background: 'rgba(10,0,20,0.6)', borderLeft: '4px solid #8a2be2' }}>
                <h3 style={{ color: '#8a2be2', fontSize: '1.8rem' }}>School Website</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>This School website gives information of classes and allows students to switch between telugu and english medium and also provided with chat section.</p>
              </div>
           </div>
        </div>

        {/* PAGE 7: Awards (Output Layer) */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10vw' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #ffd700', fontFamily: 'monospace' }}>// RECOGNITION (AWARDS)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '50vw' }}>
            <div style={{ padding: '2rem', background: 'rgba(20,20,0,0.6)', borderRight: '4px solid #ffd700' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#ffd700' }}>Above and Beyond (May 2024 & Aug 2023)</h3>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.5rem' }}>Awarded for exceptional high-level coding on complex and intriguing modules, completed well ahead of schedule.</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(20,20,0,0.6)', borderRight: '4px solid #ffd700' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#ffd700' }}>MERIT SCHOLARSHIP AWARD (2015)</h3>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.5rem' }}>Recognized for achieving a perfect score of 10/10 in my academic pursuits.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '5rem' }}>
            <button style={{ padding: '1rem 4rem', fontSize: '1.5rem', background: 'transparent', color: '#00ff9d', cursor: 'pointer', border: '2px solid #00ff9d', fontFamily: 'monospace' }}>
              &gt; INITIATE_CONTACT
            </button>
          </div>
        </div>

      </Scroll>
    </>
  );
}
