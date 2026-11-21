import { ArrowUpRight, Globe, Smartphone, Terminal, PenTool, Film, Layers } from "lucide-react";
import { creatorsData } from "../data/portfolio";
import { Magnetic, Reveal, SectionHeading, TiltCard } from "../components/ui";

const SERVICE_ICONS = [Globe, Smartphone, Terminal, PenTool, Film, Layers];

export function Creators() {
  return (
    <section
      id="creators"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="The Creators Digital Development Initiative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Venture · Digital Development Initiative"
            title="IDEAS DESERVE"
            accent="TO BE BUILT."
            description={creatorsData.description}
          />

          <Reveal delay={0.1} className="lg:mb-16">
            <Magnetic strength={0.2}>
              <a
                href={creatorsData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap"
              >
                Explore The Creators
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Studio Capabilities Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creatorsData.services.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            const accentColor = idx % 2 === 0 ? "#3987FF" : "#FF7138";

            return (
              <Reveal key={service.number} delay={idx * 0.05} y={18}>
                <TiltCard
                  max={5}
                  className="gradient-border-card flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--bg)",
                          color: accentColor,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className="font-mono2 text-xs font-medium"
                        style={{ color: accentColor }}
                      >
                        {service.number}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {service.detail}
                    </p>
                  </div>

                  <div
                    className="mt-6 flex items-center justify-between border-t pt-4 text-xs"
                    style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
                  >
                    <span>The Creators Studio</span>
                    <a
                      href={creatorsData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium transition-colors hover:text-[var(--ink)]"
                      style={{ color: accentColor }}
                    >
                      Inquire
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
