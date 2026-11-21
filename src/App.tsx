import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Preloader, Navbar, Footer } from "./components/layout";
import {
  CustomCursor,
  ParticleField,
  MouseLight,
  ScrollProgress,
  BackToTop,
} from "./components/background";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Expertise } from "./sections/expertise";
import { Projects } from "./sections/projects";
import { Journey } from "./sections/journey";
import { Sports } from "./sections/sports";
import { Creators } from "./sections/creators";
import { Contact } from "./sections/contact";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("md-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* private mode */
  }
  return "dark";
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    try {
      localStorage.setItem("md-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  const finishBoot = useCallback(() => setBooted(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:rounded-lg focus:bg-[#3987FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <AnimatePresence>{!booted && <Preloader onDone={finishBoot} />}</AnimatePresence>

        <CustomCursor />
        <MouseLight />
        <ParticleField />
        <ScrollProgress />

        <Navbar
          theme={theme}
          onTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        />

        <main className="relative z-10">
          <Hero />
          <About />
          <Expertise />
          <Projects />
          <Journey />
          <Sports />
          <Creators />
          <Contact />
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
