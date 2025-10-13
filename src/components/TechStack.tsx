"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = Array.from({ length: 30 }, () => ({
  scale: [0.7, 0.8, 0.9, 1, 1.1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({ scale, material, isActive }: SphereProps) {
  const ref = useRef<RapierRigidBody | null>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (!isActive || !ref.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(ref.current.translation())
      .normalize()
      .multiplyScalar(-60 * delta * scale);
    ref.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={1.2}
      angularDamping={0.4}
      friction={0.25}
      position={[
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(15) - 10,
        THREE.MathUtils.randFloatSpread(15) - 5,
      ]}
      ref={ref}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.25 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.12
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

export default function TechStack() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = document.getElementById("techstack");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const materials = useMemo(
    () =>
      textures.map(
        (texture) =>
          new THREE.MeshPhysicalMaterial({
            map: texture,
            emissive: "#ffffff",
            emissiveMap: texture,
            emissiveIntensity: 0.25,
            metalness: 0.6,
            roughness: 0.35,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
          })
      ),
    []
  );

  return (
    <section
      id="techstack"
      className="relative w-full h-[100vh] bg-[#0b080c] flex flex-col items-center justify-center overflow-hidden"
    >
      <h2 className="absolute top-12 text-4xl md:text-5xl font-semibold text-white tracking-[0.15em] z-10">
        MY TECHSTACK
      </h2>
      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 18], fov: 40, near: 0.1, far: 100 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.1} />
        <spotLight
          position={[20, 20, 25]}
          angle={0.3}
          color="white"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[0, 5, -4]} intensity={1.8} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.6}
          background={false}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#150030" aoRadius={2} intensity={1.1} />
        </EffectComposer>
      </Canvas>
    </section>
  );
}
