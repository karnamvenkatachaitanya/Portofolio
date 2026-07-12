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
      "Tailwind CSS",
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
      "SQL Injection",
      "Registry Manipulation",
      "CTF",
      "Secure Password Hashing (PBKDF2)",
      "Audit Logging",
      "Firewall Config",
    ],
  },
];
