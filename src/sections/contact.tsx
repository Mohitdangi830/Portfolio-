import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../components/icons";
import { profile, projectTypes, socials } from "../data/portfolio";
import { Magnetic, Reveal, SectionHeading } from "../components/ui";
import { cn } from "../utils/cn";

interface SubmitReceipt {
  id: string;
  submittedAt: string;
}

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    handle: "Mohit Dangi",
    href: socials.linkedin,
    icon: LinkedinIcon,
    accent: "#3987FF",
  },
  {
    label: "GitHub",
    handle: "@Mohitdangi830",
    href: socials.github,
    icon: GithubIcon,
    accent: "#3987FF",
  },
  {
    label: "Instagram",
    handle: "@mohitdangi830",
    href: socials.instagram,
    icon: InstagramIcon,
    accent: "#FF7138",
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<string>(projectTypes[0]);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<SubmitReceipt | null>(null);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback ignored if clipboard blocked */
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    const localErrors: Record<string, string> = {};
    if (name.trim().length < 2) localErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      localErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      localErrors.message = "Please describe your idea (at least 10 characters).";
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setErrorMsg(data.error || "Unable to send message right now.");
        return;
      }

      setReceipt({ id: data.id, submittedAt: data.submittedAt });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Network error while sending message. You can email me directly below.");
    } finally {
      setSubmitting(false);
    }
  }

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry — ${projectType}`
  )}`;

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-20 border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
      aria-label="Contact Mohit Dangi"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Contact"
          title="HAVE AN IDEA?"
          accent="LET'S MAKE IT REAL."
          description="Available for software builds, digital studio collaborations through The Creators, and forward-thinking creative technology."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ── Left Column: Direct Email & Animated Social Links ── */}
          <div className="space-y-6">
            <Reveal>
              <div className="gradient-border-card rounded-2xl p-6 sm:p-8">
                <p className="font-mono2 text-xs font-medium tracking-[0.16em] text-[#3987FF] uppercase">
                  Direct Contact
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display mt-3 block text-xl font-bold tracking-tight break-all transition-colors hover:text-[#3987FF] sm:text-2xl"
                >
                  {profile.email}
                </a>
                <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
                  {profile.location} · {profile.availability}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="btn-outline inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#3987FF]" />
                        Email Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Email
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#3987FF]"
                    style={{ color: "var(--ink-dim)" }}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Open Mail App
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Animated Social Media Cards */}
            <Reveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center justify-between rounded-2xl border p-4 transition-colors hover:border-[#3987FF]/50"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105"
                          style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--bg)",
                            color: item.accent,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-display text-sm font-semibold">{item.label}</p>
                          <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                            {item.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--ink-muted)" }}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={socials.theCreators}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border p-5 transition-colors hover:border-[#FF7138]/60"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <div>
                  <p className="font-mono2 text-xs text-[#FF7138]">Digital Studio</p>
                  <p className="font-display mt-1 text-base font-bold">
                    The Creators — Digital Agency
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#FF7138]" />
              </a>
            </Reveal>
          </div>

          {/* ── Right Column: Full-Stack Contact Form ── */}
          <Reveal delay={0.1}>
            <div
              className="rounded-3xl border p-6 sm:p-8 md:p-10"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border)",
              }}
            >
              {receipt ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3987FF]/15 text-[#3987FF]">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-bold">Message Received</h3>
                  <p
                    className="mx-auto mt-2 max-w-md text-sm leading-relaxed"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Thank you for reaching out. Your inquiry has been logged for{" "}
                    <span style={{ color: "var(--ink)" }}>{profile.email}</span>.
                  </p>
                  <p
                    className="font-mono2 mt-4 text-xs"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Reference: {receipt.id}
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setReceipt(null)}
                      className="btn-electric rounded-full px-6 py-2.5 text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={mailtoHref}
                      className="btn-outline rounded-full px-6 py-2.5 text-xs font-semibold"
                    >
                      Email Directly
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium tracking-wide"
                        style={{ color: "var(--ink-dim)" }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#3987FF]"
                        style={{
                          backgroundColor: "var(--bg)",
                          borderColor: fieldErrors.name ? "#FF7138" : "var(--border)",
                          color: "var(--ink)",
                        }}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1.5 text-xs text-[#FF7138]">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium tracking-wide"
                        style={{ color: "var(--ink-dim)" }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#3987FF]"
                        style={{
                          backgroundColor: "var(--bg)",
                          borderColor: fieldErrors.email ? "#FF7138" : "var(--border)",
                          color: "var(--ink)",
                        }}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-[#FF7138]">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span
                      className="block text-xs font-medium tracking-wide"
                      style={{ color: "var(--ink-dim)" }}
                    >
                      Project Type
                    </span>
                    <div
                      className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3"
                      role="radiogroup"
                      aria-label="Project Type"
                    >
                      {projectTypes.map((type) => {
                        const selected = projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setProjectType(type)}
                            className={cn(
                              "rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3987FF]",
                              selected ? "border-[#3987FF] text-white" : ""
                            )}
                            style={{
                              backgroundColor: selected ? "#3987FF" : "var(--bg)",
                              borderColor: selected ? "#3987FF" : "var(--border)",
                              color: selected ? "#FFFFFF" : "var(--ink-muted)",
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.projectType && (
                      <p className="mt-1.5 text-xs text-[#FF7138]">{fieldErrors.projectType}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium tracking-wide"
                      style={{ color: "var(--ink-dim)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project, timeline, or collaboration idea..."
                      className="mt-2 w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#3987FF]"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: fieldErrors.message ? "#FF7138" : "var(--border)",
                        color: "var(--ink)",
                      }}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1.5 text-xs text-[#FF7138]">{fieldErrors.message}</p>
                    )}
                  </div>

                  {errorMsg && (
                    <div
                      className="rounded-xl border border-[#FF7138]/40 bg-[#FF7138]/10 px-4 py-3 text-xs text-[#FF7138]"
                      role="alert"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <Magnetic strength={0.18}>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-electric inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </Magnetic>

                    <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                      Direct to {profile.email}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
