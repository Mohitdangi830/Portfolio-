import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "../utils/cn";

/* ── Scroll reveal wrapper (zero-latency content availability) ──────── */
export function Reveal({
  children,
  delay = 0,
  y = 24,
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
      viewport={{ once, amount: "some" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Editorial Section Heading ─────────────────────────────────────── */
export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "left",
  accentTone = "blue",
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  accentTone?: "blue" | "orange";
}) {
  const centered = align === "center";
  const accentColor = accentTone === "orange" ? "#FF7138" : "var(--accent)";

  return (
    <div className={cn("mb-12 md:mb-16", centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left")}>
      <Reveal y={14}>
        <p
          className="font-mono2 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: accentColor }}
        >
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.06} y={18}>
        <h2 className="font-display mt-3 text-3xl leading-[1.06] font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title}{" "}
          {accent && (
            <span style={{ color: accentColor }}>
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12} y={18}>
          <p
            className={cn("mt-4 max-w-2xl text-base leading-relaxed", centered && "mx-auto")}
            style={{ color: "var(--ink-muted)" }}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Magnetic Hover Wrapper ────────────────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate3d(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px, 0)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate3d(0px, 0px, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block transition-transform duration-200 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}

/* ── Subtle 3D Perspective Tilt Card ───────────────────────────────── */
export function TiltCard({
  children,
  className,
  max = 6,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1100px) rotateX(0deg) rotateY(0deg)");
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTransform(
      `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(4px)`
    );
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(57,135,255,0.10), transparent 58%)`;
    }
  }

  function onLeave() {
    setTransform("perspective(1100px) rotateX(0deg) rotateY(0deg)");
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
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-colors duration-300"
        />
      )}
    </div>
  );
}
