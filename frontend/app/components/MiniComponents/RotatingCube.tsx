"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.5}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function RotatingCubeComponent() {
  return (
    <div className="w-full h-full relative" style={{ touchAction: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <RotatingCube />
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={1} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
