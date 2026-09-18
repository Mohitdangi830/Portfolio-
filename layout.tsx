import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Mail, Terminal, Gauge } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import { navLinks, profile, socials } from "../data/portfolio";
import { Magnetic } from "./ui";
import { cn } from "../utils/cn";

/* ── Cinematic boot preloader ──────────────────────────────────────── */
const BOOT_LINES = [
  "> initializing AI command center…",
  "> loading neural interface… OK",
  "> calibrating holographic core… OK",
  "> establishing secure connection…",
  "> welcome, visitor. access granted.",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const DURATION = 2100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      setLines(Math.min(BOOT_LINES.length, Math.floor(eased * (BOOT_LINES.length + 1))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#030014]"
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="relative w-[min(92vw,440px)] px-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-2xl bg-cyan-500/20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/5 font-display text-xl font-bold text-cyan-300">
              MD
            </div>
          </div>
        </div>
        <p className="font-mono2 text-center text-[11px] tracking-[0.35em] text-cyan-300/80 uppercase">
          AI Command Center
        </p>
        <div className="mt-6 min-h-[118px] rounded-xl border border-white/10 bg-black/40 p-4 font-mono2 text-[11px] leading-6 text-emerald-300/90 sm:text-xs">
          {BOOT_LINES.slice(0, lines).map((l, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              {l}
            </motion.p>
          ))}
          <span className="inline-block h-3.5 w-2 animate-blink bg-emerald-400 align-middle" />
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between font-mono2 text-[10px] tracking-widest text-white/50 uppercase">
            <span>Loading modules</span>
            <span className="text-cyan-300">{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-[width] duration-100"
              style={{ width: `${progress}%`, boxShadow: "0 0 16px #22d3ee" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────── */
export function Navbar({
  theme,
  onTheme,
  lowMotion,
  onLowMotion,
}: {
  theme: "dark" | "light";
  onTheme: () => void;
  lowMotion: boolean;
  onLowMotion: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = navLinks.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={cn("fixed inset-x-0 top-0 z-[100] transition-all duration-500")}
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-line)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8" aria-label="Main navigation">
          <a href="#home" className="group flex items-center gap-3" aria-label="Mohit Dangi — home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/50 bg-gradient-to-br from-cyan-500/15 to-violet-600/15 font-display text-sm font-bold text-cyan-300 transition-shadow group-hover:shadow-[0_0_18px_rgba(34,211,238,0.5)]">
              MD
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-bold tracking-wider">MOHIT.DEV</span>
              <span className="font-mono2 text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--ink-mute)" }}>
                AI Command
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors",
                    active === l.href.slice(1) ? "text-cyan-300" : "hover:text-cyan-300"
                  )}
                  style={active === l.href.slice(1) ? {} : { color: "var(--ink-dim)" }}
                >
                  {l.label}
                  {active === l.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-cyan-400/25 bg-cyan-400/10"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.15}>
              <button
                onClick={onTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Light mode" : "Dark mode"}
                className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full"
              >
                {theme === "dark" ? <Sun className="h-[18px] w-[18px] text-amber-300" /> : <Moon className="h-[18px] w-[18px] text-indigo-600" />}
              </button>
            </Magnetic>
            <Magnetic strength={0.15}>
              <button
                onClick={onLowMotion}
                aria-label="Toggle reduced motion"
                title={lowMotion ? "Enable animations" : "Reduce animations"}
                className={cn("btn-ghost hidden h-10 w-10 items-center justify-center rounded-full sm:flex", lowMotion && "border-cyan-400/60")}
              >
                <Gauge className={cn("h-[18px] w-[18px]", lowMotion ? "text-cyan-300" : "")} style={lowMotion ? {} : { color: "var(--ink-mute)" }} />
              </button>
            </Magnetic>
            <a href="#contact" className="btn-primary hidden rounded-full px-5 py-2.5 text-[13px] font-semibold text-white md:block">
              Hire Me
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] lg:hidden"
            style={{ background: "var(--nav-bg)", backdropFilter: "blur(24px)" }}
          >
            <motion.ul
              className="flex h-full flex-col items-center justify-center gap-2 px-8"
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }, closed: {} }}
            >
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 24 } }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="glass group flex items-center justify-between rounded-2xl px-6 py-4 font-display text-lg font-semibold transition-colors hover:border-cyan-400/50"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono2 text-xs text-cyan-300/60">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 24 } }} className="mt-4 flex gap-3">
                <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"><GithubIcon className="h-5 w-5" /></a>
                <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"><LinkedinIcon className="h-5 w-5" /></a>
                <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"><InstagramIcon className="h-5 w-5" /></a>
                <a href={socials.email} aria-label="Email" className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"><Mail className="h-5 w-5" /></a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="section-fade relative z-10 border-t border-white/5" style={{ borderColor: "var(--glass-line)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/50 bg-gradient-to-br from-cyan-500/15 to-violet-600/15 font-display text-sm font-bold text-cyan-300">
              MD
            </span>
            <span className="font-display text-lg font-bold tracking-widest">{profile.name.toUpperCase()}</span>
          </a>
          <p className="font-mono2 text-xs tracking-wide" style={{ color: "var(--ink-mute)" }}>
            <Terminal className="mr-2 inline h-3.5 w-3.5 text-cyan-400" />
            Building skills. Creating solutions. Growing every day.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: GithubIcon, href: socials.github, label: "GitHub" },
              { icon: LinkedinIcon, href: socials.linkedin, label: "LinkedIn" },
              { icon: InstagramIcon, href: socials.instagram, label: "Instagram" },
              { icon: Mail, href: socials.email, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.label}
                className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full"
              >
                <s.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
            © 2026 {profile.name}. All rights reserved. · Designed as a personal AI command center.
          </p>
        </div>
      </div>
    </footer>
  );
}
