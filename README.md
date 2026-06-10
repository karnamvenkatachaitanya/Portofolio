# 💻 Karnam Venkata Chaitanya — Professional Portfolio

> **I Build AI That Works in the Real World.**

Welcome to the repository of my personal portfolio website. This is a high-performance, responsive, and visually stunning web application built using Next.js, TypeScript, and Tailwind CSS. It highlights my projects, skills, and achievements, and features an integrated Agentic AI Chatbot that interacts with visitors in real-time.

---

## 🛠️ Tech Stack & Design System

*   **Core Framework**: [Next.js 14](https://nextjs.org/) (App Router) & React 18
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Premium HSL-tailored custom color palette, smooth dark mode configuration)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth page micro-animations and transitions) & [Lenis](https://lenis.darkroom.engineering/) (Ultra-smooth kinetic scrolling)
*   **AI Integration**: [Hugging Face Inference API](https://huggingface.co/) running `meta-llama/Llama-3.3-70B-Instruct`
*   **Email Engine**: [Resend](https://resend.com/) with a built-in zero-key fallback to [FormSubmit.co](https://formsubmit.co/)

---

## ✨ Features

### 🤖 1. Interactive AI Chatbot
An Agentic AI assistant built with Hugging Face Llama 3.3 to act as an automated agent on the portfolio. It is pre-configured with direct context to answer questions about my background, work history, cybersecurity practitioners, and contact methods.
*   **Scroll-Isolated**: Wheel interactions are captured inside the chat box without scrolling the background website (Lenis scroll prevention).
*   **Chat History Clearing**: Includes a trash/reset action button in the chat header.
*   **Keyboard Control**: Native focus tracking and cursor interaction.

### 🏆 2. Achievements & Milestones Showcase
A dynamic section that maps items (like Paytm Ideathon winner, Meta PyTorch Hackathon finalist, etc.) to themed badges with custom Lucide React icons (removing generic emojis).

### 📬 3. Contact Form & Connect Cards
*   **Large Interaction Badges**: Highly visible connecting cards (GitHub, LinkedIn, WhatsApp, Email) with size-transition micro-animations on hover.
*   **Manual Subject Inputs**: Avoids pre-filled dropdowns so users can manually write their custom message titles.

### 📐 4. Responsive & Low-Footprint Layout
*   Optimized container widths and typography for mobile, laptop, and ultra-wide monitor views.
*   **Compact Footer**: Clean, single-row layout that merges copyright info, technical stack, and navigation, removing massive empty spaces.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.x or higher recommended)
- `pnpm` package manager (`npm install --global pnpm`)

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/karnamvenkatachaitanya/Portofolio.git
    cd Portofolio
    ```

2.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```bash
    cp .env.local.example .env.local
    ```
    Add your API credentials:
    ```env
    HUGGINGFACE_API_KEY=your_huggingface_api_key_here
    CONTACT_EMAIL=me@chaitanya.qzz.io
    RESEND_API_KEY=your_optional_resend_api_key_here
    ```

4.  **Run Development Server**:
    Clean the Next.js cache and start hot-reload mode:
    ```bash
    pnpm dev:clean
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it locally.

---

## 📦 Production Build & Hosting

To verify everything compiles and optimizes cleanly:
```bash
pnpm build
pnpm start
```

For hosting setup instructions on **AWS Amplify (Serverless)** or **AWS EC2**, please refer to the detailed [hosting.md](file:///c:/Users/venka/Desktop/Chaitanya/portfolio/hosting.md) file included in this directory.
