import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Trophy, Users, Compass } from "lucide-react";
import { sportsIdentity } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";
import { cn } from "../utils/cn";

const DISCIPLINE_ICONS = {
  lacrosse: Trophy,
  "mini-football": Compass,
  leadership: Users,
} as const;

export function Sports() {
  const [activeId, setActiveId] = useState<string>(sportsIdentity.disciplines[0].id);
  const [imgError, setImgError] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const activeDiscipline =
    sportsIdentity.disciplines.find((d) => d.id === activeId) ?? sportsIdentity.disciplines[0];

  return (
    <section
      id="sports"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="Sports and Leadership"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Sports & Leadership"
          title="BEYOND THE"
          accent="SCREEN."
          accentTone="orange"
          description="Competitive athletics forged my approach to leadership, composure under pressure, and collective team execution."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* ── Left Column: Editorial Athletic Photography Frame ── */}
          <Reveal>
            <div
              ref={photoRef}
              className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border sm:min-h-[460px]"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              {!imgError ? (
                <motion.div
                  style={{ y: reduce ? 0 : imageY }}
                  className="absolute inset-0 scale-105 will-change-transform"
                >
                  <img
                    src={sportsIdentity.image}
                    alt="Competitive lacrosse action under stadium floodlights"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center bg-gradient-to-br from-[#11141C] to-[#08090D] p-8 text-center">
                  <Trophy className="h-12 w-12 text-[#FF7138]" />
                  <p className="font-display mt-4 text-xl font-bold text-white">
                    Rajasthan Lacrosse &amp; Mini Football
                  </p>
                </div>
              )}

              {/* Measured bottom contrast scrim */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/35 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-mono2 text-xs font-medium tracking-[0.18em] text-[#FF7138] uppercase">
                  National-Level Participation
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Lacrosse &amp; Mini Football
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#C5CBD8]">
                  Representing competitive teams on the national stage while leading operations and
                  growth with Rajasthan Lacrosse.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Right Column: Interactive Discipline & Leadership Switcher ── */}
          <div className="flex flex-col justify-between gap-6">
            <Reveal delay={0.08}>
              <div className="space-y-3" role="tablist" aria-label="Sports disciplines">
                {sportsIdentity.disciplines.map((item, idx) => {
                  const selected = item.id === activeId;
                  const Icon =
                    DISCIPLINE_ICONS[item.id as keyof typeof DISCIPLINE_ICONS] ?? Trophy;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        "relative flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7138]",
                        selected
                          ? "border-[#FF7138]/60"
                          : "hover:border-[var(--border-strong)]"
                      )}
                      style={{
                        backgroundColor: selected
                          ? "rgba(255, 113, 56, 0.08)"
                          : "var(--bg-secondary)",
                        borderColor: selected ? "rgba(255, 113, 56, 0.55)" : "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                          style={{
                            borderColor: selected
                              ? "rgba(255, 113, 56, 0.45)"
                              : "var(--border)",
                            backgroundColor: selected
                              ? "rgba(255, 113, 56, 0.14)"
                              : "var(--bg)",
                            color: selected ? "#FF7138" : "var(--ink-muted)",
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-display text-lg font-bold tracking-tight">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <span
                        className="font-mono2 text-xs"
                        style={{ color: selected ? "#FF7138" : "var(--ink-muted)" }}
                      >
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Active Discipline Detail Panel */}
            <Reveal delay={0.14}>
              <div
                className="gradient-border-card rounded-2xl p-6 sm:p-7"
                role="tabpanel"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDiscipline.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono2 text-xs font-medium tracking-[0.16em] text-[#FF7138] uppercase">
                      {activeDiscipline.role}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold tracking-tight">
                      {activeDiscipline.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed sm:text-base"
                      style={{ color: "var(--ink-dim)" }}
                    >
                      {activeDiscipline.summary}
                    </p>

                    <div
                      className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t pt-4 text-xs"
                      style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
                    >
                      {activeDiscipline.metrics.map((m, i) => (
                        <span key={m} className="inline-flex items-center gap-3">
                          <span>{m}</span>
                          {i < activeDiscipline.metrics.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
