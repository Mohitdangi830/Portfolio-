import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Preloader,
  Navbar,
  Footer,
  SectionDirectory,
  SectionPageFrame,
  SectionRail,
} from "./components/layout";
import {
  CustomCursor,
  ParticleField,
  MouseLight,
  ScrollProgress,
  BackToTop,
} from "./components/background";
import { portfolioSections, type SectionId } from "./data/portfolio";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Expertise } from "./sections/expertise";
import { Projects } from "./sections/projects";
import { Journey } from "./sections/journey";
import { Sports } from "./sections/sports";
import { Creators } from "./sections/creators";
import { Contact } from "./sections/contact";

type Theme = "dark" | "light";

const VALID_SECTIONS = new Set<SectionId>(portfolioSections.map((s) => s.id));

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("md-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* private mode */
  }
  return "dark";
}

function getSectionFromHash(): SectionId {
  try {
    const raw = window.location.hash.replace(/^#/, "") as SectionId;
    if (VALID_SECTIONS.has(raw)) return raw;
  } catch {
    /* ignore */
  }
  return "home";
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

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

  useEffect(() => {
    const syncSection = () => {
      const next = getSectionFromHash();
      setActiveSection(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", syncSection);
    window.addEventListener("popstate", syncSection);
    return () => {
      window.removeEventListener("hashchange", syncSection);
      window.removeEventListener("popstate", syncSection);
    };
  }, []);

  const navigateToSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    try {
      const targetHash = id === "home" ? "#home" : `#${id}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, "", targetHash);
      }
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const finishBoot = useCallback(() => setBooted(true), []);

  function renderDedicatedSection(id: Exclude<SectionId, "home">) {
    switch (id) {
      case "about":
        return <About />;
      case "expertise":
        return <Expertise />;
      case "projects":
        return <Projects />;
      case "journey":
        return <Journey />;
      case "sports":
        return <Sports />;
      case "creators":
        return <Creators />;
      case "contact":
        return <Contact />;
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection("home");
          }}
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
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        {activeSection === "home" && <SectionRail onNavigate={navigateToSection} />}

        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {activeSection === "home" ? (
              <motion.div
                key="home-overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero onNavigate={navigateToSection} />
                <SectionDirectory onNavigate={navigateToSection} />
                <div>
                  <About />
                </div>
                <div style={{ backgroundColor: "var(--bg-band)" }}>
                  <Expertise />
                </div>
                <div>
                  <Projects />
                </div>
                <div style={{ backgroundColor: "var(--bg-band)" }}>
                  <Journey />
                </div>
                <div>
                  <Sports />
                </div>
                <div style={{ backgroundColor: "var(--bg-band)" }}>
                  <Creators />
                </div>
                <div>
                  <Contact />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`section-${activeSection}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionPageFrame
                  activeSection={activeSection}
                  onNavigate={navigateToSection}
                >
                  {renderDedicatedSection(activeSection)}
                </SectionPageFrame>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <div className="relative z-10">
          <Footer onNavigate={navigateToSection} />
        </div>
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
