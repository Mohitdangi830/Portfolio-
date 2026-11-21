import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import {
  navLinks,
  portfolioSections,
  profile,
  socials,
  type SectionId,
} from "../data/portfolio";
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

/* ── Top Navigation Bar (Clean 3-Zone Contract for Every Section) ──── */
export function Navbar({
  theme,
  onTheme,
  activeSection,
  onNavigate,
}: {
  theme: "dark" | "light";
  onTheme: () => void;
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollSection, setScrollSection] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      if (activeSection !== "home") return;

      let current: SectionId = "home";
      for (const sec of [...portfolioSections].reverse()) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.42) {
          current = sec.id;
          break;
        }
      }
      setScrollSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  const highlightedId = activeSection === "home" ? scrollSection : activeSection;

  function handleNavClick(e: React.MouseEvent, id: SectionId) {
    e.preventDefault();
    setOpen(false);
    onNavigate(id);
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled || activeSection !== "home" ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled || activeSection !== "home" ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled || activeSection !== "home" ? "blur(18px)" : "none",
          borderBottom:
            scrolled || activeSection !== "home"
              ? "1px solid var(--border)"
              : "1px solid transparent",
        }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="font-display shrink-0 text-lg font-bold tracking-tight whitespace-nowrap transition-opacity hover:opacity-80"
          >
            Mohit Dangi
          </a>

          {/* Zone 2: Clean Single-line Links for Every Section */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {navLinks.map((link) => {
              const isActive = highlightedId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={activeSection === link.id ? "page" : undefined}
                    className="group relative py-1 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors"
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

          {/* Zone 3: Theme Switch + Contact Action */}
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
                onClick={(e) => handleNavClick(e, "contact")}
                className="btn-electric inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
                style={
                  activeSection === "contact"
                    ? { backgroundColor: "#FF7138", boxShadow: "0 10px 30px -10px rgba(255,113,56,0.55)" }
                    : undefined
                }
              >
                Contact
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
            className="fixed inset-0 z-[90] flex flex-col justify-between overflow-y-auto px-6 pt-24 pb-10 lg:hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <ul className="space-y-2">
              {portfolioSections.map((sec) => {
                const isCurrent = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      onClick={(e) => handleNavClick(e, sec.id)}
                      className="flex items-center justify-between border-b py-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div>
                        <span
                          className="font-display block text-xl font-semibold"
                          style={{ color: isCurrent ? "var(--accent)" : "var(--ink)" }}
                        >
                          {sec.label}
                        </span>
                        <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                          {sec.tagline}
                        </span>
                      </div>
                      <span className="font-mono2 text-xs" style={{ color: "var(--ink-muted)" }}>
                        {sec.index}
                      </span>
                    </a>
                  </li>
                );
              })}
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

/* ── Section Directory Strip (Quick Jump Cards to Every Dedicated Section) ── */
export function SectionDirectory({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  const chapters = portfolioSections.filter((s) => s.id !== "home");

  return (
    <section
      aria-label="Portfolio sections directory"
      className="relative z-10 border-t py-10"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-band)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono2 text-xs font-medium tracking-[0.18em] uppercase" style={{ color: "var(--ink-muted)" }}>
            Sections Directory · 07 Chapters
          </p>
          <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
            Select any section to open its dedicated view or continue scrolling
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {chapters.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigate(sec.id)}
              className="group flex flex-col justify-between rounded-xl border p-3.5 text-left transition-colors hover:border-[#3987FF]"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono2 text-[11px] font-medium text-[#3987FF]">
                  {sec.index}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3987FF]"
                  style={{ color: "var(--ink-muted)" }}
                />
              </div>
              <div className="mt-3">
                <p className="font-display text-sm font-semibold tracking-tight">{sec.label}</p>
                <p className="mt-0.5 truncate text-[11px]" style={{ color: "var(--ink-muted)" }}>
                  {sec.tagline}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Dedicated Section Page Frame (Header Breadcrumb + Prev/Next Bar) ── */
export function SectionPageFrame({
  activeSection,
  onNavigate,
  children,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  children: ReactNode;
}) {
  const currentIdx = portfolioSections.findIndex((s) => s.id === activeSection);
  const current = portfolioSections[currentIdx] ?? portfolioSections[0];
  const prev = currentIdx > 0 ? portfolioSections[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < portfolioSections.length - 1
      ? portfolioSections[currentIdx + 1]
      : portfolioSections[0];

  return (
    <div className="pt-16">
      {/* Compact Section Header Strip */}
      <div
        className="border-b py-4"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-band)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-[#3987FF]"
            style={{ color: "var(--ink-dim)" }}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-[#3987FF]" />
            All Sections
          </button>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono2 font-semibold text-[#3987FF]">
              {current.index} / 0{portfolioSections.length}
            </span>
            <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>
              ·
            </span>
            <span className="font-display font-semibold">{current.title}</span>
          </div>

          <div className="hidden items-center gap-1.5 md:flex">
            {portfolioSections.map((sec) => {
              const isCurrent = sec.id === activeSection;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onNavigate(sec.id)}
                  title={`${sec.index} · ${sec.label}`}
                  className="rounded-md px-2 py-1 font-mono2 text-[11px] transition-colors"
                  style={{
                    backgroundColor: isCurrent ? "var(--accent)" : "transparent",
                    color: isCurrent ? "#FFFFFF" : "var(--ink-muted)",
                  }}
                >
                  {sec.index}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dedicated Section Content */}
      <div className="min-h-[70vh]">{children}</div>

      {/* Bottom Prev / Next Section Navigation */}
      <div
        className="border-t py-10"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-band)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {prev ? (
            <button
              type="button"
              onClick={() => onNavigate(prev.id)}
              className="group flex items-center justify-between rounded-2xl border p-5 text-left transition-colors hover:border-[#3987FF]"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <div>
                <span className="font-mono2 text-[11px] uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                  Previous · {prev.index}
                </span>
                <p className="font-display mt-1 text-lg font-bold">{prev.title}</p>
              </div>
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-[#3987FF]" />
            </button>
          ) : (
            <div />
          )}

          {next && (
            <button
              type="button"
              onClick={() => onNavigate(next.id)}
              className="group flex items-center justify-between rounded-2xl border p-5 text-left transition-colors hover:border-[#3987FF]"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <div>
                <span className="font-mono2 text-[11px] uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                  Next · {next.index}
                </span>
                <p className="font-display mt-1 text-lg font-bold">{next.title}</p>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#3987FF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Floating Right-Edge Section Index Rail (Desktop Full View) ────── */
export function SectionRail({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  const [currentId, setCurrentId] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => {
      let active: SectionId = "home";
      for (const sec of [...portfolioSections].reverse()) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          active = sec.id;
          break;
        }
      }
      setCurrentId(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      aria-label="Section index"
      className="fixed top-1/2 right-5 z-[80] hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
    >
      {portfolioSections.map((sec) => {
        const active = currentId === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => {
              const el = document.getElementById(sec.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                onNavigate(sec.id);
              }
            }}
            className="group flex items-center gap-2.5 py-0.5 text-right focus-visible:outline-none"
            title={`${sec.index} · ${sec.label}`}
          >
            <span
              className="font-mono2 text-[10px] tracking-wider uppercase transition-opacity duration-200"
              style={{
                color: active ? "var(--ink)" : "var(--ink-muted)",
                opacity: active ? 1 : 0,
              }}
            >
              {sec.label}
            </span>
            <span
              className="block h-[2px] rounded-full transition-all duration-200 group-hover:w-6 group-hover:bg-[#3987FF]"
              style={{
                width: active ? 24 : 12,
                backgroundColor: active ? "#3987FF" : "var(--border-strong)",
              }}
            />
          </button>
        );
      })}
    </aside>
  );
}

/* ── Minimalist Footer ─────────────────────────────────────────────── */
export function Footer({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            className="font-display text-lg font-bold tracking-tight"
          >
            Mohit Dangi
          </a>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            Turning Imagination Into Digital Reality · {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--ink-muted)" }}>
          {portfolioSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(sec.id);
              }}
              className="whitespace-nowrap transition-colors hover:text-[var(--ink)]"
            >
              {sec.label}
            </a>
          ))}
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
        <span>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </span>
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-[var(--ink)]">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
