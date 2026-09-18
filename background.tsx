import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/* ── Lightweight canvas particle field (rAF, DPR-aware, mobile-tuned) ─ */
export function ParticleField({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; hue: number; a: number }[] = [];
    let mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;
    const isDark = () => document.documentElement.classList.contains("dark");

    function resize() {
      if (!canvas) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(((isMobile ? 42 : 110) * density * Math.min(w, 1600)) / 1400);
      particles = Array.from({ length: Math.max(24, count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        hue: Math.random() > 0.5 ? 190 : 258,
        a: Math.random() * 0.5 + 0.2,
      }));
    }

    function onMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      for (const p of particles) {
        // gentle repel from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 1) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsla(${p.hue}, 90%, 68%, ${p.a})`
          : `hsla(${p.hue}, 70%, 45%, ${p.a * 0.8})`;
        ctx.fill();
      }
      // connect nearby particles sparingly (desktop only)
      if (!isMobile) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 3; j < particles.length; j += 3) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
              ctx.strokeStyle = dark
                ? `rgba(80,140,255,${(1 - d / 110) * 0.16})`
                : `rgba(60,80,180,${(1 - d / 110) * 0.14})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density, reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" />;
}

/* ── Mouse-following ambient light ─────────────────────────────────── */
export function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      if (ref.current) ref.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden h-[600px] w-[600px] rounded-full opacity-60 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(34,211,238,0.07) 0%, rgba(139,92,246,0.05) 35%, transparent 65%)",
      }}
    />
  );
}

/* ── Futuristic custom cursor ──────────────────────────────────────── */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    let raf = 0;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, input, textarea, select, [data-hover]"));
    };
    const onLeave = () => setVisible(false);
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full transition-opacity duration-300"
        style={{
          background: "var(--cursor)",
          boxShadow: "0 0 10px var(--cursor), 0 0 22px var(--cursor)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border transition-[width,height,margin,border-color,opacity,background-color] duration-300 ease-out"
        style={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          marginLeft: hovering ? -28 : -17,
          marginTop: hovering ? -28 : -17,
          borderColor: hovering ? "var(--cursor)" : "color-mix(in srgb, var(--cursor) 45%, transparent)",
          backgroundColor: hovering ? "color-mix(in srgb, var(--cursor) 10%, transparent)" : "transparent",
          boxShadow: hovering ? "0 0 24px color-mix(in srgb, var(--cursor) 35%, transparent)" : "none",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ── Scroll progress bar ───────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
    />
  );
}

/* ── Back to top ───────────────────────────────────────────────────── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="btn-ghost fixed right-5 bottom-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full md:right-8 md:bottom-8"
        >
          <ArrowUp className="h-5 w-5" style={{ color: "var(--neon)" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
