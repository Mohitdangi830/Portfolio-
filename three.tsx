import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Core icosahedron — reacts to mouse + time */
function Core({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.08;
      // subtle mouse parallax
      mesh.current.rotation.x += (mouse.current.y * 0.35 - mesh.current.rotation.x * 0.12) * delta * 2;
      mesh.current.rotation.y += (mouse.current.x * 0.5) * delta * 0.4;
      const s = 1 + Math.sin(t * 1.4) * 0.03;
      mesh.current.scale.setScalar(s);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.12;
      wire.current.rotation.z += delta * 0.05;
    }
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.3;
      ring1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.2;
      ring2.current.rotation.x = Math.PI / 1.8 + Math.cos(t * 0.4) * 0.12;
    }
  });

  return (
    <group>
      {/* inner glowing core */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#0b1030"
          emissive="#1d4ed8"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.25}
          flatShading
        />
      </mesh>
      {/* wireframe shell */}
      <mesh ref={wire} scale={1.45}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
      </mesh>
      {/* outer faint shell */}
      <mesh scale={1.9}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} />
      </mesh>
      {/* orbit rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.3, 0.015, 8, 90]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.75} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.7, 0.012, 8, 90]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      {/* satellite dots on rings */}
      <mesh position={[2.3, 0, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#67e8f9" />
      </mesh>
    </group>
  );
}

/* Orbiting particles */
function OrbitParticles({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#7dd3fc" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene({ scrollRef, mouse }: { scrollRef: React.MutableRefObject<number>; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (group.current) {
      // scroll parallax: drift + rotate slightly
      group.current.position.y = scrollRef.current * 1.4;
      group.current.rotation.y = scrollRef.current * 1.2;
    }
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={60} color="#22d3ee" />
      <pointLight position={[-6, -3, 4]} intensity={50} color="#8b5cf6" />
      <pointLight position={[0, 0, 6]} intensity={20} color="#ffffff" />
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.7}>
        <Core mouse={mouse} />
      </Float>
      <OrbitParticles count={90} />
      <Sparkles count={46} scale={[7, 7, 7]} size={2.4} speed={0.35} color="#67e8f9" opacity={0.55} />
    </group>
  );
}

export function AICoreCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    // Static CSS fallback gradient orb for reduced motion
    return (
      <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
        <div className="relative h-64 w-64 md:h-96 md:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-600/30 to-violet-600/40 blur-2xl" />
          <div className="absolute inset-8 rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 to-violet-500/10" />
          <div className="absolute inset-16 rounded-full border border-violet-400/30 bg-[#0b1030]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full w-full"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene scrollRef={scrollRef} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
