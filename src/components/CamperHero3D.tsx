"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Center, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

function Camper() {
  const { scene } = useGLTF("/models/camper.glb");
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const targetY = pointer.x * 0.45 + state.clock.elapsedTime * 0.05;
    const targetX = -pointer.y * 0.1;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 2.4, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 2.4, delta);
  });

  return (
    <group ref={ref} scale={2.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
useGLTF.preload("/models/camper.glb");

export default function CamperHero3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [4.8, 1.5, 6.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.4} groundColor="#0c0c0e" color="#ffffff" />
      <directionalLight position={[6, 9, 5]} intensity={1.7} color="#fff6e8" />
      <directionalLight position={[-7, 4, -5]} intensity={0.6} color="#c7a96b" />
      <Suspense fallback={null}>
        <Camper />
      </Suspense>
      <ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={14} blur={3.2} far={5} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
