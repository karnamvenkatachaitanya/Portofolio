export interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  featured: boolean;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    icon: "trophy",
    title: "Top 2.8% Nationwide",
    description:
      "Meta PyTorch OpenEnv Hackathon × Scaler (70,000+ participants)",
    featured: true,
  },
  {
    id: 2,
    icon: "trophy",
    title: "Winner — PayTM Ideathon 2026",
    description: "Bangalore Office",
    featured: true,
  },
  {
    id: 3,
    icon: "target",
    title: "Finalist — I-Summit, E-Summit'26",
    description:
      "IIT Madras E-Cell (1000+ submissions, 80+ VCs)",
    featured: true,
  },
  {
    id: 4,
    icon: "fileText",
    title: "1st Prize — Paper Presentation",
    description: "GNOSIS National Symposium 2025",
    featured: false,
  },
  {
    id: 5,
    icon: "shield",
    title: "Best Student — Cybersecurity CTF",
    description: "Level-1 Hackathon, Supraja Technologies",
    featured: false,
  },
  {
    id: 6,
    icon: "mic",
    title: "AI Workshop Speaker",
    description: '"CONNECT WITH AI", NBKRIST 2026',
    featured: false,
  },
  {
    id: 7,
    icon: "sparkles",
    title: "Shortlisted — BUILD-A-THON",
    description: "Google Developer Groups (GDG) On-Campus",
    featured: false,
  },
  {
    id: 8,
    icon: "palette",
    title: "Runner-Up — CANVA CLASH",
    description: "IEEE NEXUSVERSE-2K25",
    featured: false,
  },
  {
    id: 9,
    icon: "award",
    title: "Certificate of Appreciation",
    description: "Language Club Website Lead, NBKRIST",
    featured: false,
  },
  {
    id: 10,
    icon: "award",
    title: "Certificate of Merit",
    description: "Academic & Extracurricular Excellence, NBKRIST 2023–24",
    featured: false,
  },
  {
    id: 11,
    icon: "calendar",
    title: "48-Hour National Hackathon",
    description: "Geethanjali + Vaultsphere AI, Jan 2026",
    featured: false,
  },
];
