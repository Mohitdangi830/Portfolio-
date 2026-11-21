import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/* ── Subtle Ambient Star / Particle Field ──────────────────────────── */
export function ParticleField({ density = 0.85 }: { density?: number }) {
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
    let particles: { x: number; y: number; r: number; vx: number; vy: number; warm: boolean; a: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
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
      const count = Math.floor(((isMobile ? 28 : 68) * density * Math.min(w, 1600)) / 1400);
      particles = Array.from({ length: Math.max(18, count) }, (_, idx) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.5,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        warm: idx % 7 === 0,
        a: Math.random() * 0.38 + 0.14,
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
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 1) {
          p.x += (dx / dist) * 0.45;
          p.y += (dy / dist) * 0.45;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.warm) {
          ctx.fillStyle = dark ? `rgba(255, 113, 56, ${p.a})` : `rgba(234, 88, 12, ${p.a * 0.7})`;
        } else {
          ctx.fillStyle = dark ? `rgba(57, 135, 255, ${p.a})` : `rgba(37, 99, 235, ${p.a * 0.7})`;
        }
        ctx.fill();
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

/* ── Dynamic Glowing Cursor Ambient Halo ───────────────────────────── */
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
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
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
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden h-[560px] w-[560px] rounded-full opacity-75 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(57,135,255,0.08) 0%, rgba(255,113,56,0.03) 38%, transparent 66%)",
      }}
    />
  );
}

/* ── Custom Animated Cursor ────────────────────────────────────────── */
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
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
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
          boxShadow: "0 0 12px var(--cursor)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border transition-[width,height,margin,border-color,opacity,background-color] duration-200 ease-out"
        style={{
          width: hovering ? 48 : 30,
          height: hovering ? 48 : 30,
          marginLeft: hovering ? -24 : -15,
          marginTop: hovering ? -24 : -15,
          borderColor: hovering ? "var(--cursor)" : "color-mix(in srgb, var(--cursor) 45%, transparent)",
          backgroundColor: hovering ? "rgba(57, 135, 255, 0.10)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ── Scroll Progress Line ──────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3987FF 0%, #FF7138 100%)",
      }}
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left"
    />
  );
}

/* ── Back to Top Button ────────────────────────────────────────────── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="surface-glass fixed right-5 bottom-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-[#3987FF] md:right-8 md:bottom-8"
        >
          <ArrowUp className="h-4 w-4" style={{ color: "var(--accent)" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
