import { motion } from "framer-motion";
import { GraduationCap, MapPin, Trophy, Heart, Target, User } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal, SectionHeading, TiltCard } from "../components/ui";

const CARDS = [
  { icon: GraduationCap, label: "Education", value: profile.education, sub: profile.school },
  { icon: MapPin, label: "Location", value: profile.location, sub: "Open to remote & on-site" },
  { icon: Trophy, label: "Current Role", value: profile.currentRole, sub: "Leadership in sports" },
  { icon: Target, label: "Career Goal", value: "Software developer + international lacrosse player", sub: "Code by day, train by evening" },
];

const CUBE_FACES = ["C", "C++", "PY", "JS", "MD", "AI"];

export function About() {
  return (
    <section id="about" className="section-fade relative z-10 scroll-mt-20 py-24 md:py-32" aria-label="About Mohit Dangi">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Digital Identity"
          title="WHO"
          accent="AM I?"
          description="A developer in the making — blending classroom computer science, self-driven building, and real-world leadership from sport."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── Rotating tech element + identity card ── */}
          <Reveal className="flex">
            <TiltCard className="glass-strong hud-corner relative flex w-full flex-col items-center overflow-hidden rounded-3xl p-8 text-center" max={7}>
              <div className="scanline" aria-hidden="true" />
              {/* avatar */}
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-600/30 blur-xl" aria-hidden="true" />
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={`${profile.name} — profile photo`}
                    loading="lazy"
                    className="relative h-28 w-28 rounded-full border-2 border-cyan-400/60 object-cover"
                  />
                ) : (
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-violet-600/20 font-display text-3xl font-bold text-cyan-200">
                    MD
                    <span className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/50 bg-[#030014]">
                      <User className="h-4 w-4 text-emerald-400" />
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-display text-2xl font-bold tracking-wide">{profile.name.toUpperCase()}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--neon)" }}>{profile.primaryTitle}</p>

              {/* CSS 3D rotating cube */}
              <div className="cube-scene mt-8 mb-2 flex h-36 w-36 items-center justify-center" aria-hidden="true">
                <div className="cube-3d relative h-24 w-24">
                  {CUBE_FACES.map((f, i) => (
                    <div
                      key={i}
                      className="cube-face rounded-lg text-lg text-cyan-200"
                      style={{
                        transform: [
                          "rotateY(0deg) translateZ(48px)",
                          "rotateY(90deg) translateZ(48px)",
                          "rotateY(180deg) translateZ(48px)",
                          "rotateY(-90deg) translateZ(48px)",
                          "rotateX(90deg) translateZ(48px)",
                          "rotateX(-90deg) translateZ(48px)",
                        ][i],
                      }}
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-mono2 mt-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--ink-mute)" }}>
                Tech core · rotating
              </p>

              {/* interests */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="flex w-full items-center justify-center gap-1.5 font-mono2 text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-mute)" }}>
                  <Heart className="h-3 w-3 text-rose-400" /> Interests
                </span>
                {profile.interests.map((interest) => (
                  <span key={interest} className="chip rounded-full px-3 py-1 text-xs" style={{ color: "var(--ink-dim)" }}>
                    {interest}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* ── Info panel ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08} className="flex">
                <div className="glass card-lift group relative flex-1 overflow-hidden rounded-2xl p-6">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                  <c.icon className="h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
                  <p className="font-mono2 mt-4 text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--ink-mute)" }}>{c.label}</p>
                  <p className="font-display mt-2 text-[15px] leading-snug font-semibold">{c.value}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--ink-mute)" }}>{c.sub}</p>
                </div>
              </Reveal>
            ))}
            {/* bio strip */}
            <Reveal delay={0.35} className="sm:col-span-2">
              <div className="glass-strong relative overflow-hidden rounded-2xl p-6 md:p-7">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl" aria-hidden="true" />
                <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>{"// profile.log"}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-3 text-sm leading-relaxed sm:text-[15px]"
                  style={{ color: "var(--ink-dim)" }}
                >
                  I'm <strong style={{ color: "var(--ink)" }}>{profile.name}</strong>, a {profile.education.toLowerCase()} student
                  from {profile.location}. I spend my time learning programming, building web projects, and exploring
                  artificial intelligence — while serving as{" "}
                  <strong style={{ color: "var(--ink)" }}>{profile.currentRole}</strong>, where I learned
                  what real teamwork and responsibility look like. My goal: {profile.careerGoal.charAt(0).toLowerCase() + profile.careerGoal.slice(1)}
                </motion.p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
