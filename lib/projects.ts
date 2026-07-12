export type ProjectCategory =
  | "AI / Agentic"
  | "Full-Stack"
  | "Cybersecurity"
  | "GovTech";

export interface Project {
  id: number;
  name: string;
  fullName: string;
  description: string;
  tags: string[];
  category: ProjectCategory[];
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "ATLAS",
    fullName: "ATLAS — AI-Driven Multi-Agent Business Simulation",
    description:
      "Multi-agent RL environment where an AI CEO makes 90-day strategic business decisions. Achieved 111% reward improvement from baseline.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "Reinforcement Learning",
      "GRPO",
      "Hugging Face TRL",
      "WebSocket",
      "Docker",
    ],
    category: ["AI / Agentic"],
    github: "https://github.com/karnamvenkatachaitanya/ATLAS",
    demo: "https://huggingface.co/spaces/nelluru/ATLAS",
    featured: true,
  },
  {
    id: 2,
    name: "Kiosk Vision",
    fullName: "Kiosk Vision — AI-Powered Inclusive Self-Service Kiosk",
    description:
      "Offline-first smart kiosk for specially-abled users with voice, gesture, OCR, and barcode interaction. Fully LAN-deployed microservices architecture.",
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "Ollama",
      "MediaPipe",
      "Tesseract OCR",
      "Docker",
    ],
    category: ["AI / Agentic"],
    github: "https://github.com/karnamvenkatachaitanya/Kiosk-vision",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    name: "RevenueSeva",
    fullName: "RevenueSeva — AI Land Grievance Redressal System",
    description:
      "Full-stack GovTech platform digitizing land dispute resolution with OCR, LLM classification, 5-tier RBAC, and voice accessibility.",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "PaddleOCR",
      "Ollama (Qwen2.5)",
      "Firebase",
      "gTTS",
    ],
    category: ["AI / Agentic", "Full-Stack", "GovTech"],
    github: "https://github.com/karnamvenkatachaitanya/buildathon",
    demo: "https://revenueseva.netlify.app/",
    featured: true,
  },
  {
    id: 4,
    name: "AgentSeva",
    fullName: "AgentSeva — Local-First AI Automation Platform",
    description:
      "AI automation platform for business workflows using autonomous agents, vector-based knowledge retrieval, and email automation. IIT Madras E-Cell Finalist.",
    tags: [
      "n8n",
      "Supabase",
      "Gemini AI",
      "Vector DB",
      "PostgreSQL",
      "JavaScript",
    ],
    category: ["AI / Agentic"],
    github: "https://github.com/karnamvenkatachaitanya/agentseva",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    name: "Project Bhaasha",
    fullName: "Project Bhaasha — AI Language Learning Platform",
    description:
      "Full-stack AI-driven language learning app with multi-role auth (admin/trainer/learner), speech evaluation simulation, and Supabase row-level security.",
    tags: [
      "React",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Vitest",
    ],
    category: ["AI / Agentic", "Full-Stack"],
    github: "https://github.com/karnamvenkatachaitanya/Project-Bhaasha",
    demo: "https://projectbhaasha.netlify.app/",
    featured: false,
  },
  {
    id: 6,
    name: "SVN Lake Palace Analytics",
    fullName: "SVN Lake Palace — AI Hospitality Analytics Platform",
    description:
      "Unified hotel + restaurant + loyalty analytics platform integrating IDS Next PMS, Pet Pooja POS, and Reelo CRM with ML demand forecasting.",
    tags: [
      "Python",
      "React",
      "PostgreSQL",
      "Scikit-Learn",
      "Docker",
      "ETL",
    ],
    category: ["AI / Agentic", "Full-Stack"],
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 7,
    name: "Mega Trade Fair 2025",
    fullName: "Mega Trade Fair 2025 — Event Management Platform",
    description:
      "Full-stack event platform for 100+ exhibitors with QR visitor registration, JWT auth, exhibitor search/filtering, and real-time event schedule.",
    tags: [
      "React",
      "Django",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
    ],
    category: ["Full-Stack"],
    github: "https://github.com/karnamvenkatachaitanya/MTF2025",
    demo: "https://mtf2025.netlify.app/",
    featured: false,
  },
  {
    id: 8,
    name: "USB Security Panel",
    fullName: "USB Physical Security Control Panel",
    description:
      "Windows desktop security app preventing unauthorized USB access via registry-level control, PBKDF2 auth, OpenCV intruder detection, and audit logging.",
    tags: [
      "Python",
      "Tkinter",
      "SQLite",
      "OpenCV",
      "Windows Registry",
      "SMTP",
      "PBKDF2",
    ],
    category: ["Cybersecurity"],
    github:
      "https://github.com/karnamvenkatachaitanya/USB-physical-securety",
    demo: null,
    featured: false,
  },
  {
    id: 9,
    name: "Language Club NBKRIST",
    fullName: "Language Club NBKRIST — Event Management Website",
    description:
      "Responsive club management web app for 200+ students, built with React and Supabase. Dynamic content management, form handling, live on Netlify.",
    tags: [
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Netlify",
    ],
    category: ["Full-Stack"],
    github:
      "https://github.com/languageclub-nbkrist/language-club-nbkrist",
    demo: "https://languageclubnbkrist.netlify.app/",
    featured: false,
  },
];

export const PROJECT_FILTERS = [
  "All",
  "AI / Agentic",
  "Full-Stack",
  "Cybersecurity",
  "GovTech",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];
