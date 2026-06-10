export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  tags: string[];
  current: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: "AI & Agentic AI Intern",
    company: "Datavalley India Pvt. Ltd.",
    period: "May 2026 – Present",
    location: "Hyderabad (Online)",
    description: [
      "Building agentic AI architectures and LLM-powered workflow automation systems.",
      "Designing intelligent automation pipelines for real-world enterprise use cases.",
      "Collaborating with cross-functional teams on production-grade AI deployments.",
    ],
    tags: ["Agentic AI", "LLMs", "Automation", "Python"],
    current: true,
  },
  {
    id: 2,
    role: "Freelance Product Developer",
    company: "C2C Community",
    period: "Aug 2025 – Present",
    location: "Remote",
    description: [
      "Full-stack engineer building AI-driven product features end-to-end.",
      "Collaborating with Data Scientists, AI Engineers, and DevOps on shipped products.",
      "Rapid prototyping and production deployment of client-facing features.",
    ],
    tags: ["React", "Next.js", "AI Integration", "Full-Stack"],
    current: true,
  },
  {
    id: 3,
    role: "Cyber Security Intern",
    company: "Supraja Technologies Pvt. Ltd.",
    period: "June – September 2025",
    location: "Vijayawada (Offline)",
    description: [
      "Conducted VAPT assessments using Burp Suite, Metasploit, Nmap, and Nessus.",
      "Identified and documented security vulnerabilities across client infrastructure.",
      "Awarded Letter of Recommendation from CEO for exceptional performance.",
    ],
    tags: ["VAPT", "Burp Suite", "Metasploit", "Nmap", "Nessus"],
    current: false,
  },
  {
    id: 4,
    role: "Student Coordinator",
    company: "Language Club, NBKRIST",
    period: "2023 – 2026 · 3 Years",
    location: "NBKRIST",
    description: [
      "Led a 100+ member club and organized 50+ cultural and academic events.",
      "Built and maintained the club's official website and digital presence.",
      "Received Certificate of Appreciation for leadership in 2024–25.",
    ],
    tags: ["Leadership", "Event Management", "React", "Supabase"],
    current: false,
  },
  {
    id: 5,
    role: "IEEE Student Member",
    company: "IEEE",
    period: "Jan 2024 – Present",
    location: "NBKRIST Chapter",
    description: [
      "Active participant in AI, Cybersecurity, and Software Engineering seminars.",
      "Professional networking with industry experts and academic researchers.",
      "Contributed to technical workshops and knowledge-sharing sessions.",
    ],
    tags: ["IEEE", "AI", "Cybersecurity", "Networking"],
    current: true,
  },
];
