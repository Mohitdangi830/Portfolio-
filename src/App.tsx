import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader, Navbar, Footer } from "./components/layout";
import { CustomCursor, ParticleField, MouseLight, ScrollProgress, BackToTop } from "./components/background";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Skills } from "./sections/skills";
import { Projects } from "./sections/projects";
import { Journey } from "./sections/journey";
import { FutureLab } from "./sections/future";
import { Contact } from "./sections/contact";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("md-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* private mode */ }
  return "dark"; // futuristic dark is the primary theme
}

function getInitialMotion(): boolean {
  try {
    const saved = localStorage.getItem("md-motion");
    if (saved === "reduced") return true;
    if (saved === "full") return false;
  } catch { /* ignore */ }
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lowMotion, setLowMotion] = useState(getInitialMotion);

  // apply theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    try {
      localStorage.setItem("md-theme", theme);
    } catch { /* ignore */ }
  }, [theme]);

  // apply motion preference
  useEffect(() => {
    document.documentElement.classList.toggle("reduced-motion", lowMotion);
    try {
      localStorage.setItem("md-motion", lowMotion ? "reduced" : "full");
    } catch { /* ignore */ }
  }, [lowMotion]);

  // lock scroll during boot
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  const finishBoot = useCallback(() => setBooted(true), []);

  return (
    <div className="relative min-h-screen">
      {/* skip link for accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      <AnimatePresence>{!booted && <Preloader onDone={finishBoot} />}</AnimatePresence>

      {/* ambient layers */}
      <CustomCursor />
      <MouseLight />
      <ParticleField />
      <ScrollProgress />

      <Navbar
        theme={theme}
        onTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        lowMotion={lowMotion}
        onLowMotion={() => setLowMotion((m) => !m)}
      />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <FutureLab />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}
