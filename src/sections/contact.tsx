import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Radio, Copy, Check } from "lucide-react";
import { profile, socials } from "../data/portfolio";
import { Reveal, SectionHeading, Magnetic, TiltCard } from "../components/ui";
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from "../components/icons";

const SOCIAL_CARDS = [
  {
    name: "GitHub",
    handle: "Code & repositories",
    href: socials.github,
    icon: GithubIcon,
    hover: "hover:border-violet-400/50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]",
    glow: "from-violet-500/20 to-transparent",
  },
  {
    name: "LinkedIn",
    handle: "Professional network",
    href: socials.linkedin,
    icon: LinkedinIcon,
    hover: "hover:border-blue-400/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]",
    glow: "from-blue-500/20 to-transparent",
  },
  {
    name: "Instagram",
    handle: "@mohitdangi830",
    href: socials.instagram,
    icon: InstagramIcon,
    hover: "hover:border-fuchsia-400/50 hover:shadow-[0_0_40px_-10px_rgba(232,121,249,0.5)]",
    glow: "from-fuchsia-500/20 to-transparent",
  },
  {
    name: "Discord",
    handle: socials.discord,
    href: "#contact",
    icon: DiscordIcon,
    hover: "hover:border-indigo-400/50 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]",
    glow: "from-indigo-500/20 to-transparent",
  },
  {
    name: "Email",
    handle: profile.email,
    href: socials.email,
    icon: Mail,
    hover: "hover:border-cyan-400/50 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]",
    glow: "from-cyan-500/20 to-transparent",
  },
];

interface Errors { name?: string; email?: string; subject?: string; message?: string }

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name (min 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.subject.trim().length < 3) e.subject = "Please add a subject (min 3 characters).";
    if (form.message.trim().length < 10) e.message = "Message needs at least 10 characters.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus("error");
      setTimeout(() => setStatus((s) => (s === "error" ? "idle" : s)), 3500);
      return;
    }
    setStatus("sending");
    // simulate transmission sequence
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  }

  function openMailClient() {
    const body = encodeURIComponent(`Hi Mohit,\n\n${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || "Opportunity / Idea / Project");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  function copyEmail() {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const inputCls = "input-futuristic w-full rounded-xl px-4 py-3 text-sm";
  const labelCls = "font-mono2 mb-1.5 block text-[10px] tracking-[0.25em] uppercase";

  return (
    <section id="contact" className="section-fade relative z-10 scroll-mt-20 py-24 md:py-32" aria-label="Contact Mohit Dangi">
      <div className="absolute bottom-0 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-600/8 blur-[130px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Establish Connection"
          title="LET'S"
          accent="CONNECT"
          description="“Have an idea, opportunity, or project? Let's connect.” — I reply to every genuine message."
        />

        {/* ── Social network ── */}
        <div className="mx-auto mb-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SOCIAL_CARDS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <TiltCard max={12}>
                <a
                  href={s.href}
                  target={s.name === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className={`glass group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-400 ${s.hover}`}
                  aria-label={`${s.name} — ${s.handle}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${s.glow}`} aria-hidden="true" />
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon className="h-5 w-5 text-cyan-300" />
                  </span>
                  <span className="relative min-w-0">
                    <span className="font-display block font-bold">{s.name}</span>
                    <span className="block truncate text-xs" style={{ color: "var(--ink-mute)" }}>{s.handle}</span>
                  </span>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* left: transmission info */}
          <Reveal className="flex">
            <div className="glass-strong hud-corner relative flex w-full flex-col overflow-hidden rounded-3xl p-7 md:p-8">
              <div className="scanline" aria-hidden="true" />
              <p className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>
                <Radio className="h-4 w-4 animate-pulse" /> Incoming channel open
              </p>
              <h3 className="font-display mt-4 text-2xl leading-tight font-bold">
                Transmit your <span className="text-gradient">message</span> across the grid.
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                Internships, hackathon teams, freelance gigs, lacrosse collaborations or just tech talk —
                every transmission lands directly in my inbox.
              </p>
              <ul className="mt-6 space-y-3 font-mono2 text-xs" style={{ color: "var(--ink-dim)" }}>
                {["Usually replies within 24–48 hours", "Open to internships & entry roles", "Open to hackathons & collabs"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <p className="font-mono2 mb-2 text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-mute)" }}>Direct frequency</p>
                <div className="flex items-center gap-2">
                  <code className="chip flex-1 truncate rounded-lg px-3 py-2.5 font-mono2 text-xs text-cyan-300">{profile.email}</code>
                  <button onClick={copyEmail} aria-label="Copy email address" className="btn-ghost flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal delay={0.1}>
            <TiltCard max={4} glare={false} className="glass rounded-3xl p-7 md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </motion.span>
                    <h3 className="font-display mt-6 text-2xl font-bold">Transmission received.</h3>
                    <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--ink-dim)" }}>
                      Thanks {form.name.split(" ")[0] || "traveler"} — your message is queued. To make sure it reaches
                      my inbox instantly, you can also fire it through your email app:
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button onClick={openMailClient} className="btn-primary rounded-full px-6 py-3 text-xs font-semibold tracking-widest text-white uppercase">
                        Open in email app
                      </button>
                      <button
                        onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="btn-ghost rounded-full px-6 py-3 text-xs font-semibold tracking-widest uppercase"
                      >
                        Send another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="ct-name" className={labelCls} style={{ color: "var(--ink-mute)" }}>Name *</label>
                      <input id="ct-name" type="text" autoComplete="name" placeholder="Your name"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "ct-name-err" : undefined} />
                      {errors.name && <p id="ct-name-err" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="ct-email" className={labelCls} style={{ color: "var(--ink-mute)" }}>Email *</label>
                      <input id="ct-email" type="email" autoComplete="email" placeholder="you@example.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "ct-email-err" : undefined} />
                      {errors.email && <p id="ct-email-err" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-subject" className={labelCls} style={{ color: "var(--ink-mute)" }}>Subject *</label>
                      <input id="ct-subject" type="text" placeholder="Internship · Hackathon · Project idea · Hello"
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "ct-subject-err" : undefined} />
                      {errors.subject && <p id="ct-subject-err" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-rose-400"><AlertCircle className="h-3 w-3" />{errors.subject}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-message" className={labelCls} style={{ color: "var(--ink-mute)" }}>Message *</label>
                      <textarea id="ct-message" rows={5} placeholder="Tell me about your idea, opportunity or project…"
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputCls} resize-none`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "ct-message-err" : undefined} />
                      <div className="mt-1.5 flex items-center justify-between">
                        {errors.message
                          ? <p id="ct-message-err" role="alert" className="flex items-center gap-1 text-xs text-rose-400"><AlertCircle className="h-3 w-3" />{errors.message}</p>
                          : <span />}
                        <span className="font-mono2 text-[10px]" style={{ color: "var(--ink-mute)" }}>{form.message.length}/1000</span>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Magnetic strength={0.08}>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="btn-primary flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-bold tracking-[0.2em] text-white uppercase disabled:opacity-70"
                        >
                          {status === "sending" ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Transmitting…</>
                          ) : (
                            <><Send className="h-4 w-4" /> Transmit message</>
                          )}
                        </button>
                      </Magnetic>
                      <AnimatePresence>
                        {status === "error" && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            role="alert" className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400">
                            <AlertCircle className="h-3.5 w-3.5" /> Please fix the highlighted fields and retry.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
