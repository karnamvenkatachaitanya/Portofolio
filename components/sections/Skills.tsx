"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const activeCategory = skillCategories.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="scroll-mt-24 bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading
          title="Skills"
          subtitle={
            <>
              Three domains, one <span className="highlight-word">builder mindset</span>.
            </>
          }
        />

        <ScrollReveal>
          <div className="mb-10 flex flex-wrap gap-2 2xl:gap-3">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                aria-label={`Show ${cat.label} skills`}
                aria-pressed={activeId === cat.id}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm 2xl:text-base 3xl:text-lg font-medium transition-all",
                  activeId === cat.id
                    ? "border-accent bg-accent text-bg-primary dark:bg-accent-pop dark:text-bg-dark"
                    : "border-border text-text-secondary hover:border-accent hover:text-text-primary dark:border-border-dark"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 2xl:gap-3">
            <AnimatePresence mode="sync">
              {activeCategory.skills.map((skill, i) => (
                <SkillBadge key={`${activeId}-${skill}`} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
