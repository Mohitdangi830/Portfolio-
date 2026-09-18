import { motion } from "framer-motion";
import { Terminal, Globe, Wrench, Users, Cpu, Hexagon } from "lucide-react";
import { skillCategories, type SkillLevel } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

const CATEGORY_ICONS: Record<string, typeof Terminal> = {
  terminal: Terminal,
  globe: Globe,
  wrench: Wrench,
  users: Users,
};

const LEVEL_STYLE: Record<SkillLevel, string> = {
  Core: "border-cyan-400/50 text-cyan-300 bg-cyan-400/10",
  Comfortable: "border-blue-400/40 text-blue-300 bg-blue-400/10",
  Building: "border-violet-400/40 text-violet-300 bg-violet-400/10",
  Learning: "border-white/15 text-white/60 bg-white/5",
};

export function Skills() {
  return (
    <section id="skills" className="section-fade relative z-10 scroll-mt-20 py-24 md:py-32" aria-label="Technical skills">
      {/* ambient */}
      <div className="absolute top-20 -left-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[110px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Technology Matrix"
          title="TECH"
          accent="STACK"
          description="No fake percentages — just the tools I'm genuinely learning and building with, grouped by craft."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((cat, ci) => {
            const Icon = CATEGORY_ICONS[cat.icon] ?? Cpu;
            return (
              <Reveal key={cat.id} delay={ci * 0.09} className="flex">
                <div className="glass card-lift group relative flex-1 overflow-hidden rounded-3xl p-6">
                  {/* hover glow wash */}
                  <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/0 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/15" aria-hidden="true" />
                  <div className="relative mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 to-violet-600/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-wide">{cat.title}</h3>
                      <p className="font-mono2 text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-mute)" }}>
                        Module 0{ci + 1}
                      </p>
                    </div>
                  </div>
                  <p className="relative mb-5 text-xs leading-relaxed" style={{ color: "var(--ink-mute)" }}>{cat.description}</p>
                  <ul className="relative space-y-2.5">
                    {cat.skills.map((s, si) => (
                      <motion.li
                        key={s.name}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.08 + si * 0.07, duration: 0.4 }}
                        className="group/skill flex items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/5"
                      >
                        <span className="flex items-center gap-2.5 text-sm font-medium">
                          <Hexagon className="h-3.5 w-3.5 text-cyan-400/60 transition-all duration-300 group-hover/skill:text-cyan-300 group-hover/skill:drop-shadow-[0_0_6px_#22d3ee]" />
                          {s.name}
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 font-mono2 text-[9px] tracking-widest uppercase ${LEVEL_STYLE[s.level]}`}>
                          {s.level}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ticker */}
        <Reveal delay={0.2}>
          <div className="glass mt-10 overflow-hidden rounded-2xl py-4" aria-hidden="true">
            <div className="ticker-track flex w-max items-center gap-8 pr-8 font-mono2 text-xs tracking-[0.3em] uppercase" style={{ color: "var(--ink-mute)" }}>
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ["C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "Git", "GitHub", "VS Code", "Problem Solving", "Leadership"].map((t, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
                    {t} <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
                  </span>
                ))
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
