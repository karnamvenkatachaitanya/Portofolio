"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: "9", label: "Projects" },
  { value: "5", label: "Internships/Roles" },
  { value: "12+", label: "Awards & Certs" },
  { value: "Top 2.8%", label: "Nationwide" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading title="About" />

        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 2xl:gap-24 3xl:gap-32">
          <ScrollReveal>
            <blockquote className="font-display text-3xl font-medium leading-snug tracking-tight text-text-primary md:text-4xl 2xl:text-5xl 3xl:text-6xl">
              I don&apos;t just learn AI — I{" "}
              <span className="bg-accent-pop/30 px-1">deploy</span> it.
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-5 text-base 2xl:text-lg 3xl:text-xl leading-[1.7] text-text-secondary">
              <p>
                I&apos;m a <span className="highlight-word">final-year Artificial Intelligence &amp; Data Science student</span> at NBKR Institute
                of Science &amp; Technology, but my classroom is wherever there&apos;s
                a problem worth solving. From <span className="highlight-word">winning the PayTM Ideathon</span> in
                Bangalore to placing in the <span className="highlight-word">top 2.8% of 70,000+ participants</span> at
                the Meta PyTorch hackathon, I&apos;ve built a track record of
                shipping under pressure.
              </p>
              <p>
                What drives me isn&apos;t the hype around AI — it&apos;s the moment
                when a system actually <span className="highlight-word">works in production</span>. Whether it&apos;s an
                <span className="highlight-word">offline-first kiosk for specially-abled users</span> or a <span className="highlight-word">multi-agent RL environment simulating business decisions</span>, I care about outcomes,
                not demos.
              </p>
              <p>
                My range spans <span className="highlight-word">agentic AI systems</span>, <span className="highlight-word">full-stack product development</span>,
                and <span className="highlight-word">cybersecurity</span> — a combination that lets me build end-to-end:
                from <span className="highlight-word">securing the infrastructure to deploying the models</span> to
                crafting the interface users touch.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 2xl:gap-6 3xl:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-xl border border-border p-6 2xl:p-8 3xl:p-10 text-center dark:border-border-dark">
                <p className="font-display text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm 2xl:text-base 3xl:text-lg text-text-secondary">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
