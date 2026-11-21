import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import { navLinks, profile, socials } from "../data/portfolio";
import { Magnetic } from "./ui";

/* ── Minimalist Dynamic Preloader ──────────────────────────────────── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const DURATION = 1150;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#08090D] px-6 text-white"
    >
      <div className="w-full max-w-xs">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-xl font-bold tracking-tight">Mohit Dangi</span>
          <span className="font-mono2 text-xs text-[#9299A8]">{progress}%</span>
        </div>
        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3987FF 0%, #FF7138 100%)",
            }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-[#9299A8]">
          <span>Digital Identity</span>
          <button
            type="button"
            onClick={onDone}
            className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3987FF]"
          >
            Skip
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Top Navigation Bar (Clean 3-Zone Contract) ────────────────────── */
export function Navbar({
  theme,
  onTheme,
}: {
  theme: "dark" | "light";
  onTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      const ids = [...navLinks.map((l) => l.href.slice(1)), "contact"];
      let current = "";
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.42) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="font-display shrink-0 text-lg font-bold tracking-tight whitespace-nowrap transition-opacity hover:opacity-80"
          >
            Mohit Dangi
          </a>

          {/* Zone 2: Clean Single-line Text Navigation Links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
                    style={{ color: isActive ? "var(--ink)" : "var(--ink-muted)" }}
                  >
                    <span className="group-hover:text-[var(--ink)]">{link.label}</span>
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left transition-transform duration-200"
                      style={{
                        background: "var(--accent)",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Zone 3: Theme Switch + Single Primary Action */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[#FF7138]" />
              ) : (
                <Moon className="h-4 w-4 text-[#3987FF]" />
              )}
            </button>

            <Magnetic strength={0.18} className="hidden md:inline-block">
              <a
                href="#contact"
                className="btn-electric inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Let&apos;s Collaborate
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-between px-6 pt-24 pb-10 lg:hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <ul className="space-y-4">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((item, idx) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b py-3 font-display text-2xl font-semibold"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono2 text-xs" style={{ color: "var(--ink-muted)" }}>
                      0{idx + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={socials.email}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <a
                href={socials.theCreators}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                The Creators <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Minimalist Footer ─────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <a href="#home" className="font-display text-lg font-bold tracking-tight">
            Mohit Dangi
          </a>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            Turning Imagination Into Digital Reality · {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: "var(--ink-muted)" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap transition-colors hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="whitespace-nowrap transition-colors hover:text-[var(--ink)]">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
            style={{ borderColor: "var(--border)" }}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
            style={{ borderColor: "var(--border)" }}
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#FF7138]"
            style={{ borderColor: "var(--border)" }}
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.email}
            aria-label="Email Mohit Dangi"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
            style={{ borderColor: "var(--border)" }}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div
        className="mx-auto mt-8 flex max-w-7xl flex-col items-start justify-between gap-2 border-t px-4 pt-6 text-xs sm:flex-row sm:items-center sm:px-6 lg:px-8"
        style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
      >
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <a
          href={`mailto:${profile.email}`}
          className="transition-colors hover:text-[var(--ink)]"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
