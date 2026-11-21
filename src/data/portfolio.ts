import travelmateImg from "../assets/images/project_travelmate_ui_1795025449021.jpg";
import filixImg from "../assets/images/project_filix_desktop_1795025449420.jpg";
import geospatialImg from "../assets/images/project_geospatial_gis_1795025458782.jpg";
import lacrosseActionImg from "../assets/images/sports_lacrosse_action_1795025498701.jpg";

export const profile = {
  name: "Mohit Dangi",
  shortMark: "MD",
  roleLine: "Developer · Entrepreneur · Sports Leader · Technology Enthusiast",
  intro:
    "Hi, I'm Mohit Dangi — a Developer, Entrepreneur, Sports Leader and Technology Enthusiast.",
  floatingStatement: "Turning Imagination Into Digital Reality.",
  availability: "Available for collaborations & software projects",
  location: "Udaipur, Rajasthan, India",
  education: "BCA (Currently Pursuing) · 12th Pass, KV No. 1 Pratap Nagar",
  profilePhoto: "/images/profile.png",
  email: "mohitdangi151@gmail.com",
} as const;

export const socials = {
  linkedin: "https://www.linkedin.com/in/mohit-d-6392a1388/",
  github: "https://github.com/Mohitdangi830",
  instagram: "https://www.instagram.com/mohitdangi830/",
  theCreators: "https://thecreators-studio.vercel.app/",
  discord: "BOSS 83029",
  email: "mailto:mohitdangi151@gmail.com",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Sports", href: "#sports" },
  { label: "The Creators", href: "#creators" },
] as const;

export interface AboutPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  accent: "blue" | "orange";
}

export const aboutPillars: AboutPillar[] = [
  {
    id: "tech-enthusiast",
    index: "01",
    title: "Technology Enthusiast & Innovator",
    subtitle: "Systems & Applied Curiosity",
    description:
      "Driven by how modern software, spatial interfaces, and artificial intelligence reshape everyday human workflows.",
    detail: "Continuous R&D across AI assistants, web architecture, and geospatial systems.",
    accent: "blue",
  },
  {
    id: "software-web",
    index: "02",
    title: "Software & Web Developer",
    subtitle: "Full-Stack & Desktop Engineering",
    description:
      "Crafting responsive web applications, interactive digital products, and practical desktop software with disciplined architecture.",
    detail: "TypeScript, React, Python, C/C++, Java, and modern UI engineering.",
    accent: "blue",
  },
  {
    id: "founder-creators",
    index: "03",
    title: "Founder of The Creators",
    subtitle: "Digital Development Initiative",
    description:
      "Leading a multidisciplinary studio focused on turning ambitious concepts into shipped websites, applications, and visual identities.",
    detail: "Bridging engineering execution with brand design and media production.",
    accent: "orange",
  },
  {
    id: "sports-leadership",
    index: "04",
    title: "Sports Leadership & National Participation",
    subtitle: "Rajasthan Lacrosse & Mini Football",
    description:
      "Bringing competitive discipline, team coordination, and high-pressure decision making from national-level arenas into technology.",
    detail: "State Team Manager for Rajasthan Lacrosse · National-level athlete mindset.",
    accent: "orange",
  },
];

export type ExpertiseCategory = "All" | "Engineering" | "Design & Media" | "Emerging Tech";

export interface ExpertiseItem {
  id: string;
  title: string;
  category: Exclude<ExpertiseCategory, "All">;
  description: string;
  capabilities: string[];
  focusScore: number; // Used purely for visual spectrum chart representation of focus allocation
  accent: "blue" | "orange";
  iconKey:
    | "web"
    | "app"
    | "software"
    | "uiux"
    | "graphic"
    | "video"
    | "creative"
    | "ai";
}

export const expertiseItems: ExpertiseItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    category: "Engineering",
    description:
      "High-performance, responsive web platforms engineered with modern React, TypeScript, and clean backend APIs.",
    capabilities: ["React & TypeScript", "Responsive Architecture", "REST APIs"],
    focusScore: 92,
    accent: "blue",
    iconKey: "web",
  },
  {
    id: "app-dev",
    title: "App Development",
    category: "Engineering",
    description:
      "Cross-platform and mobile-first application experiences built around intuitive user flows and speed.",
    capabilities: ["Mobile Interfaces", "Cross-Platform Logic", "Offline-Ready Flows"],
    focusScore: 82,
    accent: "blue",
    iconKey: "app",
  },
  {
    id: "software-dev",
    title: "Software Development",
    category: "Engineering",
    description:
      "Structured systems, desktop utilities, and problem-solving architectures grounded in C, C++, Java, and Python.",
    capabilities: ["Python Systems", "OOP & DSA", "Desktop Utilities"],
    focusScore: 86,
    accent: "blue",
    iconKey: "software",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    category: "Design & Media",
    description:
      "Minimalist, human-centered product interfaces combining typographic precision with effortless spatial hierarchy.",
    capabilities: ["Design Systems", "Interactive Prototypes", "User Flows"],
    focusScore: 88,
    accent: "orange",
    iconKey: "uiux",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "Design & Media",
    description:
      "Cohesive visual identities, brand marks, and editorial digital compositions that communicate with clarity.",
    capabilities: ["Brand Identity", "Visual Systems", "Editorial Layouts"],
    focusScore: 80,
    accent: "orange",
    iconKey: "graphic",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    category: "Design & Media",
    description:
      "Rhythmic visual storytelling, motion pacing, and crisp post-production for product launches and digital media.",
    capabilities: ["Narrative Pacing", "Color & Sound", "Motion Cuts"],
    focusScore: 78,
    accent: "orange",
    iconKey: "video",
  },
  {
    id: "creative-tech",
    title: "Creative Technology",
    category: "Emerging Tech",
    description:
      "Interactive 3D web experiences, WebGL scenes, and kinetic motion systems that elevate digital storytelling.",
    capabilities: ["Three.js & WebGL", "Framer Motion", "Interactive Canvas"],
    focusScore: 85,
    accent: "blue",
    iconKey: "creative",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    category: "Emerging Tech",
    description:
      "Voice-driven desktop assistants, smart planning engines, and automated pipelines that remove manual friction.",
    capabilities: ["Voice Interfaces", "Workflow Automation", "Applied AI"],
    focusScore: 84,
    accent: "orange",
    iconKey: "ai",
  },
];

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  previewType: "agency" | "image" | "sports";
  liveUrl?: string;
  accent: "blue" | "orange";
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    highlights: string[];
  };
}

export const featuredProjects: ProjectItem[] = [
  {
    id: "the-creators",
    index: "01",
    title: "The Creators",
    subtitle: "Digital Development Agency",
    category: "Agency Platform · Brand & Engineering",
    description:
      "A digital development initiative and studio platform transforming ambitious ideas into bespoke websites, software products, and visual brand experiences.",
    tech: ["React", "TypeScript", "Tailwind CSS", "UI/UX Architecture"],
    previewType: "agency",
    liveUrl: "https://thecreators-studio.vercel.app/",
    accent: "blue",
    caseStudy: {
      overview:
        "The Creators serves as Mohit's digital studio initiative — uniting software engineering, product design, and media craft under a single delivery pipeline.",
      challenge:
        "Founders and growing organizations often struggle with fragmented freelancers across design, code, and video.",
      solution:
        "Built a unified studio identity and interactive showcase platform offering end-to-end Website Development, App Development, Software Solutions, Graphic Design, and Video Editing.",
      highlights: [
        "Unified 6-discipline service architecture from concept to launch",
        "Responsive dark-editorial web platform deployed to production",
        "Direct client collaboration pipeline for custom digital solutions",
      ],
    },
  },
  {
    id: "travelmate",
    index: "02",
    title: "TravelMate",
    subtitle: "AI Travel Guide & Smart Trip Planner",
    category: "AI Product · Smart Mobility",
    description:
      "An intelligent travel companion designed to generate adaptive day-by-day itineraries, surface local routes, and streamline trip coordination.",
    tech: ["AI Planning", "React", "Maps & Routing", "Smart Recommendations"],
    image: travelmateImg,
    previewType: "image",
    accent: "blue",
    caseStudy: {
      overview:
        "TravelMate reimagines trip planning by combining conversational AI preferences with spatial route mapping and structured daily schedules.",
      challenge:
        "Travelers waste hours juggling fragmented maps, bookmark lists, and uncoordinated transit timings.",
      solution:
        "Designed an integrated trip engine pairing an interactive route canvas with structured itinerary blocks, time-of-day optimization, and destination context.",
      highlights: [
        "Spatial itinerary map paired with time-slotted daily cards",
        "Preference-aware destination and transit suggestions",
        "Clean dark-mode mobile and tablet-first interface",
      ],
    },
  },
  {
    id: "filix",
    index: "03",
    title: "FILIX",
    subtitle: "Personal AI Desktop Assistant",
    category: "Desktop AI · Voice & Automation",
    description:
      "A personal desktop AI assistant built in Python to interpret voice commands, automate everyday system actions, and deliver fast conversational assistance.",
    tech: ["Python", "Voice Recognition", "Desktop Automation", "NLP Intents"],
    image: filixImg,
    previewType: "image",
    accent: "orange",
    caseStudy: {
      overview:
        "FILIX is a desktop-first personal intelligence utility engineered to bridge natural voice commands with real operating system workflows.",
      challenge:
        "Switching across windows, launchers, and repetitive desktop tasks breaks deep creative focus.",
      solution:
        "Developed a modular Python command pipeline with speech recognition, acoustic feedback visualization, and extensible action handlers.",
      highlights: [
        "Low-latency voice capture and intent classification pipeline",
        "Modular command architecture for desktop tasks and quick lookups",
        "Minimalist acoustic wave interface built for distraction-free focus",
      ],
    },
  },
  {
    id: "rajasthan-lacrosse",
    index: "04",
    title: "Rajasthan Lacrosse Association",
    subtitle: "Sports Digital Platform",
    category: "Sports Ecosystem · Web Platform",
    description:
      "A dedicated digital platform built to elevate Rajasthan Lacrosse visibility, athlete information, tournament updates, and team coordination.",
    tech: ["Web Platform", "Sports Operations", "UI/UX Design", "Responsive Architecture"],
    previewType: "sports",
    accent: "orange",
    caseStudy: {
      overview:
        "Inspired directly by hands-on leadership with Rajasthan Lacrosse, this platform centralizes state team announcements, athlete rosters, and grassroots development resources.",
      challenge:
        "Emerging state sports associations often lack a structured digital home for athletes, coaches, and tournament schedules.",
      solution:
        "Architected an editorial sports hub combining match schedules, leadership directories, and recruitment pathways for new players.",
      highlights: [
        "Centralized schedule and state squad communication structure",
        "High-contrast athletic design language for fast mobile lookup",
        "Built from firsthand experience managing state team logistics",
      ],
    },
  },
  {
    id: "sih-geospatial",
    index: "05",
    title: "SIH Geospatial Project",
    subtitle: "Intelligent Urban Land Management",
    category: "Smart India Hackathon · Civic Tech GIS",
    description:
      "An intelligent geospatial land-management concept developed for Smart India Hackathon, visualizing urban parcels, elevation contours, and zoning insights.",
    tech: ["Geospatial GIS", "Data Visualization", "Urban Analytics", "Web Interface"],
    image: geospatialImg,
    previewType: "image",
    accent: "blue",
    caseStudy: {
      overview:
        "Designed under the Smart India Hackathon problem framework, this system empowers urban planners to inspect land parcels, topography, and infrastructure overlays in one view.",
      challenge:
        "Municipal land records, elevation data, and zoning layers frequently live in disconnected spreadsheets and static PDFs.",
      solution:
        "Prototyped an interactive multi-layer GIS dashboard combining parcel boundaries, contour telemetry, and clean spatial filtering.",
      highlights: [
        "Layered topography, parcel boundary, and infrastructure visualization",
        "Rapid parcel inspection workflow for civic decision-makers",
        "Built for clarity under dense multi-attribute spatial datasets",
      ],
    },
  },
];

export interface MilestoneItem {
  period: string;
  title: string;
  organization: string;
  category: "Entrepreneurship" | "Sports Leadership" | "Technology" | "Education";
  description: string;
  tags: string[];
  accent: "blue" | "orange";
}

export const journeyMilestones: MilestoneItem[] = [
  {
    period: "Present",
    title: "Founder",
    organization: "The Creators",
    category: "Entrepreneurship",
    description:
      "Founded a digital development initiative dedicated to building websites, applications, software solutions, brand graphics, and video productions.",
    tags: ["Entrepreneurship", "Digital Studio", "Product Delivery"],
    accent: "blue",
  },
  {
    period: "Present",
    title: "State Team Manager & Sports Leader",
    organization: "Rajasthan Lacrosse",
    category: "Sports Leadership",
    description:
      "Coordinating state athletes, training schedules, and operational logistics while championing lacrosse growth and team cohesion.",
    tags: ["Team Leadership", "Sports Management", "Operations"],
    accent: "orange",
  },
  {
    period: "Athletic Career",
    title: "National-Level Sporting Participation",
    organization: "Lacrosse & Mini Football",
    category: "Sports Leadership",
    description:
      "Competed at the national level across Lacrosse and Mini Football, cultivating grit, tactical awareness, and collective accountability.",
    tags: ["National Participation", "Lacrosse", "Mini Football"],
    accent: "orange",
  },
  {
    period: "Ongoing",
    title: "Technology Projects & Innovation",
    organization: "FILIX · TravelMate · SIH Geospatial",
    category: "Technology",
    description:
      "Designing and engineering real-world software concepts spanning desktop AI assistants, smart travel guidance, and civic geospatial dashboards.",
    tags: ["AI Systems", "Web Engineering", "Geospatial GIS"],
    accent: "blue",
  },
  {
    period: "Currently Pursuing",
    title: "Bachelor of Computer Applications (BCA)",
    organization: "Undergraduate Computer Science · Post-12th KV No. 1 Pratap Nagar",
    category: "Education",
    description:
      "Building formal foundations in programming, data structures, databases, and software engineering alongside hands-on development.",
    tags: ["BCA", "Computer Applications", "Continuous Learning"],
    accent: "blue",
  },
];

export const sportsIdentity = {
  image: lacrosseActionImg,
  disciplines: [
    {
      id: "lacrosse",
      title: "Lacrosse",
      role: "National-Level Player & State Team Manager",
      summary:
        "Speed, spatial vision, and rapid team transitions. Representing competitive lacrosse while helping manage and scale Rajasthan Lacrosse operations.",
      metrics: ["Rajasthan Lacrosse", "National Participation", "Team Operations"],
    },
    {
      id: "mini-football",
      title: "Mini Football",
      role: "National-Level Participation",
      summary:
        "Tight-space agility, split-second decision making, and relentless endurance in fast-paced small-sided competition.",
      metrics: ["Mini Football", "National Level", "Tactical Play"],
    },
    {
      id: "leadership",
      title: "Sports Development & Leadership",
      role: "Coordination, Mentorship & Growth",
      summary:
        "Organizing squads, bridging athletes and coaches, and building digital tools like the Rajasthan Lacrosse Association platform.",
      metrics: ["Squad Coordination", "Grassroots Growth", "Digital Enablement"],
    },
  ],
};

export const creatorsData = {
  headline: "IDEAS DESERVE TO BE BUILT.",
  description:
    "The Creators is a digital development initiative focused on transforming ideas into powerful digital experiences.",
  url: "https://thecreators-studio.vercel.app/",
  services: [
    {
      number: "01",
      title: "Website Development",
      detail: "Editorial marketing sites, interactive portfolios, and high-converting web platforms.",
    },
    {
      number: "02",
      title: "App Development",
      detail: "Responsive, user-centric mobile and cross-platform applications built for reliability.",
    },
    {
      number: "03",
      title: "Software Solutions",
      detail: "Custom automation tools, desktop utilities, and tailored operational software.",
    },
    {
      number: "04",
      title: "Graphic Design",
      detail: "Distinctive logos, cohesive visual systems, and digital brand assets.",
    },
    {
      number: "05",
      title: "Video Editing",
      detail: "Sharp cuts, motion storytelling, and polished visual narratives for modern brands.",
    },
    {
      number: "06",
      title: "Custom Digital Solutions",
      detail: "Bespoke creative-tech builds uniting design, code, and AI workflows.",
    },
  ],
};

export const projectTypes = [
  "Website Development",
  "App Development",
  "Software Solution",
  "UI/UX & Branding",
  "Video Editing",
  "Collaboration / Other",
] as const;
