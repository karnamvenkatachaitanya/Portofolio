"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl 2xl:text-6xl 3xl:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-text-secondary 2xl:text-xl 2xl:max-w-3xl 3xl:text-2xl 3xl:max-w-4xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
