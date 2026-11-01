import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download, Send, MapPin, Briefcase, FileDown } from "lucide-react";
import { profile, hudLabels } from "../data/portfolio";
import { Magnetic, StatusDot, useTypewriter } from "../components/ui";

const AICoreCanvas = lazy(() =>
  import("../components/three").then((m) => ({ default: m.AICoreCanvas }))
);

// stable reference — the typewriter effect depends on identity
const ROLES: string[] = [...profile.roles];

function downloadResumeFallback() {
  // Works even before the real PDF is added — generates a clean text resume.
  const text = [
    "MOHIT DANGI — Aspiring IT Professional & Developer",
    profile.location,
    "",
    "EDUCATION",
    `- ${profile.school} — 12th Pass`,
    "- Bachelor of Computer Applications (Currently Pursuing)",
    "",
    "ROLE",
    `- ${profile.currentRole}`,
    "",
    "SKILLS",
    "- Programming: C, C++, Java, Python",
    "- Web: HTML, CSS, JavaScript",
    "- Tools: Git, GitHub, VS Code, MS Office",
    "- Professional: Problem Solving, Teamwork, Leadership, Communication",
    "",
    "CAREER GOAL",
    profile.careerGoal,
    "",
    "(Replace this auto-generated file with your designed PDF at public/Mohit-Dangi-Resume.pdf)",
  ].join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Mohit-Dangi-Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

async function handleResume() {
  try {
    const res = await fetch(profile.resumeUrl, { method: "HEAD" });
    if (res.ok) {
      const a = document.createElement("a");
      a.href = profile.resumeUrl;
      a.download = profile.resumeFileName;
      a.click();
      return;
    }
  } catch {
    /* fall through to generated resume */
  }
  downloadResumeFallback();
}

const HUD_POSITIONS = [
  "top-[6%] left-[2%]",
  "top-[16%] right-[1%]",
  "top-[46%] left-[0%]",
  "bottom-[24%] right-[3%]",
  "bottom-[6%] left-[10%]",
];

export function Hero() {
  const typed = useTypewriter(ROLES);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const [counters, setCounters] = useState({ tech: 0, focus: 0 });

  // feed scroll progress to the 3D scene + run HUD counters
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        scrollRef.current = Math.min(1, y / window.innerHeight);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // honest counters: technologies listed + focus areas (real, countable)
    const t = setTimeout(() => setCounters({ tech: 15, focus: 6 }), 900);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16 md:pt-28" aria-label="Introduction">
      {/* backdrop layers */}
      <div className="grid-bg animate-grid-pan absolute inset-0" aria-hidden="true" />
      <div className="animate-aurora absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/14 via-blue-600/12 to-violet-600/14 blur-[110px]" aria-hidden="true" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8">
        {/* ── Left: command text ── */}
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <StatusDot label="Systems Online" />
            <span className="chip hidden items-center gap-1.5 rounded-full px-3 py-1 font-mono2 text-[10px] tracking-[0.2em] uppercase sm:inline-flex" style={{ color: "var(--ink-dim)" }}>
              <MapPin className="h-3 w-3 text-cyan-400" /> {profile.location}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono2 text-xs tracking-[0.45em] uppercase sm:text-sm"
            style={{ color: "var(--neon)" }}
          >
            {"// Hello, I'm"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display mt-3 text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl xl:text-[5.5rem]"
          >
            MOHIT
            <br />
            <span className="text-gradient text-glow glitch" data-text="DANGI">DANGI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.52 }}
            className="font-display mt-5 text-lg font-medium sm:text-xl md:text-2xl"
            style={{ color: "var(--ink-dim)" }}
          >
            {profile.primaryTitle}
          </motion.p>

          {/* typing line */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="mt-4 flex h-8 items-center justify-center font-mono2 text-sm sm:text-base lg:justify-start"
            aria-live="polite"
          >
            <span className="text-cyan-400">&gt;_&nbsp;</span>
            <span className="text-gradient font-semibold">{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-cyan-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base lg:mx-0"
            style={{ color: "var(--ink-mute)" }}
          >
            “{profile.tagline}”
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.88 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Magnetic>
              <a href="#projects" className="btn-primary flex w-56 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide text-white sm:w-auto">
                <Briefcase className="h-4 w-4" /> EXPLORE MY WORK
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={handleResume} className="btn-ghost flex w-56 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide sm:w-auto">
                <Download className="h-4 w-4" style={{ color: "var(--neon)" }} /> RESUME
              </button>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost flex w-56 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide sm:w-auto">
                <Send className="h-4 w-4" style={{ color: "var(--neon)" }} /> CONTACT ME
              </a>
            </Magnetic>
          </motion.div>

          {/* mini HUD stats — only real, countable numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
            className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 lg:mx-0"
          >
            {[
              { v: counters.tech, suffix: "", label: "Technologies in stack" },
              { v: counters.focus, suffix: "", label: "Future Lab tracks" },
              { v: 100, suffix: "%", label: "Commitment to growth" },
            ].map((s, i) => (
              <div key={i} className="glass hud-corner rounded-xl px-2 py-3 text-center">
                <p className="font-display text-xl font-bold text-cyan-300 tabular-nums sm:text-2xl">
                  {s.v}
                  {s.suffix}
                </p>
                <p className="mt-1 text-[10px] leading-tight tracking-wide uppercase" style={{ color: "var(--ink-mute)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D AI core ── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px] lg:h-[560px]"
        >
          {/* glow bed */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="h-56 w-56 rounded-full bg-cyan-500/15 blur-[90px] sm:h-72 sm:w-72" />
          </div>
          {/* holographic rings behind canvas */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="animate-spin-slower h-64 w-64 rounded-full border border-dashed border-cyan-400/20 sm:h-80 sm:w-80" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="animate-spin-reverse h-48 w-48 rounded-full border border-violet-500/20 sm:h-60 sm:w-60" />
          </div>

          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/30">
                  <FileDown className="h-6 w-6 animate-pulse text-cyan-400" />
                </div>
              </div>
            }
          >
            <AICoreCanvas scrollRef={scrollRef} />
          </Suspense>

          {/* HUD labels */}
          {!reduce &&
            hudLabels.map((label, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.15 }}
                className={`chip absolute rounded-md px-2.5 py-1 font-mono2 text-[9px] tracking-[0.25em] sm:text-[10px] ${
                  i % 2 ? "animate-float-late" : "animate-float"
                } ${HUD_POSITIONS[i]}`}
                style={{ color: label === "ONLINE" ? "#34d399" : "var(--neon)" }}
              >
                {label === "ONLINE" && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-blink rounded-full bg-emerald-400" />}
                {label}
              </motion.span>
            ))}

          {/* bottom readout */}
          <div className="glass absolute -bottom-8 left-1/2 hidden w-max -translate-x-1/2 items-center gap-4 rounded-full px-5 py-2 font-mono2 text-[10px] tracking-widest sm:flex" style={{ color: "var(--ink-mute)" }}>
            <span>3D ENGINE <span className="text-cyan-300">ACTIVE</span></span>
            <span className="h-3 w-px bg-white/15" />
            <span>INTERACTION <span className="text-emerald-400">ENABLED</span></span>
            <span className="h-3 w-px bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
        style={{ color: "var(--ink-mute)" }}
      >
        <span className="font-mono2 text-[9px] tracking-[0.35em] uppercase">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-cyan-400" />
      </motion.a>
    </section>
  );
}
