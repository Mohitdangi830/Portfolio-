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

/* ── Custom Animated Cursor (Precision Plus + Crosshair) ─────────────── */
export function CustomCursor() {
  const plusRef = useRef<HTMLDivElement>(null);
  const echoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    let raf = 0;
    let mx = -100;
    let my = -100;
    let ex = -100;
    let ey = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const isText = !!t?.closest("input, textarea");
      setTextMode(isText);
      setHovering(
        !isText &&
          !!t?.closest("a, button, select, [role='button'], [role='tab'], [role='radio'], [data-hover]")
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    const loop = () => {
      ex += (mx - ex) * 0.22;
      ey += (my - ey) * 0.22;
      if (plusRef.current) plusRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (echoRef.current) echoRef.current.style.transform = `translate3d(${ex}px, ${ey}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduce]);

  if (reduce) return null;

  const armColor = hovering || pressed ? "#FF7138" : "var(--ink)";
  const glowColor = hovering || pressed ? "rgba(255, 113, 56, 0.55)" : "rgba(57, 135, 255, 0.5)";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block">
      {/* Subtle trailing plus echo */}
      <div
        ref={echoRef}
        className="absolute top-0 left-0 transition-opacity duration-200"
        style={{ opacity: visible && !textMode ? (hovering ? 0.45 : 0.28) : 0 }}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: pressed ? "scale(0.8)" : hovering ? "scale(1.45)" : "scale(1.15)",
          }}
        >
          <span
            className="absolute top-0 left-0 h-[1.5px] w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200"
            style={{ backgroundColor: hovering ? "#FF7138" : "#3987FF" }}
          />
          <span
            className="absolute top-0 left-0 h-7 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200"
            style={{ backgroundColor: hovering ? "#FF7138" : "#3987FF" }}
          />
        </div>
      </div>

      {/* Zero-lag crisp plus (+) crosshair */}
      <div
        ref={plusRef}
        className="absolute top-0 left-0 transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {textMode ? (
          <div
            className="-mt-2.5 -ml-[1px] h-5 w-[2px] rounded-full"
            style={{
              backgroundColor: "var(--cursor)",
              boxShadow: "0 0 10px var(--cursor)",
            }}
          />
        ) : (
          <div
            className="relative transition-transform duration-150 ease-out"
            style={{
              transform: pressed ? "scale(0.76)" : hovering ? "scale(1.25)" : "scale(1)",
              filter: `drop-shadow(0 0 7px ${glowColor})`,
            }}
          >
            {/* Horizontal bar */}
            <span
              className="absolute top-0 left-0 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150"
              style={{ backgroundColor: armColor }}
            />
            {/* Vertical bar */}
            <span
              className="absolute top-0 left-0 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150"
              style={{ backgroundColor: armColor }}
            />
            {/* Center intersection point */}
            <span
              className="absolute top-0 left-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150"
              style={{ backgroundColor: hovering ? "#FFFFFF" : "#3987FF" }}
            />
          </div>
        )}
      </div>
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
