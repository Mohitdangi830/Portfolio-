import { motion } from "framer-motion";
import { Brain, Mic, LayoutDashboard, Code2, Zap, Orbit, FlaskConical, Plus } from "lucide-react";
import { futureLab } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

const LAB_ICONS: Record<string, typeof Brain> = {
  brain: Brain,
  mic: Mic,
  layout: LayoutDashboard,
  code: Code2,
  zap: Zap,
  orbit: Orbit,
};

export function FutureLab() {
  return (
    <section id="lab" className="section-fade relative z-10 scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="Future lab — currently exploring">
      {/* lab ambience */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-drift absolute top-0 left-1/4 h-72 w-[560px] rounded-full bg-cyan-600/8 blur-[110px]" />
        <div className="animate-drift absolute right-1/4 bottom-0 h-72 w-[560px] rounded-full bg-violet-700/10 blur-[110px]" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Experimental Zone"
          title="FUTURE"
          accent="LAB"
          description="Technologies I'm actively learning and prototyping. Bars show learning effort in progress — not mastery claims."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futureLab.map((item, i) => {
            const Icon = LAB_ICONS[item.icon] ?? FlaskConical;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.09} className="flex">
                <div className="glass card-lift group relative flex-1 overflow-hidden rounded-3xl p-6">
                  <div className="scanline opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 to-violet-600/15 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="h-6 w-6 text-cyan-300" />
                      <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-cyan-400/40" aria-hidden="true" />
                    </span>
                    <span className="chip rounded-full px-3 py-1 font-mono2 text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--neon)" }}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 min-h-[42px] text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>{item.description}</p>
                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between font-mono2 text-[10px] tracking-widest uppercase" style={{ color: "var(--ink-mute)" }}>
                      <span>Exploration</span>
                      <span className="text-cyan-300">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                        style={{ boxShadow: "0 0 12px rgba(34,211,238,0.6)" }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* add-new hint card */}
          <Reveal delay={0.25} className="flex sm:col-span-2 lg:col-span-1">
            <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-violet-400/25 bg-violet-500/[0.03] p-6 text-center transition-colors duration-500 hover:border-violet-400/50">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-violet-400/40">
                <Plus className="h-5 w-5 text-violet-300" />
              </span>
              <p className="font-display mt-4 font-bold">Always expanding</p>
              <p className="mt-1 font-mono2 text-[11px]" style={{ color: "var(--ink-mute)" }}>
                New lab tracks plug in via one data file.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
