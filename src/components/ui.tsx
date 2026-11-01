import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "../utils/cn";

/* ── Scroll reveal wrapper ─────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.26, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated section heading ──────────────────────────────────────── */
export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12 md:mb-16", centered ? "text-center" : "text-left")}>
      <Reveal>
        <span
          className={cn(
            "chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono2 text-[11px] font-medium tracking-[0.25em] uppercase",
            "text-cyan-300 dark:text-cyan-300"
          )}
          style={{ color: "var(--neon)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </span>
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className={cn("mt-5 flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="h-1.5 w-1.5 rotate-45 bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          <span className="shimmer-line h-px w-28" />
          <span className="h-1.5 w-1.5 rotate-45 bg-violet-500 shadow-[0_0_12px_#8b5cf6]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500" />
        </div>
      </Reveal>
      {description && (
        <Reveal delay={0.22}>
          <p
            className={cn("mt-5 max-w-2xl text-sm leading-relaxed sm:text-base", centered && "mx-auto")}
            style={{ color: "var(--ink-mute)" }}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Magnetic hover wrapper ────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}

/* ── 3D tilt card ──────────────────────────────────────────────────── */
export function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTransform(`perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(6px)`);
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(34,211,238,0.14), transparent 60%)`;
    }
  }
  function onLeave() {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    if (glareRef.current) glareRef.current.style.background = "transparent";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn("relative transition-transform duration-200 ease-out will-change-transform", className)}
    >
      {children}
      {glare && <div ref={glareRef} className="pointer-events-none absolute inset-0 rounded-[inherit] transition-colors duration-300" />}
    </div>
  );
}

/* ── Typing effect ─────────────────────────────────────────────────── */
import { useEffect } from "react";

export function useTypewriter(words: string[], typeSpeed = 70, deleteSpeed = 38, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setText(words[0] ?? "");
      return;
    }
    const current = words[index % words.length] ?? "";
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timer);
  }, [text, index, deleting, words, typeSpeed, deleteSpeed, pause, reduce]);

  return text;
}

/* ── Status dot ────────────────────────────────────────────────────── */
export function StatusDot({ online = true, label }: { online?: boolean; label: string }) {
  return (
    <span className="chip inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono2 text-[10px] tracking-[0.2em] uppercase">
      <span className="relative flex h-2 w-2">
        {online && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", online ? "bg-emerald-400" : "bg-amber-400")} />
      </span>
      <span style={{ color: "var(--ink-dim)" }}>{label}</span>
    </span>
  );
}
