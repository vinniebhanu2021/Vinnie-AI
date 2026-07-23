import React, { Component } from "react";
import Avatar from "../avatar/Avatar.js";
import AboutMenu from "./AboutMenu.js";
import PageWrapper from "../components/PageWrapper.js";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

export default class About extends Component {
  render() {
    return (
      <PageWrapper className="about-page">
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: '900px', gap: '2rem' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar page="about" />
            <AboutMenu />
            <div className="marquee-container" style={{ marginTop: '2rem' }}>
              <div className="marquee" style={{ fontSize: '1.2rem', letterSpacing: '2px', color: 'var(--accent-cyan)' }}>
                BUILD • BREAK • ENCAPSULATE • RUN • REPEAT
              </div>
            </div>
          </div>

          <div style={{ flex: 1, height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 64, 64]}>
                  <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0}
                    metalness={0.8}
                  />
                </Sphere>
              </Float>
            </Canvas>
          </div>

        </div>
      </PageWrapper>
    );
  }
}
