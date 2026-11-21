import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  X,
  Check,
  Layers,
  LayoutGrid,
  MoveHorizontal,
} from "lucide-react";
import { featuredProjects, type ProjectItem } from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

/* ── Bespoke Visual Previews for Agency & Sports Platforms ─────────── */
function AgencyPreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0B0E16] p-6 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-35 blur-3xl"
        style={{ background: "#3987FF" }}
      />
      <div className="relative flex items-center justify-between text-xs text-[#9299A8]">
        <span className="font-display font-semibold text-white">The Creators</span>
        <span className="font-mono2">thecreators-studio.vercel.app</span>
      </div>
      <div className="relative my-auto py-4">
        <p className="font-mono2 text-[11px] text-[#3987FF]">DIGITAL DEVELOPMENT INITIATIVE</p>
        <h4 className="font-display mt-2 text-2xl leading-tight font-bold">
          Ideas Deserve To Be Built.
        </h4>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-[#C5CBD8]">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">Web Platforms</div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">App Builds</div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">Brand &amp; Video</div>
        </div>
      </div>
      <div className="relative flex items-center justify-between border-t border-white/10 pt-3 text-xs text-[#9299A8]">
        <span>Founded by Mohit Dangi</span>
        <span className="text-[#FF7138]">Production Live</span>
      </div>
    </div>
  );
}

function SportsPlatformPreview() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0E1118] p-6 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ background: "#FF7138" }}
      />
      <div className="relative flex items-center justify-between text-xs text-[#9299A8]">
        <span className="font-display font-semibold text-white">Rajasthan Lacrosse</span>
        <span className="font-mono2 text-[#FF7138]">STATE HUB</span>
      </div>
      <div className="relative my-auto space-y-3 py-3">
        <h4 className="font-display text-2xl leading-tight font-bold">
          Association &amp; Athlete Portal
        </h4>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[#9299A8]">Squad Operations</p>
            <p className="mt-1 font-semibold text-white">Schedules &amp; Rosters</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[#9299A8]">Pathway</p>
            <p className="mt-1 font-semibold text-white">Grassroots Development</p>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between border-t border-white/10 pt-3 text-xs text-[#9299A8]">
        <span>Sports Digital Platform</span>
        <span className="text-[#3987FF]">Responsive UI</span>
      </div>
    </div>
  );
}

function ProjectPreviewMedia({ project }: { project: ProjectItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (project.previewType === "agency") return <AgencyPreview />;
  if (project.previewType === "sports") return <SportsPlatformPreview />;

  if (project.image && !imgFailed) {
    return (
      <img
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#11141C] p-6 text-center">
      <Layers className="h-8 w-8 text-[#3987FF]" />
      <p className="font-display mt-3 text-lg font-bold text-white">{project.title}</p>
      <p className="mt-1 text-xs text-[#9299A8]">{project.subtitle}</p>
    </div>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [layoutMode, setLayoutMode] = useState<"scroll" | "grid">("scroll");
  const [modalProject, setModalProject] = useState<{
    project: ProjectItem;
    tab: "case" | "demo";
  } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function scrollTrack(direction: -1 | 1) {
    if (!trackRef.current) return;
    const step = Math.min(540, trackRef.current.clientWidth * 0.85);
    trackRef.current.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="Featured Projects"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Featured Projects"
            title="SELECTED"
            accent="WORKS."
            description="Editorial products, AI utilities, and digital platforms built to solve real problems with clean engineering."
          />

          {/* Horizontal Scroll / Grid Controls */}
          <div className="mb-12 flex items-center gap-2 md:mb-16">
            <div
              className="inline-flex items-center gap-1 rounded-xl border p-1"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <button
                type="button"
                onClick={() => setLayoutMode("scroll")}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors"
                style={{
                  backgroundColor: layoutMode === "scroll" ? "var(--accent)" : "transparent",
                  color: layoutMode === "scroll" ? "#FFFFFF" : "var(--ink-muted)",
                }}
              >
                <MoveHorizontal className="h-3.5 w-3.5" />
                Horizontal
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors"
                style={{
                  backgroundColor: layoutMode === "grid" ? "var(--accent)" : "transparent",
                  color: layoutMode === "grid" ? "#FFFFFF" : "var(--ink-muted)",
                }}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Grid
              </button>
            </div>

            {layoutMode === "scroll" && (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollTrack(-1)}
                  aria-label="Scroll projects left"
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(1)}
                  aria-label="Scroll projects right"
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Project Gallery (Horizontal Scroll Track or Grid) ── */}
      {layoutMode === "scroll" ? (
        <div
          ref={trackRef}
          className="no-scrollbar mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8"
        >
          {featuredProjects.map((project, idx) => (
            <Reveal
              key={project.id}
              delay={idx * 0.06}
              className="w-[86vw] shrink-0 snap-start sm:w-[460px] lg:w-[520px]"
            >
              <ProjectCard
                project={project}
                onOpenModal={(tab) => setModalProject({ project, tab })}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.06} className={idx === 0 ? "md:col-span-2" : ""}>
              <ProjectCard
                project={project}
                onOpenModal={(tab) => setModalProject({ project, tab })}
              />
            </Reveal>
          ))}
        </div>
      )}

      {/* ── Case Study & Interactive Preview Modal ── */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${modalProject.project.title} details`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border p-6 sm:p-8"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-strong)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="font-mono2 text-xs uppercase tracking-wider"
                    style={{
                      color: modalProject.project.accent === "orange" ? "#FF7138" : "var(--accent)",
                    }}
                  >
                    {modalProject.project.index} · {modalProject.project.category}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold sm:text-3xl">
                    {modalProject.project.title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
                    {modalProject.project.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  aria-label="Close modal"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-[#3987FF]"
                  style={{ borderColor: "var(--border)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Large Modal Preview */}
              <div
                className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border"
                style={{ borderColor: "var(--border)" }}
              >
                <ProjectPreviewMedia project={modalProject.project} />
              </div>

              {/* Case Study Details */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                    Overview
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                    {modalProject.project.caseStudy.overview}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                    Challenge &amp; Solution
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                    {modalProject.project.caseStudy.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
                <h4 className="font-display text-sm font-semibold">Key Architecture Highlights</h4>
                <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--ink-dim)" }}>
                  {modalProject.project.caseStudy.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3987FF]" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t pt-5" style={{ borderColor: "var(--border)" }}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: "var(--ink-muted)" }}>
                  {modalProject.project.tech.map((t, i) => (
                    <span key={t} className="inline-flex items-center gap-3">
                      <span>{t}</span>
                      {i < modalProject.project.tech.length - 1 && <span aria-hidden="true">·</span>}
                    </span>
                  ))}
                </div>

                {modalProject.project.liveUrl ? (
                  <a
                    href={modalProject.project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={() => setModalProject(null)}
                    className="btn-outline inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Request Architecture Walkthrough
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  onOpenModal,
}: {
  project: ProjectItem;
  onOpenModal: (tab: "case" | "demo") => void;
}) {
  const accentColor = project.accent === "orange" ? "#FF7138" : "var(--accent)";

  return (
    <article className="gradient-border-card group flex h-full flex-col overflow-hidden rounded-3xl">
      {/* Project Preview */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
      >
        <ProjectPreviewMedia project={project} />
      </div>

      {/* Editorial Copy */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center gap-2.5 text-xs" style={{ color: "var(--ink-muted)" }}>
            <span className="font-mono2 font-semibold" style={{ color: accentColor }}>
              {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.category}</span>
          </div>

          <h3 className="font-display mt-3 text-xl font-bold tracking-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm font-medium" style={{ color: accentColor }}>
            {project.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {project.description}
          </p>

          {/* Unboxed Tech Metadata */}
          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs" style={{ color: "var(--ink-dim)" }}>
            {project.tech.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-2.5">
                <span>{t}</span>
                {i < project.tech.length - 1 && (
                  <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Action Row: Live Demo & Case Study (only for The Creators) */}
        {project.liveUrl && (
          <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-electric inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onOpenModal("case")}
              className="btn-outline inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Case Study
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
