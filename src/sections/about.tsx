import { motion } from "framer-motion";
import { GraduationCap, MapPin, Trophy, Heart, Target } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal, SectionHeading, TiltCard } from "../components/ui";

const CARDS = [
  { icon: GraduationCap, label: "Education", value: profile.education, sub: profile.school },
  { icon: MapPin, label: "Location", value: profile.location, sub: "Open to remote & on-site" },
  { icon: Trophy, label: "Current Role", value: profile.currentRole, sub: "Leadership in sports" },
  { icon: Target, label: "Career Goal", value: "Software developer + national lacrosse player", sub: "Code by day, train by evening" },
];

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
              {/* Profile Avatar */}
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-600/30 blur-xl" aria-hidden="true" />
                <div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-cyan-400/60 bg-[#070a22] p-1.5 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-transform duration-300 hover:scale-105 sm:h-36 sm:w-36">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt={`${profile.name} — Profile Picture`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-cyan-200">
                      MD
                    </div>
                  )}
                  {/* Status beacon */}
                  <span
                    className="absolute right-1 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/60 bg-[#030014] shadow-md"
                    title="Active"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-wide">{profile.name.toUpperCase()}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--neon)" }}>{profile.primaryTitle}</p>
              <p className="mt-4 max-w-xs text-xs leading-relaxed" style={{ color: "var(--ink-mute)" }}>
                {profile.tagline}
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
