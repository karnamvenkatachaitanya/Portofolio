"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  projects,
  PROJECT_FILTERS,
  type ProjectFilter,
} from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Nine builds. Zero slide decks."
        />

        <ScrollReveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-label={`Filter projects by ${f}`}
                aria-pressed={filter === f}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  filter === f
                    ? "border-accent bg-accent text-bg-primary dark:bg-accent-pop dark:text-accent"
                    : "border-border text-text-secondary hover:border-accent dark:border-border-dark"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {featured.length > 0 && (
          <div
            className="grid gap-6 lg:grid-cols-2 2xl:gap-8"
            style={{ perspective: "1200px" }}
          >
          <AnimatePresence mode="sync">
            {featured.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  layoutVariant={index === 0 ? "hero" : "featured"}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {rest.length > 0 && (
          <div
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6"
            style={{ perspective: "1200px" }}
          >
            <AnimatePresence mode="sync">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
