import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { aboutPillars, profile, socials } from "../data/portfolio";
import { Reveal, SectionHeading, TiltCard } from "../components/ui";

export function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="About Mohit Dangi"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          {/* ── Left Column: Editorial Bio & Identity ── */}
          <div>
            <SectionHeading
              kicker="About Me"
              title="A LITTLE ABOUT"
              accent="MY WORLD."
            />

            <Reveal delay={0.14}>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                <p>
                  I&apos;m <strong className="font-semibold" style={{ color: "var(--ink)" }}>Mohit Dangi</strong> — a
                  technology enthusiast, software and web developer, and creative problem solver based in{" "}
                  <span style={{ color: "var(--ink)" }}>{profile.location}</span>.
                </p>
                <p>
                  As the founder of{" "}
                  <a
                    href={socials.theCreators}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium underline decoration-[#3987FF]/50 underline-offset-4 transition-colors hover:text-[#3987FF]"
                    style={{ color: "var(--ink)" }}
                  >
                    The Creators
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  , I focus on turning ideas into clean, scalable digital products — from web platforms and
                  desktop AI utilities to brand systems and interactive visuals.
                </p>
                <p>
                  Away from the code editor, competitive sport shapes how I lead. Through{" "}
                  <span style={{ color: "var(--ink)" }}>Rajasthan Lacrosse</span> and national-level participation in
                  Lacrosse and Mini Football, I&apos;ve learned how discipline, teamwork, and composed execution under
                  pressure drive lasting impact.
                </p>
              </div>
            </Reveal>

            {/* Clean unboxed metadata strip */}
            <Reveal delay={0.2}>
              <div
                className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
              >
                <span>{profile.education}</span>
                <span aria-hidden="true">·</span>
                <span>State Team Manager, Rajasthan Lacrosse</span>
                <span aria-hidden="true">·</span>
                <span>Passionate about Innovation</span>
              </div>
            </Reveal>

            {/* Editorial Profile Photograph Frame */}
            <Reveal delay={0.24}>
              <div
                className="mt-8 flex items-center gap-5 rounded-2xl border p-4"
                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
              >
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                >
                  {!imgError ? (
                    <img
                      src={profile.profilePhoto}
                      alt="Mohit Dangi digital monogram"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-xl font-bold" style={{ color: "var(--accent)" }}>
                      MD
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-display text-base font-semibold">{profile.name}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
                    {profile.floatingStatement}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Asymmetric Animated Information Cards ── */}
          <div className="grid gap-5 sm:grid-cols-2 lg:pt-8">
            {aboutPillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 0.08} className={i % 2 === 1 ? "sm:translate-y-6" : ""}>
                <TiltCard
                  max={5}
                  className="gradient-border-card flex h-full flex-col justify-between rounded-2xl p-6"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="font-mono2 font-medium"
                        style={{ color: pillar.accent === "orange" ? "#FF7138" : "var(--accent)" }}
                      >
                        {pillar.index}
                      </span>
                      <span style={{ color: "var(--ink-muted)" }}>{pillar.subtitle}</span>
                    </div>
                    <h3 className="font-display mt-5 text-xl font-bold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                      {pillar.description}
                    </p>
                  </div>

                  <p
                    className="mt-6 border-t pt-4 text-xs leading-relaxed"
                    style={{ borderColor: "var(--border)", color: "var(--ink-dim)" }}
                  >
                    {pillar.detail}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
