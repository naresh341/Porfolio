"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";

function RubikCube() {
  const groupRef = useRef<THREE.Group>(null!);

  const subCubes = useMemo(() => {
    const cubes: [number, number, number][] = [];
    const offset = 1;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          cubes.push([x * offset, y * offset, z * offset]);
        }
    return cubes;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x += delta * 0.18;
    }
  });

  return (
    // scale reduced: 1 → 0.62 (smaller cube)
    <group ref={groupRef} scale={0.62}>
      {subCubes.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.92, 0.92, 0.92]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={0.9}
            roughness={1}
            reflectivity={0.5}
            clearcoat={0.2}
            clearcoatRoughness={0}
            envMapIntensity={3}
          />
          <lineSegments renderOrder={1}>
            <edgesGeometry
              args={[new THREE.BoxGeometry(0.925, 0.925, 0.925)]}
            />
            <lineBasicMaterial color="#444444" transparent opacity={0.6} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

export default function RotatingCubeComponent() {
  return (
    // height reduced: minHeight 260 → 180
    <div className="w-full h-full" style={{ minHeight: 180 }}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.4;
        }}
      >
        {/* Camera pulled slightly closer: z=7 → z=5.5 so cube fills space */}
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={40} />

        <spotLight
          position={[4, 6, 4]}
          intensity={80}
          angle={0.35}
          penumbra={0.8}
          castShadow
          color="#ffffff"
        />
        <pointLight position={[-5, 2, -4]} intensity={12} color="#ffff" />
        <pointLight position={[0, -4, 2]} intensity={4} color="#ffffff" />
        <ambientLight intensity={0.15} />
        <Environment preset="dawn" />

        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.2}>
          <RubikCube />
        </Float>

        {/* shadow sits closer since cube is smaller */}
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.45}
          scale={5}
          blur={2}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
