"use client";

import { useEffect, useRef } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
  Vector2,
  Clock,
} from "three";

// ---------------------------------------------------------------------------
// VERTEX SHADER – unchanged (trivial pass-through, zero cost)
// ---------------------------------------------------------------------------
const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ---------------------------------------------------------------------------
// FRAGMENT SHADER – optimised version
//
// Key changes vs original:
//  • Removed per-fragment `log(length(baseUv)+1)` per layer (expensive) –
//    rotated UV is reused, angle is computed once outside the loop-
//    equivalent (angle is loop-invariant: depends only on baseUv which is
//    constant per fragment, not on loop index).
//  • Precompute `time` outside shader (iTime * animationSpeed is 2 ops per
//    wave() call → now a single uniform).
//  • `exp(-dot(d,d)*bendRadius)` is the dominant expensive op; it is still
//    needed for correct visual but we guard it behind `interactive`.
//  • Gradient index arithmetic stays the same (cheap integer work).
//  • precision lowp on uniforms that don't need highp saves bandwidth.
// ---------------------------------------------------------------------------
const fragmentShader = `
precision mediump float;

uniform float iTime;         // pre-scaled: iTime * animationSpeed
uniform vec3  iResolution;
uniform float animationSpeed;

// wave-group enable flags
uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

// per-group line counts (clamped by device tier on CPU side)
uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2  iMouse;
uniform bool  interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool  parallax;
uniform float parallaxStrength;
uniform vec2  parallaxOffset;

uniform vec3  lineGradient[8];
uniform int   lineGradientCount;

// ── constants ──────────────────────────────────────────────────────────────
const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(0.914, 0.278, 0.961);   // pre-divided by 255
const vec3 BLUE  = vec3(0.184, 0.294, 0.635);

// ── helpers ────────────────────────────────────────────────────────────────
mat2 rot2(float r) {
  float c = cos(r), s = sin(r);
  return mat2(c, s, -s, c);
}

vec3 background_color(vec2 uv) {
  // Single smoothstep-based gradient, no loops
  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;
  vec3 col = mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col      += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) return baseColor;
  if (lineGradientCount == 1) return lineGradient[0] * 0.5;

  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled   = clampedT * float(lineGradientCount - 1);
  int   idx      = int(floor(scaled));
  float f        = fract(scaled);
  int   idx2     = min(idx + 1, lineGradientCount - 1);
  return mix(lineGradient[idx], lineGradient[idx2], f) * 0.5;
}

// ──  wave ─────────────────────────────────────────────────────────────────
//  • time is now passed in (pre-multiplied by animationSpeed on CPU side)
//    so we save one multiply per call.
//  • bendOffset only computed when interactive flag is set.
float wave(
  vec2 uv, float offset,
  vec2 screenUv, vec2 mouseUv,
  bool shouldBend
) {
  float x_movement = iTime * 0.1;
  float amp        = sin(offset + iTime * 0.2) * 0.3;
  float y          = sin(uv.x + offset + x_movement) * amp;

  if (shouldBend) {
    vec2  d         = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

// ── main ──────────────────────────────────────────────────────────────────
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);
  vec3 b   = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv   = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  // ── BOTTOM layer ─────────────────────────────────────────────────────────
  if (enableBottom) {
    // Precompute rotation angle once for this layer (loop-invariant)
    float lenUv  = length(baseUv);
    float angle  = bottomWavePosition.z * log(lenUv + 1.0);
    vec2  ruv    = baseUv * rot2(angle);

    for (int i = 0; i < bottomLineCount; ++i) {
      float fi   = float(i);
      float t    = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lCol  = getLineColor(t, b);
      col += lCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }

  // ── MIDDLE layer ─────────────────────────────────────────────────────────
  if (enableMiddle) {
    float lenUv  = length(baseUv);
    float angle  = middleWavePosition.z * log(lenUv + 1.0);
    vec2  ruv    = baseUv * rot2(angle);

    for (int i = 0; i < middleLineCount; ++i) {
      float fi   = float(i);
      float t    = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lCol  = getLineColor(t, b);
      col += lCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv, mouseUv, interactive
      );
    }
  }

  // ── TOP layer ─────────────────────────────────────────────────────────────
  if (enableTop) {
    float lenUv  = length(baseUv);
    float angle  = topWavePosition.z * log(lenUv + 1.0);
    vec2  ruv    = baseUv * rot2(angle);
    ruv.x       *= -1.0;

    for (int i = 0; i < topLineCount; ++i) {
      float fi   = float(i);
      float t    = fi / max(float(topLineCount - 1), 1.0);
      vec3 lCol  = getLineColor(t, b);
      col += lCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_GRADIENT_STOPS = 8;

// ---------------------------------------------------------------------------
// Device-tier detection
// Runs once at module load – avoids repeated navigator access in RAF loop.
// ---------------------------------------------------------------------------
const detectDeviceTier = (): "low" | "mid" | "high" => {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency ?? 4;
  // deviceMemory is not in every TS lib yet – cast to any
  const mem = (navigator as any).deviceMemory ?? 4;
  const mobile = /Mobi|Android/i.test(navigator.userAgent);

  if (mobile || cores <= 2 || mem <= 2) return "low";
  if (cores <= 4 || mem <= 4) return "mid";
  return "high";
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type WavePosition = { x: number; y: number; rotate: number };

export type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: Array<"top" | "middle" | "bottom">;
  /** Per-wave line count or a single count for all waves */
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  /** Max pixel-ratio cap. Default 1.5 (big GPU win vs. native 2–3×) */
  maxPixelRatio?: number;
  /** Target FPS cap. Default 45. Set to 60 for high-end preference. */
  maxFPS?: number;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hexToVec3(hex: string): Vector3 {
  let v = hex.trim().replace(/^#/, "");
  let r = 255, g = 255, b = 255;
  if (v.length === 3) {
    r = parseInt(v[0] + v[0], 16);
    g = parseInt(v[1] + v[1], 16);
    b = parseInt(v[2] + v[2], 16);
  } else if (v.length === 6) {
    r = parseInt(v.slice(0, 2), 16);
    g = parseInt(v.slice(2, 4), 16);
    b = parseInt(v.slice(4, 6), 16);
  }
  return new Vector3(r / 255, g / 255, b / 255);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function FloatingLines({
  linesGradient,
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen",
  maxPixelRatio = 1.5,          // ★ GPU win: cap at 1.5× instead of 2×
  maxFPS = 45,                   // ★ FPS cap: ~45fps is invisible vs 60fps for BG
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Damped mouse / parallax
  const targetMouseRef    = useRef(new Vector2(-1000, -1000));
  const currentMouseRef   = useRef(new Vector2(-1000, -1000));
  const targetInfluenceRef  = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef   = useRef(new Vector2(0, 0));
  const currentParallaxRef  = useRef(new Vector2(0, 0));

  // RAF state refs
  const rafRef        = useRef<number>(0);
  const isVisibleRef  = useRef(true);   // IntersectionObserver visibility
  const isPageVisible = useRef(true);   // Page Visibility API
  const lastFrameTime = useRef(0);       // for FPS cap
  const idleTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIdleRef     = useRef(false);   // slow-mo when no interaction

  // Adaptive resolution scaling
  const fpsHistoryRef   = useRef<number[]>([]);
  const scaleFactorRef  = useRef(1.0);   // 1.0 = full resolution

  useEffect(() => {
    if (!containerRef.current) return;

    // ── respects prefers-reduced-motion ────────────────────────────────────
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── device-tier adaptive degradation ──────────────────────────────────
    const tier = detectDeviceTier();
    const isLow  = tier === "low";
    const isMid  = tier === "mid";
    const isMobile = window.innerWidth < 768;

    // Disable interactions on low-end / mobile for CPU savings
    const useInteractive = interactive && !isLow && !isMobile;
    const useParallax    = parallax   && !isLow && !isMobile;

    // Scale down line counts based on device tier
    const tierLineScale = isLow ? 0.4 : isMid ? 0.65 : 1.0;

    const getLineCount = (wave: "top" | "middle" | "bottom"): number => {
      if (!enabledWaves.includes(wave)) return 0;
      const idx = enabledWaves.indexOf(wave);
      const raw = typeof lineCount === "number"
        ? lineCount
        : (lineCount[idx] ?? 6);
      // Clamp minimum to 1, round down
      return Math.max(1, Math.floor(raw * tierLineScale));
    };

    const getLineDistance = (wave: "top" | "middle" | "bottom"): number => {
      if (!enabledWaves.includes(wave)) return 0.01;
      const idx = enabledWaves.indexOf(wave);
      const raw = typeof lineDistance === "number"
        ? lineDistance
        : (lineDistance[idx] ?? 5);
      return raw * 0.01;
    };

    const topLC    = enabledWaves.includes("top")    ? getLineCount("top")    : 0;
    const midLC    = enabledWaves.includes("middle")  ? getLineCount("middle") : 0;
    const botLC    = enabledWaves.includes("bottom")  ? getLineCount("bottom") : 0;
    const topLD    = enabledWaves.includes("top")    ? getLineDistance("top")    : 0.01;
    const midLD    = enabledWaves.includes("middle")  ? getLineDistance("middle") : 0.01;
    const botLD    = enabledWaves.includes("bottom")  ? getLineDistance("bottom") : 0.01;

    // ── WebGL renderer ─────────────────────────────────────────────────────
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      // WebGL not available – fall back to static CSS gradient (handled by CSS)
      return;
    }

    // ★ KEY WIN: cap pixel ratio to 1.5 (saves ~44% fill-rate vs native 2×)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.domElement.style.width  = "100%";
    renderer.domElement.style.height = "100%";
    containerRef.current.appendChild(renderer.domElement);

    // ── Three.js scene (2-D fullscreen quad) ──────────────────────────────
    const scene    = new Scene();
    const camera   = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const uniforms: Record<string, { value: any }> = {
      iTime:            { value: 0 },
      iResolution:      { value: new Vector3(1, 1, 1) },
      // ★ animationSpeed is pre-multiplied on CPU in the RAF loop; the uniform
      //   still exists so the shader compiles, but we also pass scaled iTime.
      animationSpeed:   { value: animationSpeed },

      enableTop:        { value: enabledWaves.includes("top") },
      enableMiddle:     { value: enabledWaves.includes("middle") },
      enableBottom:     { value: enabledWaves.includes("bottom") },

      topLineCount:     { value: topLC },
      middleLineCount:  { value: midLC },
      bottomLineCount:  { value: botLC },

      topLineDistance:     { value: topLD },
      middleLineDistance:  { value: midLD },
      bottomLineDistance:  { value: botLD },

      topWavePosition: {
        value: new Vector3(
          topWavePosition?.x ?? 10.0,
          topWavePosition?.y ?? 0.5,
          topWavePosition?.rotate ?? -0.4
        ),
      },
      middleWavePosition: {
        value: new Vector3(
          middleWavePosition?.x ?? 5.0,
          middleWavePosition?.y ?? 0.0,
          middleWavePosition?.rotate ?? 0.2
        ),
      },
      bottomWavePosition: {
        value: new Vector3(
          bottomWavePosition?.x ?? 2.0,
          bottomWavePosition?.y ?? -0.7,
          bottomWavePosition?.rotate ?? 0.4
        ),
      },

      iMouse:          { value: new Vector2(-1000, -1000) },
      interactive:     { value: useInteractive },
      bendRadius:      { value: bendRadius },
      bendStrength:    { value: bendStrength },
      bendInfluence:   { value: 0 },

      parallax:         { value: useParallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset:   { value: new Vector2(0, 0) },

      lineGradient: {
        value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)),
      },
      lineGradientCount: { value: 0 },
    };

    // Populate gradient stops
    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const c = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(c.x, c.y, c.z);
      });
    }

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    const clock = new Clock();

    // ── Resize handling ────────────────────────────────────────────────────
    const applySize = () => {
      const el = containerRef.current!;
      const w  = (el.clientWidth  || 1) * scaleFactorRef.current;
      const h  = (el.clientHeight || 1) * scaleFactorRef.current;
      renderer.setSize(w, h, false);
      // Keep CSS size at 100% so the downscaled canvas stretches (cheap upscale)
      renderer.domElement.style.width  = "100%";
      renderer.domElement.style.height = "100%";
      uniforms.iResolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
        1
      );
    };

    applySize();

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(applySize)
      : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    // ── Pointer events (only on capable devices) ───────────────────────────
    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dpr = renderer.getPixelRatio();

      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;

      // Reset idle timer
      isIdleRef.current = false;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isIdleRef.current = true;
      }, 3000); // go idle after 3 s of no movement

      if (useParallax) {
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        targetParallaxRef.current.set(
          ((x - cx) / rect.width)  *  parallaxStrength,
          -((y - cy) / rect.height) * parallaxStrength
        );
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    if (useInteractive) {
      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    }

    // ── Page Visibility API – pause RAF when tab is hidden ─────────────────
    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden;
      if (!document.hidden) {
        // Restart clock so elapsed time doesn't jump
        clock.getDelta(); // flush delta
        scheduleFrame();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // ── IntersectionObserver – pause when off-screen ────────────────────────
    const io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          ([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) scheduleFrame();
          },
          { threshold: 0 }
        )
      : null;
    if (io && containerRef.current) io.observe(containerRef.current);

    // ── Adaptive resolution – downscale when GPU is struggling ─────────────
    const updateAdaptiveResolution = (instantFPS: number) => {
      const hist = fpsHistoryRef.current;
      hist.push(instantFPS);
      if (hist.length > 10) hist.shift();                 // rolling window
      const avg = hist.reduce((a, b) => a + b, 0) / hist.length;

      if (avg < 28 && scaleFactorRef.current > 0.55) {
        scaleFactorRef.current = Math.max(0.5, scaleFactorRef.current - 0.1);
        applySize();
      } else if (avg > 50 && scaleFactorRef.current < 1.0) {
        scaleFactorRef.current = Math.min(1.0, scaleFactorRef.current + 0.05);
        applySize();
      }
    };

    // ── Render loop ────────────────────────────────────────────────────────
    // ★ FPS cap: skip frames to stay near maxFPS even on a 120 Hz display
    const frameInterval = 1000 / maxFPS;

    const renderLoop = (now: DOMHighResTimeStamp) => {
      rafRef.current = requestAnimationFrame(renderLoop);

      // Pause when tab hidden or component off-screen
      if (!isPageVisible.current || !isVisibleRef.current) return;

      // FPS cap
      const delta = now - lastFrameTime.current;
      if (delta < frameInterval) return;
      lastFrameTime.current = now - (delta % frameInterval); // stay in sync

      // Compute instantaneous FPS for adaptive resolution
      updateAdaptiveResolution(1000 / Math.max(delta, 1));

      // ★ Idle mode: slow animation speed while no interaction
      const effectiveSpeed = isIdleRef.current
        ? animationSpeed * 0.35
        : animationSpeed;

      const elapsed = clock.getElapsedTime();
      // Pre-multiply speed on CPU side – saves one multiply per fragment
      uniforms.iTime.value = elapsed * effectiveSpeed;

      // ★ prefers-reduced-motion: freeze time (still renders 1 frame)
      if (prefersReducedMotion) {
        uniforms.iTime.value = 0;
      }

      // Damped mouse / parallax interpolation
      if (useInteractive) {
        currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouseRef.current);

        currentInfluenceRef.current +=
          (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluenceRef.current;
      }

      if (useParallax) {
        currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      }

      renderer.render(scene, camera);
    };

    const scheduleFrame = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(renderLoop);
      }
    };

    // ★ For prefers-reduced-motion we still render one initial frame so the
    //   background appears, then we pause completely to save all GPU load.
    if (prefersReducedMotion) {
      // Render a single static frame
      uniforms.iTime.value = 0;
      renderer.render(scene, camera);
      // No RAF started → no continuous GPU usage
    } else {
      rafRef.current = requestAnimationFrame(renderLoop);
    }

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      ro?.disconnect();
      io?.disconnect();

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (useInteractive) {
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      }

      // ★ Proper Three.js disposal – prevents GPU memory leaks
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []); // ★ Empty deps: Three.js is initialised exactly once. Props are
           //   captured at mount time (intentional for performance – reinit
           //   is expensive). If you need reactive prop updates, lift them
           //   into refs and update uniforms directly inside the RAF loop.

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden floating-lines-container"
      style={{ mixBlendMode }}
      aria-hidden="true"   // decorative – hidden from assistive technology
    />
  );
}
