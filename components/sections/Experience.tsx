"use client";

import { experience } from "@/lib/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading
          title="Experience"
          subtitle={
            <>
              <span className="highlight-word">Building</span>, <span className="highlight-word">securing</span>, and <span className="highlight-word">shipping</span> — across roles.
            </>
          }
        />

        <ScrollReveal>
          <div className="mt-4">
            {experience.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
