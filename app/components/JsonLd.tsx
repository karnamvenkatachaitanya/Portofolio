import React from "react";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://chaitanya.qzz.io/#person",
        "name": "Karnam Venkata Chaitanya",
        "alternateName": ["Chaitanya Karnam", "Venkata Chaitanya Karnam", "KVC"],
        "url": "https://chaitanya.qzz.io",
        "image": "https://chaitanya.qzz.io/images/avatar.jpg",
        "jobTitle": "AI Engineer & Full-Stack Developer",
        "description": "Agentic AI Developer and Full-Stack Engineer. Final-year AI & Data Science student at NBKR Institute of Science & Technology, Andhra Pradesh. Top 2.8% at Meta PyTorch Hackathon.",
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "NBKR Institute of Science & Technology",
          "alternateName": "NBKRIST",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Andhra Pradesh",
            "addressCountry": "IN"
          }
        },
        "knowsAbout": [
          "Agentic AI",
          "Large Language Models",
          "Reinforcement Learning",
          "Full-Stack Development",
          "Cybersecurity",
          "LangChain",
          "Ollama",
          "RAG Systems"
        ],
        "sameAs": [
          "https://github.com/karnamvenkatachaitanya",
          "https://www.linkedin.com/in/venkata-chaitanya-karnam-5849322ba/"
        ],
        "award": [
          "Top 2.8% Nationwide — Meta PyTorch OpenEnv Hackathon × Scaler (70,000+ participants)",
          "Winner — PayTM Ideathon 2026, Bangalore",
          "Finalist — I-Summit E-Summit'26, IIT Madras E-Cell",
          "1st Prize — Paper Presentation, GNOSIS National Symposium 2025"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://chaitanya.qzz.io/#website",
        "url": "https://chaitanya.qzz.io",
        "name": "Karnam Venkata Chaitanya Portfolio",
        "description": "Portfolio of Karnam Venkata Chaitanya — AI Engineer, Agentic AI Developer, Full-Stack Developer",
        "author": {
          "@id": "https://chaitanya.qzz.io/#person"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
