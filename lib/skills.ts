export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI & Agentic Systems",
    skills: [
      "LLMs",
      "Agentic AI",
      "Reinforcement Learning",
      "LangChain",
      "Ollama",
      "Hugging Face",
      "RAG Systems",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "AI Automation",
      "n8n",
      "OpenCV",
      "Whisper",
      "PaddleOCR",
      "PyTorch",
      "Scikit-Learn",
    ],
  },
  {
    id: "fullstack",
    label: "Full-Stack Development",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "FastAPI",
      "Django",
      "Node.js",
      "Express",
      "REST APIs",
      "JWT Auth",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "Supabase",
      "Redis",
      "Docker",
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    skills: [
      "VAPT",
      "Penetration Testing",
      "Burp Suite",
      "Metasploit",
      "Nmap",
      "Nessus",
      "OWASP ZAP",
      "SQL Injection",
      "XSS",
      "Registry Manipulation",
      "CTF",
      "Secure Password Hashing (PBKDF2)",
      "Audit Logging",
      "Firewall Config",
    ],
  },
];
