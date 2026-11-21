import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Terminal,
  Layers,
  PenTool,
  Film,
  Box,
  Cpu,
} from "lucide-react";
import {
  expertiseItems,
  type ExpertiseCategory,
  type ExpertiseItem,
} from "../data/portfolio";
import { Reveal, SectionHeading } from "../components/ui";

const CATEGORIES: ExpertiseCategory[] = [
  "All",
  "Engineering",
  "Design & Media",
  "Emerging Tech",
];

const ICON_MAP: Record<ExpertiseItem["iconKey"], typeof Globe> = {
  web: Globe,
  app: Smartphone,
  software: Terminal,
  uiux: Layers,
  graphic: PenTool,
  video: Film,
  creative: Box,
  ai: Cpu,
};

/* ── Unique Layered 3D-Styled Geometric Icon Component ─────────────── */
function Icon3D({
  iconKey,
  accent,
  active,
}: {
  iconKey: ExpertiseItem["iconKey"];
  accent: "blue" | "orange";
  active: boolean;
}) {
  const Icon = ICON_MAP[iconKey];
  const color = accent === "orange" ? "#FF7138" : "#3987FF";
  const bg = accent === "orange" ? "rgba(255, 113, 56, 0.12)" : "rgba(57, 135, 255, 0.12)";

  return (
    <div className="relative h-12 w-12 [perspective:400px]" aria-hidden="true">
      {/* Back extruded layer */}
      <div
        className="absolute inset-0 rounded-xl border transition-transform duration-300"
        style={{
          borderColor: active ? color : "var(--border)",
          backgroundColor: bg,
          transform: active
            ? "translate3d(4px, 4px, -10px) rotateX(10deg) rotateY(-10deg)"
            : "translate3d(3px, 3px, -8px)",
        }}
      />
      {/* Front primary face */}
      <div
        className="relative flex h-full w-full items-center justify-center rounded-xl border transition-transform duration-300"
        style={{
          borderColor: active ? color : "var(--border-strong)",
          backgroundColor: "var(--bg)",
          transform: active ? "translate3d(-2px, -2px, 8px)" : "translate3d(0, 0, 0)",
        }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
    </div>
  );
}

export function Expertise() {
  const [filter, setFilter] = useState<ExpertiseCategory>("All");
  const [selectedId, setSelectedId] = useState<string>(expertiseItems[0].id);

  const visibleItems =
    filter === "All"
      ? expertiseItems
      : expertiseItems.filter((item) => item.category === filter);

  const activeItem =
    expertiseItems.find((item) => item.id === selectedId) ?? visibleItems[0] ?? expertiseItems[0];

  return (
    <section
      id="expertise"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="My Expertise"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="My Expertise"
            title="CAPABILITIES &"
            accent="CRAFT."
            description="A multidisciplinary toolkit spanning full-stack software, design systems, visual media, and applied AI."
          />

          {/* Interactive Category Filter Controls */}
          <div
            className="mb-12 inline-flex flex-wrap items-center gap-1 rounded-xl border p-1 md:mb-16"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            role="tablist"
            aria-label="Filter skills by discipline"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(cat)}
                  className="rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors"
                  style={{
                    backgroundColor: isSelected ? "var(--accent)" : "transparent",
                    color: isSelected ? "#FFFFFF" : "var(--ink-muted)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Interactive Skills Visualization Spotlight ── */}
        <Reveal delay={0.08}>
          <div
            className="mb-10 grid gap-6 rounded-2xl border p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div>
              <p className="font-mono2 text-xs uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                Interactive Capability Spectrum · Select any card below
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold">{activeItem.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                {activeItem.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: "var(--ink-dim)" }}>
                {activeItem.capabilities.map((cap, idx) => (
                  <span key={cap} className="inline-flex items-center gap-3">
                    <span>{cap}</span>
                    {idx < activeItem.capabilities.length - 1 && (
                      <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive bar chart visualization across all 8 skills */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-2">
              {expertiseItems.map((item) => {
                const isActive = item.id === activeItem.id;
                const barColor = item.accent === "orange" ? "#FF7138" : "#3987FF";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className="group text-left focus-visible:outline-none"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="truncate font-medium transition-colors"
                        style={{ color: isActive ? "var(--ink)" : "var(--ink-muted)" }}
                      >
                        {item.title}
                      </span>
                      <span className="font-mono2 ml-2 shrink-0 text-[11px]" style={{ color: barColor }}>
                        {item.focusScore}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.focusScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full transition-opacity"
                        style={{
                          backgroundColor: barColor,
                          opacity: isActive ? 1 : 0.45,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── 8 Expertise Cards Grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item, idx) => {
            const isSelected = item.id === activeItem.id;
            const accentHex = item.accent === "orange" ? "#FF7138" : "#3987FF";
            return (
              <Reveal key={item.id} delay={(idx % 4) * 0.06} className="flex">
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setSelectedId(item.id)}
                  className="gradient-border-card group flex w-full flex-col justify-between rounded-2xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3987FF]"
                  style={{
                    borderColor: isSelected ? accentHex : undefined,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Icon3D iconKey={item.iconKey} accent={item.accent} active={isSelected} />
                      <span className="font-mono2 text-xs" style={{ color: "var(--ink-muted)" }}>
                        0{expertiseItems.indexOf(item) + 1}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-lg font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Interactive visual micro-element: animated focus pulse strip */}
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between text-xs" style={{ color: "var(--ink-dim)" }}>
                      <span className="truncate">{item.capabilities[0]}</span>
                      <span className="font-mono2 shrink-0 text-[11px]" style={{ color: accentHex }}>
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-2.5 flex gap-1">
                      {[0, 1, 2, 3, 4].map((step) => {
                        const filled = step < Math.round(item.focusScore / 20);
                        return (
                          <span
                            key={step}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: filled ? accentHex : "var(--border)",
                              opacity: filled ? (isSelected ? 1 : 0.6) : 0.5,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
