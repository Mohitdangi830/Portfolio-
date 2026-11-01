import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { ChevronUp, ChevronDown, RefreshCw } from "lucide-react";
import { profile } from "../data/portfolio";

// Pre-allocated math objects for zero-GC performance
const _coreTargetRot = new THREE.Vector2(0, 0);

/* ── Central MD Hologram Emblem (suspended in core) ─────────────────── */
function HologramEmblem({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, [textureUrl]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Front face with user's MD monogram */}
      <mesh ref={meshRef}>
        <circleGeometry args={[0.75, 48]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.92}
          roughness={0.25}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glowing neon halo around emblem */}
      <mesh>
        <ringGeometry args={[0.76, 0.82, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Core 3D Object — reacts to mouse + time + user drag ─────────────── */
function Core({
  mouse,
  mode,
  dragRotation,
  isDragging,
  speedMultiplier,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  mode: "hologram" | "shield" | "matrix";
  dragRotation: { x: number; y: number };
  isDragging: boolean;
  speedMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  const pfpSrc = profile.profilePhoto || "/images/profile.png";

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const effDelta = delta * speedMultiplier;

    if (groupRef.current) {
      if (isDragging) {
        _coreTargetRot.x = dragRotation.y * 2.2;
        _coreTargetRot.y = dragRotation.x * 2.2;
      } else {
        // Natural mouse tracking
        _coreTargetRot.x = mouse.current.y * 0.35;
        _coreTargetRot.y = mouse.current.x * 0.45;
      }

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        _coreTargetRot.x,
        5,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        _coreTargetRot.y + t * 0.15 * speedMultiplier,
        4,
        delta
      );
    }

    if (mesh.current) {
      mesh.current.rotation.y += effDelta * 0.25;
      mesh.current.rotation.x += effDelta * 0.08;
      const s = 1 + Math.sin(t * 1.5) * 0.035;
      mesh.current.scale.setScalar(s);
    }
    if (wire.current) {
      wire.current.rotation.y -= effDelta * 0.14;
      wire.current.rotation.z += effDelta * 0.06;
    }
    if (ring1.current) {
      ring1.current.rotation.z += effDelta * 0.35;
      ring1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= effDelta * 0.25;
      ring2.current.rotation.x = Math.PI / 1.8 + Math.cos(t * 0.4) * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.y += effDelta * 0.3;
      ring3.current.rotation.z = Math.PI / 3 + Math.sin(t * 0.35) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Floating Monogram Emblem in core */}
      <HologramEmblem textureUrl={pfpSrc} />

      {/* Mode 1 & 2: Inner glowing icosahedron core */}
      {mode !== "matrix" && (
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.18, 1]} />
          <meshStandardMaterial
            color="#070a24"
            emissive={mode === "shield" ? "#3b82f6" : "#1d4ed8"}
            emissiveIntensity={0.65}
            metalness={0.92}
            roughness={0.2}
            flatShading
            transparent
            opacity={0.88}
          />
        </mesh>
      )}

      {/* Wireframe shell */}
      <mesh ref={wire} scale={mode === "matrix" ? 1.6 : 1.48}>
        <icosahedronGeometry args={[1.15, mode === "matrix" ? 2 : 1]} />
        <meshBasicMaterial
          color={mode === "matrix" ? "#38bdf8" : "#22d3ee"}
          wireframe
          transparent
          opacity={mode === "matrix" ? 0.65 : 0.35}
        />
      </mesh>

      {/* Outer faint shell */}
      <mesh scale={1.92}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Orbit ring 1 (Cyan) */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.35, 0.016, 8, 90]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.78} />
      </mesh>

      {/* Orbit ring 2 (Violet) */}
      <mesh ref={ring2}>
        <torusGeometry args={[2.75, 0.014, 8, 90]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>

      {/* Orbit ring 3 (Outer Blue) */}
      <mesh ref={ring3}>
        <torusGeometry args={[3.05, 0.01, 8, 90]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Satellite beacons on rings */}
      <mesh position={[2.35, 0, 0]}>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial color="#67e8f9" />
      </mesh>
      <mesh position={[-2.75, 0, 0]}>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.04, 14, 14]} />
        <meshBasicMaterial color="#93c5fd" />
      </mesh>
    </group>
  );
}

/* ── Orbiting particles ────────────────────────────────────────────── */
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
      <pointsMaterial
        size={0.035}
        color="#7dd3fc"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── 3D Scene Assembly ─────────────────────────────────────────────── */
function Scene({
  scrollRef,
  mouse,
  mode,
  dragRotation,
  isDragging,
  speedMultiplier,
}: {
  scrollRef: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  mode: "hologram" | "shield" | "matrix";
  dragRotation: { x: number; y: number };
  isDragging: boolean;
  speedMultiplier: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      // scroll parallax: subtle lift
      group.current.position.y = scrollRef.current * 1.2;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      {/* Multi-point studio lighting */}
      <pointLight position={[6, 4, 6]} intensity={55} color="#22d3ee" />
      <pointLight position={[-6, -3, 4]} intensity={45} color="#8b5cf6" />
      <pointLight position={[0, 5, 4]} intensity={25} color="#e0f2fe" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <Core
          mouse={mouse}
          mode={mode}
          dragRotation={dragRotation}
          isDragging={isDragging}
          speedMultiplier={speedMultiplier}
        />
      </Float>

      <OrbitParticles count={mode === "matrix" ? 140 : 85} />
      <Sparkles count={mode === "matrix" ? 60 : 42} scale={[7, 7, 7]} size={2.5} speed={0.35} color="#67e8f9" opacity={0.55} />
    </group>
  );
}

/* ── Exported Hero 3D Working Canvas with Collapsible Bottom Dock ───── */
export function AICoreCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 3D Working Mode State
  const [mode, setMode] = useState<"hologram" | "shield" | "matrix">("hologram");
  const [speed, setSpeed] = useState<number>(1);
  const [dockOpen, setDockOpen] = useState(true);

  // Interactive Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, baseRotX: 0, baseRotY: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      baseRotX: dragRotation.x,
      baseRotY: dragRotation.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;

    if (isDragging) {
      const dx = (e.clientX - dragStart.current.x) * 0.01;
      const dy = (e.clientY - dragStart.current.y) * 0.01;
      setDragRotation({
        x: dragStart.current.baseRotX + dx,
        y: dragStart.current.baseRotY + dy,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const reset3D = () => {
    setDragRotation({ x: 0, y: 0 });
    mouse.current = { x: 0, y: 0 };
    setSpeed(1);
    setMode("hologram");
  };

  if (reduceMotion) {
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
    <div className="relative h-full w-full select-none">
      {/* ── 3D Viewport ── */}
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene
              scrollRef={scrollRef}
              mouse={mouse}
              mode={mode}
              dragRotation={dragRotation}
              isDragging={isDragging}
              speedMultiplier={speed}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Collapsible Unified Bottom Control Dock (Three.js Skill Directive) ── */}
      <div className="pointer-events-auto absolute bottom-2 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setDockOpen(!dockOpen)}
          className="mb-1.5 flex items-center gap-1 rounded-full border border-cyan-400/30 bg-[#030014]/90 px-3 py-1 font-mono2 text-[10px] tracking-wider text-cyan-300 shadow-lg backdrop-blur-md transition-colors hover:bg-cyan-500/20"
          title={dockOpen ? "Collapse 3D Controls" : "Expand 3D Controls"}
        >
          {dockOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
          <span>{dockOpen ? "Hide 3D Dock" : "3D Engine Controls"}</span>
        </button>

        {/* Horizontal Dock */}
        {dockOpen && (
          <div className="flex max-w-[94vw] flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-[#070a22]/90 p-2 shadow-2xl backdrop-blur-xl">
            {/* 3D Modes */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
              <button
                onClick={() => setMode("hologram")}
                className={`rounded-lg px-2.5 py-1 font-mono2 text-[10px] tracking-wider uppercase transition-colors ${
                  mode === "hologram"
                    ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/50"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Hologram
              </button>
              <button
                onClick={() => setMode("shield")}
                className={`rounded-lg px-2.5 py-1 font-mono2 text-[10px] tracking-wider uppercase transition-colors ${
                  mode === "shield"
                    ? "bg-blue-500/25 text-blue-300 border border-blue-400/50"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Shield
              </button>
              <button
                onClick={() => setMode("matrix")}
                className={`rounded-lg px-2.5 py-1 font-mono2 text-[10px] tracking-wider uppercase transition-colors ${
                  mode === "matrix"
                    ? "bg-violet-500/25 text-violet-300 border border-violet-400/50"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Matrix
              </button>
            </div>

            {/* Speed multipliers */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
              <button
                onClick={() => setSpeed(0.5)}
                className={`rounded-lg px-2 py-1 font-mono2 text-[10px] tracking-wider transition-colors ${
                  speed === 0.5 ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white"
                }`}
              >
                0.5x
              </button>
              <button
                onClick={() => setSpeed(1)}
                className={`rounded-lg px-2 py-1 font-mono2 text-[10px] tracking-wider transition-colors ${
                  speed === 1 ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white"
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeed(2)}
                className={`rounded-lg px-2 py-1 font-mono2 text-[10px] tracking-wider transition-colors ${
                  speed === 2 ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white"
                }`}
              >
                2x
              </button>
            </div>

            {/* Reset Camera Button */}
            <button
              onClick={reset3D}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono2 text-[10px] tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              title="Reset 3D Orientation"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
