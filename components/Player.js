"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

const SPEED = 7;
const JUMP_FORCE = 8;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Player({ playerPositionRef }) {
  const bodyRef = useRef();
  const avatarGroupRef = useRef();
  const hairRef = useRef();
  const [, get] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!bodyRef.current || !avatarGroupRef.current) return;

    const { forward, backward, left, right, jump } = get();
    
    // Get current velocity and position
    const velocity = bodyRef.current.linvel();
    const position = bodyRef.current.translation();
    
    // Update external ref
    if (playerPositionRef) {
      playerPositionRef.current.copy(position);
    }

    // Camera follow
    const cameraPosition = new THREE.Vector3(position.x, position.y + 4, position.z + 8);
    state.camera.position.lerp(cameraPosition, 0.1);
    state.camera.lookAt(position.x, position.y + 2, position.z);

    // Movement Physics
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
    bodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

    // Character Leaning Animation
    const targetRotX = direction.z * 0.05;
    const targetRotZ = -direction.x * 0.05;
    avatarGroupRef.current.rotation.x = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.x, targetRotX, 0.15);
    avatarGroupRef.current.rotation.z = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.z, targetRotZ, 0.15);

    // Dynamic Flowing Hair Physics
    if (hairRef.current) {
      const hairRotX = 0.2 + (direction.z * 0.1) + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      hairRef.current.rotation.x = THREE.MathUtils.lerp(hairRef.current.rotation.x, hairRotX, 0.2);
    }

    // Hover Bobbing
    avatarGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1 - 0.7;

    // Jump
    if (jump && Math.abs(velocity.y) < 0.1) {
      bodyRef.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
    }
  });

  return (
    <RigidBody ref={bodyRef} colliders={false} mass={1} type="dynamic" position={[0, 2, 0]} lockRotations>
      <CapsuleCollider args={[0.8, 0.4]} position={[0, 0.1, 0]} />
      
      {/* 
        High-End Abstract Procedural Female Character.
        This completely bypasses the network block and instantly fixes the 404 error.
      */}
      <group ref={avatarGroupRef} position={[0, -0.7, 0]}>
        
        {/* Flowing Dress / Skirt */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <coneGeometry args={[0.35, 0.9, 32, 1, true]} />
          <meshStandardMaterial color="#ff00ff" side={THREE.DoubleSide} transparent opacity={0.85} metalness={0.4} roughness={0.2} />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.18, 0.35, 32]} />
          <meshStandardMaterial color="#222233" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#fcd9c8" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Glowing Visor */}
        <mesh position={[0, 1.35, 0.12]}>
          <boxGeometry args={[0.2, 0.06, 0.08]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
        </mesh>

        {/* Flowing Hair */}
        <mesh ref={hairRef} position={[0, 1.4, -0.1]} rotation={[0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.6, 32]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.6} metalness={0.1} />
        </mesh>
        
        {/* Slender Arms */}
        <mesh position={[-0.2, 0.95, 0]} rotation={[0, 0, 0.2]} castShadow>
          <capsuleGeometry args={[0.03, 0.35, 16]} />
          <meshStandardMaterial color="#fcd9c8" />
        </mesh>
        <mesh position={[0.2, 0.95, 0]} rotation={[0, 0, -0.2]} castShadow>
          <capsuleGeometry args={[0.03, 0.35, 16]} />
          <meshStandardMaterial color="#fcd9c8" />
        </mesh>

        {/* Hover Board */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Neon Thrust Ring */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[0.35, 0.02, 16, 64]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={4} />
        </mesh>

      </group>
    </RigidBody>
  );
}
