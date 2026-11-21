import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile, type SectionId } from "../data/portfolio";
import { Magnetic } from "../components/ui";

export function Hero({ onNavigate }: { onNavigate?: (id: SectionId) => void }) {
  const reduce = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 pb-10 md:pt-32"
      aria-label="Mohit Dangi introduction"
    >
      {/* Subtle architectural ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, #3987FF 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-12 h-[420px] w-[420px] rounded-full opacity-15 blur-[140px]"
        style={{ background: "radial-gradient(circle, #FF7138 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          {/* Availability status indicator + floating statement */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium"
          >
            <span className="inline-flex items-center gap-2" style={{ color: "var(--ink)" }}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
            <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>
              ·
            </span>
            <motion.span
              animate={reduce ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono2 tracking-wide"
              style={{ color: "var(--accent-orange)" }}
            >
              {profile.floatingStatement}
            </motion.span>
          </motion.div>

          {/* Main Animated Headline */}
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-[clamp(2.85rem,6.8vw,5.75rem)] leading-[0.96] font-extrabold tracking-tight text-balance"
          >
            BUILDING IDEAS.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(95deg, #FFFFFF 15%, #3987FF 65%, #FF7138 100%)",
              }}
            >
              CREATING IMPACT.
            </span>
          </motion.h1>

          {/* Personal Introduction */}
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl"
            style={{ color: "var(--ink-dim)" }}
          >
            {profile.intro}
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("projects");
                  }
                }}
                className="btn-electric inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap shrink-0"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("contact");
                  }
                }}
                className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap shrink-0"
              >
                Let&apos;s Collaborate
              </a>
            </Magnetic>
          </motion.div>

          {/* Clean Profile Portrait Card */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 inline-flex items-center gap-4 rounded-2xl border p-3 pr-5"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              {!imgError ? (
                <img
                  src={profile.profilePhoto}
                  alt="Mohit Dangi portrait"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-lg font-bold" style={{ color: "var(--accent)" }}>
                  MD
                </span>
              )}
            </div>
            <div>
              <p className="font-display text-sm font-semibold">{profile.name}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                Founder, The Creators · {profile.location}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-Down Indicator */}
      <div className="relative z-10 mx-auto mt-10 flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#about"
          className="group inline-flex items-center gap-2.5 text-xs font-medium tracking-wide transition-colors"
          style={{ color: "var(--ink-muted)" }}
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors group-hover:border-[#3987FF]"
            style={{ borderColor: "var(--border)" }}
          >
            <ArrowDown className="h-3.5 w-3.5 group-hover:text-[#3987FF]" />
          </motion.span>
          <span className="group-hover:text-[var(--ink)]">Scroll to explore</span>
        </a>

        <div className="hidden items-center gap-3 text-xs sm:flex" style={{ color: "var(--ink-muted)" }}>
          <span>Engineering</span>
          <span aria-hidden="true">·</span>
          <span>Design</span>
          <span aria-hidden="true">·</span>
          <span>Sports Leadership</span>
        </div>
      </div>
    </section>
  );
}
