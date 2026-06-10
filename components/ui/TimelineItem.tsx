"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ExperienceItem } from "@/lib/experience";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ item, index, isLast = false }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative grid grid-cols-[24px_1fr] gap-4 md:grid-cols-[32px_1fr] md:gap-6"
    >
      <div className="flex flex-col items-center pt-1.5">
        <div
          className={cn(
            "z-10 h-3 w-3 shrink-0 rounded-full border-2",
            item.current
              ? "border-accent-pop bg-accent-pop"
              : "border-border bg-bg-primary dark:border-border-dark"
          )}
        />
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-border dark:bg-border-dark" />
        )}
      </div>

      <div className={cn("pb-10", isLast && "pb-0")}>
        <div className="rounded-xl border border-border bg-bg-primary p-5 md:p-6 2xl:p-8 3xl:p-10 dark:border-border-dark">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-text-primary 2xl:text-xl 3xl:text-2xl">
                {item.company}
              </h3>
              <span className="mt-1.5 inline-block rounded-md bg-bg-secondary px-2 py-0.5 text-xs 2xl:text-sm 3xl:text-base font-medium text-text-secondary">
                {item.role}
              </span>
            </div>
            <div className="shrink-0 text-xs 2xl:text-sm 3xl:text-base text-text-muted sm:text-right">
              <p>{item.period}</p>
              <p>{item.location}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2 2xl:space-y-3">
            {item.description.map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-sm 2xl:text-base 3xl:text-lg leading-relaxed text-text-secondary"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                <span>
                  {(() => {
                    const phrases = [
                      "agentic AI architectures",
                      "LLM-powered workflow automation",
                      "intelligent automation pipelines",
                      "production-grade AI deployments",
                      "AI-driven product features",
                      "cross-functional teams",
                      "VAPT assessments",
                      "documented security vulnerabilities",
                      "official website",
                      "AI, Cybersecurity, and Software Engineering",
                      "technical workshops"
                    ];
                    const escapedPhrases = phrases.map(p => p.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    const regex = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
                    const parts = point.split(regex);
                    return parts.map((part, index) => {
                      if (phrases.some(p => p.toLowerCase() === part.toLowerCase())) {
                        return (
                          <span key={index} className="highlight-word">
                            {part}
                          </span>
                        );
                      }
                      return part;
                    });
                  })()}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5 2xl:gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] 2xl:text-xs 2xl:px-2 2xl:py-1 3xl:text-sm text-text-muted dark:border-border-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
