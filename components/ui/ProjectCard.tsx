"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  layoutVariant?: "hero" | "featured" | "compact";
}

export function ProjectCard({
  project,
  featured = false,
  layoutVariant = featured ? "featured" : "compact",
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-secondary p-6 2xl:p-8 3xl:p-10 transition-shadow hover:shadow-lg dark:border-border-dark",
        layoutVariant === "hero" && "lg:col-span-2 lg:p-8 2xl:p-10 3xl:p-12",
        layoutVariant === "featured" && "lg:p-7 2xl:p-9 3xl:p-11",
        featured && layoutVariant !== "compact" && "min-h-[220px] 2xl:min-h-[280px] 3xl:min-h-[320px]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-pop/0 via-accent-pop/0 to-accent-pop/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent-pop/20 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            "font-display font-semibold tracking-tight text-text-primary",
            layoutVariant === "hero" ? "text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl" : "text-xl 2xl:text-2xl 3xl:text-3xl"
          )}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-2 flex-1 text-text-secondary",
            layoutVariant === "hero"
              ? "text-base leading-relaxed 2xl:text-lg 3xl:text-xl"
              : "text-sm leading-relaxed 2xl:text-base 3xl:text-lg"
          )}
        >
          {(() => {
            const phrases = [
              "111% reward improvement",
              "AI CEO",
              "90-day strategic business decisions",
              "voice, gesture, OCR, and barcode interaction",
              "microservices architecture",
              "digitizing land dispute resolution",
              "OCR, LLM classification",
              "autonomous agents",
              "IIT Madras E-Cell Finalist",
              "Supabase row-level security",
              "ML demand forecasting",
              "QR visitor registration",
              "preventing unauthorized USB access",
              "OpenCV intruder detection",
              "club management web app"
            ];
            const escapedPhrases = phrases.map(p => p.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            const regex = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
            const parts = project.description.split(regex);
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
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5 2xl:gap-2">
          {project.tags.slice(0, layoutVariant === "hero" ? 8 : 5).map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] 2xl:text-xs 2xl:px-2 2xl:py-1 3xl:text-sm text-text-muted dark:border-border-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 2xl:gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} live demo`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs 2xl:px-4 2xl:py-2 2xl:text-sm 3xl:px-5 3xl:py-2.5 3xl:text-base font-medium transition-colors hover:bg-accent hover:text-bg-primary dark:border-border-dark"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs 2xl:px-4 2xl:py-2 2xl:text-sm 3xl:px-5 3xl:py-2.5 3xl:text-base font-medium transition-colors hover:bg-accent hover:text-bg-primary dark:border-border-dark"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
