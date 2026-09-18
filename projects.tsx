import { Eye, Rocket, Plus, FolderGit2, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/portfolio";
import { Reveal, SectionHeading, TiltCard } from "../components/ui";
import { GithubIcon } from "../components/icons";

const ACCENTS: Record<Project["accent"], { glow: string; border: string; text: string; num: string }> = {
  cyan: { glow: "group-hover:shadow-[0_20px_70px_-20px_rgba(34,211,238,0.45)]", border: "group-hover:border-cyan-400/50", text: "text-cyan-300", num: "text-cyan-400/15 group-hover:text-cyan-400/25" },
  violet: { glow: "group-hover:shadow-[0_20px_70px_-20px_rgba(139,92,246,0.5)]", border: "group-hover:border-violet-400/50", text: "text-violet-300", num: "text-violet-400/15 group-hover:text-violet-400/25" },
  blue: { glow: "group-hover:shadow-[0_20px_70px_-20px_rgba(59,130,246,0.5)]", border: "group-hover:border-blue-400/50", text: "text-blue-300", num: "text-blue-400/15 group-hover:text-blue-400/25" },
  emerald: { glow: "group-hover:shadow-[0_20px_70px_-20px_rgba(52,211,153,0.45)]", border: "group-hover:border-emerald-400/50", text: "text-emerald-300", num: "text-emerald-400/15 group-hover:text-emerald-400/25" },
};

function ProjectButton({
  href,
  icon,
  label,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  const isPlaceholder = href === "#";
  if (isPlaceholder) {
    return (
      <span
        title="Link coming soon — edit in src/data/portfolio.ts"
        className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 px-2 py-2.5 font-mono2 text-[10px] tracking-widest uppercase opacity-60"
        style={{ color: "var(--ink-mute)" }}
      >
        {icon} {label} · Soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? "btn-primary flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 font-mono2 text-[10px] tracking-widest text-white uppercase"
          : "btn-ghost flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 font-mono2 text-[10px] tracking-widest uppercase"
      }
    >
      {icon} {label}
    </a>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-fade relative z-10 scroll-mt-20 py-24 md:py-32" aria-label="Selected projects">
      <div className="absolute top-1/3 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-700/8 blur-[130px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Project Universe"
          title="SELECTED"
          accent="PROJECTS"
          description="Real concepts I'm designing and building — each one a step deeper into software, AI and community."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => {
            const a = ACCENTS[p.accent];
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.1} className="flex">
                <TiltCard className={`glass group relative flex w-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 ${a.border} ${a.glow}`} max={8}>
                  {/* giant index */}
                  <span className={`font-display pointer-events-none absolute -top-3 right-3 text-[92px] leading-none font-bold transition-colors duration-500 ${a.num}`} aria-hidden="true">
                    {p.index}
                  </span>
                  {/* top row */}
                  <div className="mb-5 flex items-center gap-2">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${a.text}`}>
                      <FolderGit2 className="h-5 w-5" />
                    </span>
                    <span className="chip rounded-full px-3 py-1 font-mono2 text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-dim)" }}>
                      {p.status}
                    </span>
                  </div>

                  <p className={`font-mono2 text-[10px] tracking-[0.3em] uppercase ${a.text}`}>Project {p.index}</p>
                  <h3 className="font-display mt-2 text-xl leading-tight font-bold">{p.title}</h3>
                  <p className="mt-1 font-mono2 text-[11px]" style={{ color: "var(--ink-mute)" }}>{p.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>{p.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="chip rounded-md px-2.5 py-1 font-mono2 text-[10px] tracking-wider" style={{ color: "var(--ink-dim)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <ProjectButton href={p.case} primary icon={<Eye className="h-3.5 w-3.5" />} label="View" />
                    <ProjectButton href={p.github} icon={<GithubIcon className="h-3.5 w-3.5" />} label="GitHub" />
                    <ProjectButton href={p.demo} icon={<ArrowUpRight className="h-3.5 w-3.5" />} label="Live" />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}

          {/* future-project placeholder */}
          <Reveal delay={0.3} className="flex md:col-span-2 xl:col-span-1">
            <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-cyan-400/25 bg-cyan-400/[0.02] p-8 text-center transition-all duration-500 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-cyan-400/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Plus className="h-6 w-6 text-cyan-300" />
              </span>
              <h3 className="font-display mt-5 text-lg font-bold">Next Mission Loading…</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed" style={{ color: "var(--ink-mute)" }}>
                New builds ship here as they leave the Future Lab. Have an idea worth building together?
              </p>
              <a href="#contact" className="btn-ghost mt-6 flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest uppercase">
                <Rocket className="h-4 w-4 text-cyan-300" /> Propose a project
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
