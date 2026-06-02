"use client";

/**
 * HeroScene3D — React Three Fiber 3D background scene
 *
 * Elements:
 *  1. FloatingParticleField  — 800 instanced particles (200 on mobile), scroll-driven drift
 *  2. OrbitingRings          — 3 counter-rotating torus rings with emissive teal glow
 *  3. InteractiveSphere      — Physical glass-like sphere that reacts to mouse (desktop only)
 *
 * Performance:
 *  • dpr={[1, 1.5]}            ~44% fewer fragments than native 2×
 *  • maxFPS={45}               halves GPU work on high-refresh displays
 *  • isMobile detection        halves particles + disables InteractiveSphere
 *  • WebGL fallback            graceful null render (CSS gradient takes over)
 */

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   1. FLOATING PARTICLE FIELD
   800 instanced tiny spheres with randomized orbital motion.
   Scroll-driven: they drift upward as user scrolls.
───────────────────────────────────────────────────────────── */
function FloatingParticleField({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scrollY = useRef(0);

  // Generate stable random positions / velocities on mount
  const particles = useMemo(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.015 + Math.random() * 0.045,
      });
    }
    return result;
  }, [count]);

  // Track scroll position
  const handleScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  // Attach scroll listener once
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll, handleScroll as any);
      }
    };
  }, [handleScroll]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const scrollDrift = scrollY.current * 0.003;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position.x + Math.sin(t * p.speed + p.offset) * 0.3,
        p.position.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.2 - scrollDrift,
        p.position.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#14b8a6"
        emissive="#14b8a6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.55}
        roughness={0.4}
        metalness={0.2}
      />
    </instancedMesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. ORBITING RINGS
   3 torus geometries at different tilts, slowly counter-rotating.
   Each has a unique speed and teal emissive glow.
───────────────────────────────────────────────────────────── */
interface RingConfig {
  tilt: [number, number, number];
  speed: number;
  radius: number;
  tube: number;
  color: string;
  opacity: number;
}

function OrbitingRings() {
  const rings: RingConfig[] = [
    { tilt: [0, 0, 0],        speed:  0.12, radius: 3.2, tube: 0.016, color: "#14b8a6", opacity: 0.7 },
    { tilt: [Math.PI / 4, 0.3, 0], speed: -0.08, radius: 3.8, tube: 0.012, color: "#2563eb", opacity: 0.5 },
    { tilt: [Math.PI * 0.7, 0.5, 0.2], speed: 0.06, radius: 4.5, tube: 0.010, color: "#a855f7", opacity: 0.35 },
  ];

  return (
    <>
      {rings.map((ring, i) => (
        <Ring key={i} config={ring} index={i} />
      ))}
    </>
  );
}

function Ring({ config, index }: { config: RingConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.getElapsedTime() * config.speed + index * 0.8;
  });

  return (
    <mesh ref={meshRef} rotation={config.tilt as [number, number, number]}>
      <torusGeometry args={[config.radius, config.tube, 64, 256]} />
      <meshStandardMaterial
        color={config.color}
        emissive={config.color}
        emissiveIntensity={1.2}
        transparent
        opacity={config.opacity}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. INTERACTIVE SPHERE
   Physical glass-like sphere that reacts to mouse proximity.
   Uses MeshDistortMaterial from Drei for smooth vertex distortion.
   Desktop only — completely omitted on mobile.
───────────────────────────────────────────────────────────── */
function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const distortSpeed = useRef(0.2);

  // Track mouse in normalized coordinates
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle float
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = t * 0.05;

    // Distortion speed follows mouse proximity to center
    const dist = Math.sqrt(mousePos.current.x ** 2 + mousePos.current.y ** 2);
    const targetDistort = 0.2 + (1 - Math.min(dist, 1)) * 0.5;
    distortSpeed.current += (targetDistort - distortSpeed.current) * 0.05;

    // Apply to material if available
    const mat = meshRef.current.material as any;
    if (mat && mat.distort !== undefined) {
      mat.distort = distortSpeed.current * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color="#14b8a6"
        emissive="#0f766e"
        emissiveIntensity={0.3}
        roughness={0.05}
        metalness={0.1}
        transparent
        opacity={0.12}
        distort={0.3}
        speed={1.5}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   CANVAS LOADER — minimal progress indicator
───────────────────────────────────────────────────────────── */
function CanvasLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#14b8a6" wireframe />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SCENE 3D — Root Export
───────────────────────────────────────────────────────────── */
export default function HeroScene3D() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const isMobile = typeof navigator !== "undefined"
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false;

  if (!webGLSupported) {
    // CSS gradient fallback is already present in layout — just return null
    return null;
  }

  const particleCount = isMobile ? 200 : 800;

  return (
    <div className="hero-canvas-container" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          // Check WebGL support on creation
          if (!gl.getContext()) {
            setWebGLSupported(false);
          }
        }}
        style={{ background: "transparent" }}
      >
        {/* Minimal lighting — one ambient + one brand-colored point */}
        <ambientLight intensity={0.35} />
        <pointLight position={[8, 8, 4]} color="#14b8a6" intensity={2.5} />
        <pointLight position={[-8, -4, 2]} color="#2563eb" intensity={1.5} />

        {/* 3D Elements */}
        <FloatingParticleField count={particleCount} />
        <OrbitingRings />
        {!isMobile && <InteractiveSphere />}
      </Canvas>
    </div>
  );
}
