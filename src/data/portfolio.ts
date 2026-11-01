/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  MOHIT DANGI — PORTFOLIO CONFIG  ·  EDIT EVERYTHING HERE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  1. PROFILE PHOTO ── Place your photo at `public/images/profile.jpg`
 *     (square, min 512×512) then set `profilePhoto` below to that path.
 *     Until then a holographic "MD" monogram is shown automatically.
 *
 *  2. RESUME ── Export your resume as PDF named exactly
 *     `Mohit-Dangi-Resume.pdf` and drop it in `public/`.
 *     The DOWNLOAD RESUME button uses `resumeUrl` below. A generated
 *     text-resume fallback is included so the button always works.
 *
 *  3. GITHUB URL ── set `socials.github` below.
 *  4. LINKEDIN URL ── set `socials.linkedin` below.
 *  5. PROJECT LINKS ── each project has `github`, `demo`, `case` fields.
 *     Leave as "#" and the button shows "Soon" state automatically.
 *
 *  6. COLORS ── edit CSS variables in `src/index.css` (:root / .light).
 *  7. NEW PROJECTS ── copy one object in the `projects` array.
 *  8. GITHUB PAGES ── `npm run build`, push `dist/` via gh-pages branch
 *     or set Vite `base` + Pages source to GitHub Actions. See README.md.
 *  9. NETLIFY ── drag-drop `dist/` or connect repo, build: `npm run build`,
 *     publish: `dist`. See README.md for full steps.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const profile = {
  name: "Mohit Dangi",
  firstName: "MOHIT",
  lastName: "DANGI",
  primaryTitle: "Aspiring IT Professional & Developer",
  roles: ["Developer", "Programmer", "Technology Enthusiast", "Problem Solver", "Lifelong Learner"],
  tagline: "Passionate about technology, innovation, programming, and building useful digital experiences.",
  location: "Udaipur, Rajasthan, India",
  education: "12th Pass · Currently pursuing BCA",
  school: "Kendriya Vidyalaya No. 1, Pratap Nagar",
  currentRole: "State Team Manager — Rajasthan Lacrosse",
  careerGoal:
    "Become a successful software developer and represent as a national lacrosse player.",
  interests: ["Programming", "Artificial Intelligence", "Web Development", "Lacrosse & Sports Leadership", "Open Source", "Emerging Tech"],
  // 👤 ① Put your photo at public/images/profile.png and keep this path:
  profilePhoto: "/images/profile.png",
  // 📄 ② Drop your PDF at public/Mohit-Dangi-Resume.pdf
  resumeUrl: "/Mohit-Dangi-Resume.pdf",
  resumeFileName: "Mohit-Dangi-Resume.pdf",
  email: "mohitdangi151@gmail.com",
} as const;

export const socials = {
  // 🔗 ③④ Real profile URLs
  github: "https://github.com/Mohitdangi830",
  linkedin: "https://www.linkedin.com/in/mohit-d-6392a1388/",
  instagram: "https://www.instagram.com/mohitdangi830/",
  discord: "BOSS 83029",
  email: "mailto:mohitdangi151@gmail.com",
} as const;

export type SkillLevel = "Learning" | "Building" | "Comfortable" | "Core";

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // lucide key mapped in Skills section
  description: string;
  skills: { name: string; level: SkillLevel; icon?: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: "terminal",
    description: "Core languages for logic, DSA and software fundamentals.",
    skills: [
      { name: "C", level: "Core" },
      { name: "C++", level: "Core" },
      { name: "Java", level: "Building" },
      { name: "Python", level: "Building" },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    icon: "globe",
    description: "Building modern, responsive experiences for the web.",
    skills: [
      { name: "HTML", level: "Comfortable" },
      { name: "CSS", level: "Comfortable" },
      { name: "JavaScript", level: "Building" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    description: "Everyday workflow, version control and productivity.",
    skills: [
      { name: "Git", level: "Building" },
      { name: "GitHub", level: "Building" },
      { name: "VS Code", level: "Comfortable" },
      { name: "MS Office", level: "Comfortable" },
    ],
  },
  {
    id: "professional",
    title: "Professional Skills",
    icon: "users",
    description: "How I work with people, pressure and problems.",
    skills: [
      { name: "Problem Solving", level: "Core" },
      { name: "Teamwork", level: "Core" },
      { name: "Leadership", level: "Core" },
      { name: "Communication", level: "Building" },
    ],
  },
];

export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Concept" | "In Progress" | "Live" | "Coming Soon";
  accent: "cyan" | "violet" | "blue" | "emerald";
  github: string; // "#" = placeholder → shows "Soon"
  demo: string;
  case: string;
}

export const projects: Project[] = [
  {
    id: "voice-assistant",
    index: "01",
    title: "Personal AI Voice Assistant",
    tagline: "Python · AI · Voice Interaction",
    description:
      "A personal voice-assistant concept inspired by AI assistants, designed to interact with users through voice commands.",
    tech: ["Python", "AI", "Voice Interaction"],
    status: "Concept",
    accent: "cyan",
    github: "#",
    demo: "#",
    case: "#",
  },
  {
    id: "gamers-network",
    index: "02",
    title: "Gamers_Network",
    tagline: "Community · Servers · Branding",
    description:
      "A gaming / Minecraft server project with community-focused features and digital branding.",
    tech: ["Community", "Server Ops", "Branding"],
    status: "In Progress",
    accent: "blue",
    github: "#",
    demo: "#",
    case: "#",
  },
  // ── ⑦ ADD NEW PROJECTS: copy a block above, change id/index/title… ──
];

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  current?: boolean;
  placeholder?: boolean;
}

export const experience: TimelineItem[] = [
  {
    period: "Present",
    title: "State Team Manager",
    org: "Rajasthan Lacrosse",
    description:
      "Coordinating players, schedules and on-ground operations for the state team. Building leadership, communication and teamwork skills while supporting athletes and coaches.",
    tags: ["Leadership", "Teamwork", "Sports Management"],
    current: true,
  },
  {
    period: "Next",
    title: "Hackathons & Technical Competitions",
    org: "Open to opportunities",
    description:
      "Actively looking to participate in hackathons, coding contests and tech events. This slot will showcase competitions and results as they happen.",
    tags: ["Hackathons", "Competing Soon"],
    placeholder: true,
  },
  {
    period: "Next",
    title: "Certifications & Training",
    org: "Learning in public",
    description:
      "Currently building fundamentals in programming and web development. Certifications will be listed here as they are earned.",
    tags: ["Certifications", "Roadmap"],
    placeholder: true,
  },
];

export const education: TimelineItem[] = [
  {
    period: "Completed",
    title: "School Education · 12th Pass",
    org: "Kendriya Vidyalaya No. 1, Pratap Nagar",
    description:
      "Completed senior secondary education with a growing interest in computers, logic and problem solving.",
    tags: ["12th Pass", "KV No.1"],
  },
  {
    period: "Currently Pursuing",
    title: "Bachelor of Computer Applications",
    org: "BCA Program",
    description:
      "Studying computer applications — programming, databases, web technologies and software fundamentals.",
    tags: ["BCA", "Undergraduate"],
    current: true,
  },
];

export interface LabItem {
  title: string;
  description: string;
  status: string;
  progress: number; // 0-100 = learning progress bar (effort, not mastery claim)
  icon: string;
}

export const futureLab: LabItem[] = [
  { title: "Artificial Intelligence", description: "How models think, prompt design and AI-assisted building.", status: "Exploring", progress: 35, icon: "brain" },
  { title: "Voice Assistants", description: "Speech input, intents and conversational flows in Python.", status: "Prototyping", progress: 45, icon: "mic" },
  { title: "Web Development", description: "Modern responsive sites with JS, APIs and clean UI.", status: "Building", progress: 60, icon: "layout" },
  { title: "Software Development", description: "DSA, OOP and clean-code habits across C, C++, Java.", status: "Training", progress: 50, icon: "code" },
  { title: "Automation", description: "Scripts that remove repetitive work and save time.", status: "Experimenting", progress: 30, icon: "zap" },
  { title: "Emerging Technologies", description: "Tracking new tools, frameworks and platforms.", status: "Researching", progress: 25, icon: "orbit" },
  // ── Add new lab cards here any time ──
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
] as const;

export const hudLabels = ["AI SYSTEM", "DEVELOPER", "CODE", "INNOVATION", "ONLINE"] as const;
