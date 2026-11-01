import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Clock } from "lucide-react";
import { experience, education, type TimelineItem } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

function Timeline({ items, icon: Icon, accent }: { items: TimelineItem[]; icon: typeof Briefcase; accent: "cyan" | "violet" }) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.55"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const glow = accent === "cyan" ? "from-cyan-400 to-blue-500" : "from-violet-400 to-fuchsia-500";
  const dot = accent === "cyan" ? "border-cyan-400/60 text-cyan-300" : "border-violet-400/60 text-violet-300";

  return (
    <div ref={listRef} className="relative pl-8 sm:pl-12">
      {/* track */}
      <div className="absolute top-2 bottom-2 left-[13px] w-px sm:left-[19px]" style={{ background: "var(--glass-line)" }} aria-hidden="true" />
      <motion.div
        className={`absolute top-2 bottom-2 left-[13px] w-px origin-top bg-gradient-to-b ${glow} sm:left-[19px]`}
        style={{ scaleY: lineScale, boxShadow: accent === "cyan" ? "0 0 12px #22d3ee" : "0 0 12px #8b5cf6" }}
        aria-hidden="true"
      />

      <div className="space-y-6">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="relative">
              {/* node */}
              <span className={`absolute top-6 -left-8 flex h-7 w-7 items-center justify-center rounded-full border bg-[#070722] sm:-left-12 sm:h-10 sm:w-10 ${dot} dark:bg-[#070722]`} style={{ background: "var(--bg-soft)" }} aria-hidden="true">
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {item.current && (
                  <span className="absolute inset-0 animate-ping rounded-full border border-current opacity-30" />
                )}
              </span>

              <article
                className={`glass card-lift rounded-2xl p-5 sm:p-6 ${item.placeholder ? "border-dashed opacity-90" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono2 text-[9px] tracking-[0.2em] uppercase ${
                      item.current ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" : "border-white/10"
                    }`}
                    style={item.current ? {} : { color: "var(--ink-mute)" }}
                  >
                    <Clock className="h-3 w-3" /> {item.period}
                  </span>
                  {item.placeholder && (
                    <span className="rounded-full border border-dashed border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono2 text-[9px] tracking-[0.2em] text-amber-300 uppercase">
                      Placeholder · to be earned
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-3 text-lg font-bold sm:text-xl">{item.title}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium sm:text-sm" style={{ color: "var(--neon)" }}>
                  <MapPin className="h-3.5 w-3.5" /> {item.org}
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="chip rounded-md px-2.5 py-1 font-mono2 text-[10px] tracking-wider" style={{ color: "var(--ink-dim)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section-fade relative z-10 scroll-mt-20 py-24 md:py-32" aria-label="Experience and education">
      <div className="absolute top-10 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Timeline"
          title="EXPERIENCE &"
          accent="EDUCATION"
          description="Where I've been, what I'm doing now — and honest placeholders for what's next. Nothing invented, everything earned."
        />
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal>
              <h3 className="font-display mb-8 flex items-center gap-3 text-xl font-bold">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10">
                  <Briefcase className="h-5 w-5 text-cyan-300" />
                </span>
                Experience / Achievements
              </h3>
            </Reveal>
            <Timeline items={experience} icon={Briefcase} accent="cyan" />
          </div>
          <div>
            <Reveal>
              <h3 className="font-display mb-8 flex items-center gap-3 text-xl font-bold">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/40 bg-violet-400/10">
                  <GraduationCap className="h-5 w-5 text-violet-300" />
                </span>
                Education
              </h3>
            </Reveal>
            <Timeline items={education} icon={GraduationCap} accent="violet" />
            <Reveal delay={0.2}>
              <div className="glass mt-6 ml-8 rounded-2xl border-dashed p-5 sm:ml-12">
                <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-mute)" }}>
                  {"// upcoming credentials"}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--ink-dim)" }}>
                  Hackathons · Certifications · Awards · Technical competitions — slots reserved. They'll be filled with real results only.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
