"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="inline-block rounded-md border border-border bg-bg-secondary px-3 py-1.5 2xl:px-4 2xl:py-2 2xl:text-sm 3xl:px-5 3xl:py-2.5 3xl:text-base font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-text-primary dark:border-border-dark"
    >
      {skill}
    </motion.span>
  );
}
