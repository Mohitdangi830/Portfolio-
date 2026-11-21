import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { journeyMilestones } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

export function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 82%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 28 });

  return (
    <section
      id="journey"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="Experience and Achievements"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Experience & Achievements"
          title="MILESTONES &"
          accent="IMPACT."
          description="Building digital products, leading teams on the field, and growing from foundational computer science toward real-world systems."
        />

        <div ref={railRef} className="relative pl-7 sm:pl-12">
          {/* Static background timeline track */}
          <div
            className="absolute top-2 bottom-2 left-[7px] w-[1.5px] sm:left-[15px]"
            style={{ backgroundColor: "var(--border)" }}
            aria-hidden="true"
          />

          {/* Scroll-driven animated progress line */}
          <motion.div
            className="absolute top-2 bottom-2 left-[7px] w-[1.5px] origin-top sm:left-[15px]"
            style={{
              scaleY: reduce ? 1 : scaleY,
              background: "linear-gradient(180deg, #3987FF 0%, #FF7138 100%)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {journeyMilestones.map((item, idx) => {
              const isOrange = item.accent === "orange";
              const accentHex = isOrange ? "#FF7138" : "#3987FF";

              return (
                <Reveal key={`${item.title}-${item.organization}`} delay={idx * 0.06} y={20}>
                  <div className="relative">
                    {/* Timeline node dot */}
                    <span
                      className="absolute top-7 -left-[25px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 sm:-left-[37px]"
                      style={{
                        borderColor: accentHex,
                        backgroundColor: "var(--bg)",
                        boxShadow: `0 0 14px ${isOrange ? "rgba(255,113,56,0.45)" : "rgba(57,135,255,0.45)"}`,
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: accentHex }}
                      />
                    </span>

                    <article className="gradient-border-card rounded-2xl p-6 sm:p-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                          <span
                            className="font-mono2 font-medium tracking-[0.14em] uppercase"
                            style={{ color: accentHex }}
                          >
                            {item.period}
                          </span>
                          <span aria-hidden="true" style={{ color: "var(--ink-muted)" }}>
                            ·
                          </span>
                          <span style={{ color: "var(--ink-muted)" }}>{item.category}</span>
                        </div>
                        <span
                          className="font-mono2 text-xs"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: "var(--ink-dim)" }}>
                          {item.organization}
                        </p>
                      </div>

                      <p
                        className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {item.description}
                      </p>

                      <div
                        className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t pt-4 text-xs"
                        style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
                      >
                        {item.tags.map((tag, tagIdx) => (
                          <span key={tag} className="inline-flex items-center gap-3">
                            <span>{tag}</span>
                            {tagIdx < item.tags.length - 1 && (
                              <span aria-hidden="true">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
