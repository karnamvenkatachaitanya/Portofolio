export const PORTFOLIO_CONTEXT = `
ABOUT KARNAM VENKATA CHAITANYA
================================
Karnam Venkata Chaitanya is a final-year Artificial Intelligence & Data Science student at NBKR Institute of Science & Technology (NBKRIST), Nellore, Andhra Pradesh, India. He is an AI Engineer, Product Builder, and Full-Stack Developer who builds production-grade AI systems and ships real products — not just demos. His tagline is "I Build AI That Works in the Real World."

He has:
- Won the PayTM Ideathon 2026 at PayTM's Bangalore office
- Ranked Top 2.8% nationwide in the Meta PyTorch OpenEnv Hackathon × Scaler out of 70,000+ participants
- Reached the Finals at IIT Madras E-Cell I-Summit / E-Summit'26 (out of 1000+ submissions, in front of 80+ VCs)
- Won 1st Prize in Paper Presentation at GNOSIS National Symposium 2025
- Delivered an AI Workshop as a Speaker at the "CONNECT WITH AI" event at NBKRIST 2026
- Been shortlisted at the Google Developer Groups (GDG) BUILD-A-THON On-Campus

He is currently available for full-time AI/Full-Stack roles and freelance projects. He typically responds within 24 hours.

His personal philosophy: "I don't just learn AI — I deploy it." What drives him isn't the hype around AI — it's the moment when a system actually works in production. Whether it's an offline-first kiosk for specially-abled users or a multi-agent RL environment simulating business decisions, he cares about outcomes, not demos.

His range spans agentic AI systems, full-stack product development, and cybersecurity — a rare combination that lets him build end-to-end: from securing the infrastructure to deploying the models to crafting the interface users touch.

KEY STATS:
- 9 deployed/in-progress projects
- 5 professional internships/roles
- 15+ awards and certifications
- Top 2.8% nationwide ranking

EDUCATION
================================
- Degree: B.Tech in Artificial Intelligence & Data Science (AI&DS)
- College: NBKR Institute of Science & Technology (NBKRIST)
- Location: Nellore, Andhra Pradesh, India
- Year: Final year (expected graduation 2026)
- Notable: Certificate of Merit for Academic & Extracurricular Excellence, 2023–24

EXPERIENCE (DETAILED)
================================

1. AI & Agentic AI Intern — Datavalley India Pvt. Ltd.
   Period: May 2026 – Present
   Location: Hyderabad (Online/Remote)
   What he does:
   - Building agentic AI architectures and LLM-powered workflow automation systems
   - Designing intelligent automation pipelines for real-world enterprise use cases
   - Collaborating with cross-functional teams on production-grade AI deployments
   Technologies: Agentic AI, LLMs, Automation, Python

2. Freelance Product Developer — C2C Community
   Period: August 2025 – Present
   Location: Remote
   What he does:
   - Full-stack engineer building AI-driven product features end-to-end
   - Collaborating with Data Scientists, AI Engineers, and DevOps on shipped products
   - Rapid prototyping and production deployment of client-facing features
   Technologies: React, Next.js, AI Integration, Full-Stack

3. Cyber Security Intern — Supraja Technologies Pvt. Ltd.
   Period: June – September 2025
   Location: Vijayawada (On-site, Offline)
   What he did:
   - Conducted VAPT (Vulnerability Assessment & Penetration Testing) assessments using Burp Suite, Metasploit, Nmap, and Nessus
   - Identified and documented security vulnerabilities across client infrastructure
   - Awarded a Letter of Recommendation from the CEO for exceptional performance
   Technologies: VAPT, Burp Suite, Metasploit, Nmap, Nessus

4. Student Coordinator — Language Club, NBKRIST
   Period: 2023 – 2026 (3 years)
   Location: NBKRIST
   What he did:
   - Led a 100+ member club and organized 50+ cultural and academic events
   - Built and maintained the club's official website and digital presence (languageclubnbkrist.netlify.app)
   - Received Certificate of Appreciation for leadership in 2024–25

5. IEEE Student Member
   Period: January 2024 – Present
   Location: NBKRIST Chapter
   What he does:
   - Active participant in AI, Cybersecurity, and Software Engineering seminars
   - Professional networking with industry experts and academic researchers
   - Contributed to technical workshops and knowledge-sharing sessions

PROJECTS (DETAILED)
================================

1. ATLAS — AI-Driven Multi-Agent Business Simulation
   Category: AI / Agentic
   Description: A multi-agent reinforcement learning environment where an AI CEO makes 90-day strategic business decisions. The system simulates a realistic business environment with multiple departments (marketing, engineering, sales, HR) as AI agents that interact and compete for resources.
   Key Achievement: Achieved 111% reward improvement from baseline through GRPO (Group Relative Policy Optimization).
   How it works: The AI CEO agent observes market conditions, resource levels, and department performance metrics. It then allocates budgets, sets priorities, and makes strategic decisions. The environment provides rewards based on revenue growth, employee satisfaction, and market share. Uses Hugging Face TRL for training the RL policies.
   Tech Stack: Python, FastAPI, React, Reinforcement Learning, GRPO, Hugging Face TRL, WebSocket (for real-time simulation updates), Docker
   GitHub: https://github.com/karnamvenkatachaitanya/ATLAS
   Live Demo: https://huggingface.co/spaces/nelluru/ATLAS

2. Kiosk Vision — AI-Powered Inclusive Self-Service Kiosk
   Category: AI / Agentic
   Description: An offline-first smart kiosk designed specifically for specially-abled users. It supports multiple interaction modalities — voice commands, hand gesture recognition (via MediaPipe), OCR text scanning (via Tesseract), and barcode scanning. The entire system runs on a LAN without internet, using Ollama for local LLM inference.
   Architecture: Fully LAN-deployed microservices architecture with Docker containers for inter-service communication.
   Use Case: Accessibility-focused self-service terminal for banks, hospitals, or government offices where specially-abled users can interact naturally without a keyboard/mouse.
   Tech Stack: React, TypeScript, FastAPI, Ollama (local LLM), MediaPipe (gesture recognition), Tesseract OCR, Docker
   GitHub: https://github.com/karnamvenkatachaitanya/Kiosk-vision

3. RevenueSeva — AI Land Grievance Redressal System
   Category: AI / Agentic, Full-Stack, GovTech
   Description: A full-stack GovTech platform that digitizes land dispute resolution for Indian revenue departments. Citizens can submit land grievances, which are processed through OCR (PaddleOCR) to extract document data, then classified using an LLM (Ollama Qwen2.5) to determine the type and urgency of the grievance.
   Key Features:
   - 5-tier Role-Based Access Control (RBAC): Citizen → Village Officer → Mandal Revenue Officer → District Collector → State Admin
   - OCR document processing with PaddleOCR
   - LLM-based grievance classification with Ollama (Qwen2.5)
   - Voice accessibility via gTTS (Google Text-to-Speech) for illiterate users
   - Firebase authentication
   - Built for the GDG BUILD-A-THON
   Tech Stack: React, TypeScript, Node.js, MongoDB, PaddleOCR, Ollama (Qwen2.5), Firebase, gTTS
   GitHub: https://github.com/karnamvenkatachaitanya/buildathon
   Live Demo: https://revenueseva.netlify.app/

4. AgentSeva — Local-First AI Automation Platform
   Category: AI / Agentic
   Description: An AI automation platform for business workflows. It uses autonomous agents orchestrated through n8n workflows, combined with vector-based knowledge retrieval (RAG) from a Supabase-backed vector database, and automated email communication.
   Key Achievement: IIT Madras E-Cell Finalist — presented at I-Summit / E-Summit'26 in front of 80+ VCs.
   Use Case: Small businesses can automate customer support, lead qualification, email campaigns, and knowledge base queries without writing code.
   Tech Stack: n8n (workflow automation), Supabase, Gemini AI, Vector DB, PostgreSQL, JavaScript
   GitHub: https://github.com/karnamvenkatachaitanya/agentseva

5. Project Bhaasha — AI Language Learning Platform
   Category: AI / Agentic, Full-Stack
   Description: A full-stack AI-driven language learning application with multi-role authentication (admin, trainer, learner), speech evaluation simulation, and Supabase Row-Level Security (RLS) for data isolation between users.
   Key Features:
   - Multi-role auth system (admin/trainer/learner) with different dashboards
   - AI-powered speech evaluation
   - Supabase RLS for secure multi-tenant data access
   - Unit tested with Vitest
   Tech Stack: React, FastAPI, Supabase, PostgreSQL, Vitest
   GitHub: https://github.com/karnamvenkatachaitanya/Project-Bhaasha
   Live Demo: https://projectbhaasha.netlify.app/

6. SVN Lake Palace — AI Hospitality Analytics Platform
   Category: AI / Agentic, Full-Stack
   Description: A unified analytics platform for a hotel business that integrates data from IDS Next PMS (Property Management System), Pet Pooja POS (Point of Sale), and Reelo CRM (Customer Loyalty). Provides ML-based demand forecasting using Scikit-Learn to predict room occupancy, restaurant demand, and optimize pricing.
   Key Features:
   - Multi-source data integration via ETL pipelines
   - ML demand forecasting with Scikit-Learn
   - Unified dashboard for hotel + restaurant + loyalty analytics
   Tech Stack: Python, React, PostgreSQL, Scikit-Learn, Docker, ETL

7. Mega Trade Fair 2025 — Event Management Platform
   Category: Full-Stack
   Description: A full-stack event management platform built for a trade fair with 100+ exhibitors. Features QR-based visitor registration, JWT authentication, exhibitor search/filtering, and a real-time event schedule.
   Tech Stack: React, Django, PostgreSQL, JWT, Tailwind CSS
   GitHub: https://github.com/karnamvenkatachaitanya/MTF2025
   Live Demo: https://mtf2025.netlify.app/

8. USB Physical Security Control Panel
   Category: Cybersecurity
   Description: A Windows desktop security application that prevents unauthorized USB access through Windows registry-level control. Features PBKDF2 password hashing for secure authentication, OpenCV-based intruder detection (captures a photo via webcam when unauthorized access is attempted), comprehensive audit logging, and SMTP email alerts.
   Key Features:
   - Registry-level USB port enable/disable
   - PBKDF2 secure password hashing
   - OpenCV webcam intruder detection
   - SMTP email alerts on security events
   - SQLite audit logging
   Tech Stack: Python, Tkinter, SQLite, OpenCV, Windows Registry, SMTP, PBKDF2
   GitHub: https://github.com/karnamvenkatachaitanya/USB-physical-securety

9. Language Club NBKRIST — Event Management Website
   Category: Full-Stack
   Description: A responsive club management web application for 200+ students at the Language Club of NBKRIST. Features dynamic content management, form handling, and is live on Netlify.
   Tech Stack: React, Supabase, PostgreSQL, Tailwind CSS, Netlify
   GitHub: https://github.com/languageclub-nbkrist/language-club-nbkrist
   Live Demo: https://languageclubnbkrist.netlify.app/

ACHIEVEMENTS (DETAILED)
================================
1. Top 2.8% Nationwide — Meta PyTorch OpenEnv Hackathon × Scaler
   - Out of 70,000+ participants nationwide
   - Demonstrated expertise in PyTorch and deep learning

2. Winner — PayTM Ideathon 2026
   - Won at PayTM's official Bangalore office
   - Competed against top teams from across India

3. Finalist — I-Summit, E-Summit'26 — IIT Madras E-Cell
   - Out of 1000+ submissions
   - Presented in front of 80+ Venture Capitalists
   - Pitched the AgentSeva project

4. 1st Prize — Paper Presentation at GNOSIS National Symposium 2025
   - National-level academic symposium
   - Presented research paper on AI systems

5. Best Student — Cybersecurity Level-1 CTF Hackathon
   - Organized by Supraja Technologies
   - Demonstrated skills in Capture The Flag challenges

6. AI Workshop Speaker — "CONNECT WITH AI" at NBKRIST 2026
   - Delivered a workshop on AI concepts and applications
   - Taught fellow students about practical AI implementation

7. Shortlisted — BUILD-A-THON, Google Developer Groups (GDG) On-Campus
   - Built the RevenueSeva project for this hackathon

8. Runner-Up — CANVA CLASH, IEEE NEXUSVERSE-2K25
   - Design competition organized by IEEE

9. Certificate of Appreciation — Language Club Website Lead, NBKRIST
   - Recognized for building and maintaining the club's digital presence

10. Certificate of Merit — Academic & Extracurricular Excellence, NBKRIST 2023–24
    - Recognized for outstanding performance in both academics and extracurriculars

11. 48-Hour National Hackathon — Geethanjali + Vaultsphere AI, January 2026
    - Participated in an intensive 48-hour hackathon

SKILLS (DETAILED)
================================

AI & Agentic Systems (Primary Expertise):
- Large Language Models (LLMs): Working with models like Llama 3.3, Qwen2.5, Gemini AI
- Agentic AI: Building autonomous agent systems that make decisions and take actions
- Reinforcement Learning: GRPO, policy optimization, reward engineering (used in ATLAS)
- LangChain: Building LLM application chains
- Ollama: Running LLMs locally/offline (used in Kiosk Vision, RevenueSeva)
- Hugging Face: Model hosting, TRL for training, Spaces for deployment
- RAG Systems: Retrieval-Augmented Generation with vector databases
- Prompt Engineering: Crafting effective prompts for LLM applications
- Multi-Agent Systems: Designing systems with multiple cooperating/competing AI agents
- AI Automation: n8n workflow automation with AI integration
- Computer Vision: OpenCV for image processing, MediaPipe for gesture recognition
- OCR: PaddleOCR, Tesseract OCR for document processing
- PyTorch: Deep learning framework (Top 2.8% in Meta PyTorch Hackathon)
- Scikit-Learn: Traditional ML algorithms, demand forecasting

Full-Stack Development:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: FastAPI (Python), Django (Python), Node.js, Express.js
- APIs: REST APIs, JWT Authentication, WebSocket (real-time)
- Databases: PostgreSQL, MongoDB, SQLite, Supabase (with RLS)
- DevOps: Docker (containerization), Netlify (deployment)

Cybersecurity:
- VAPT: Vulnerability Assessment & Penetration Testing
- Tools: Burp Suite, Metasploit, Nmap, Nessus
- Attacks: SQL Injection
- System Security: Windows Registry Manipulation, Firewall Configuration
- Secure Coding: PBKDF2 password hashing, audit logging
- CTF: Capture The Flag challenges (won Best Student award)

CONTACT & AVAILABILITY
================================
- Portfolio Website: https://chaitanya.qzz.io
- GitHub: https://github.com/karnamvenkatachaitanya
- Email: venkatachaitanyakarnam@gmail.com (also: me@chaitanya.qzz.io)
- LinkedIn: https://www.linkedin.com/in/venkata-chaitanya-karnam-5849322ba/
- WhatsApp: https://wa.me/919491803089 (Phone: +91 94918 03089)
- Resume: Available for download on the portfolio website
- Response Time: Typically responds within 24 hours
- Open to: Full-time AI/Full-Stack roles, Freelance projects
- Location: Andhra Pradesh, India (open to remote/relocation)

The portfolio website has a contact form that visitors can use to send him a message directly.

WHY WORK WITH CHAITANYA
================================
- Ships real products, not just demos — 9 deployed/in-progress projects with live demos
- Won PayTM Ideathon 2026 at Bangalore, IIT Madras E-Cell Finalist, Top 2.8% in Meta PyTorch hackathon out of 70,000+ participants
- Rare triple-threat: AI + Full-Stack + Cybersecurity — can build end-to-end from securing infrastructure to deploying models to crafting the interface
- Experience working in cross-functional teams with Data Scientists, DevOps, AI Engineers
- IEEE Member, AI Workshop Speaker, National Paper Presentation 1st Prize winner
- Currently interning at Datavalley India on production Agentic AI systems (May 2026 – present)
- Strong open-source presence with 9 GitHub repositories
- Proven ability to ship under pressure: hackathon wins, tight deadlines, production deployments

FREQUENTLY ASKED QUESTIONS
================================

Q: What is Chaitanya's best/most impressive project?
A: ATLAS is his most technically impressive project — a multi-agent RL environment with 111% reward improvement. RevenueSeva (GovTech with OCR + LLM + 5-tier RBAC) and Kiosk Vision (offline-first accessibility kiosk) are equally impactful in terms of real-world value.

Q: What programming languages does Chaitanya know?
A: Python (primary for AI/ML and backend), TypeScript/JavaScript (full-stack web development), and SQL (database queries). He's also proficient with HTML/CSS for frontend work.

Q: Does Chaitanya have production/deployment experience?
A: Yes. Multiple projects are deployed and live: RevenueSeva (revenueseva.netlify.app), Project Bhaasha (projectbhaasha.netlify.app), ATLAS (huggingface.co/spaces/nelluru/ATLAS), MTF2025 (mtf2025.netlify.app), and the Language Club website. He uses Docker for containerization and has experience with cloud deployments.

Q: Can Chaitanya work remotely?
A: Yes. His current Datavalley internship is remote (Hyderabad Online), and his C2C freelance work is fully remote. He's comfortable working across time zones.

Q: What is Chaitanya's approach to building products?
A: He focuses on production-grade systems over demos. He emphasizes: working AI in production, user-centric design, secure architecture, and rapid prototyping to production deployment.

Q: How can I hire or contact Chaitanya?
A: You can reach him via email at venkatachaitanyakarnam@gmail.com, through the contact form on his portfolio website (chaitanya.qzz.io), via LinkedIn, or on WhatsApp at +91 94918 03089. He typically responds within 24 hours.
`;
