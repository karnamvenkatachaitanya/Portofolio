"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Achievement } from "@/lib/achievements";
import { cn } from "@/lib/utils";
import { Trophy, Target, Award, Shield, Mic, Sparkles, Palette, FileText, Calendar } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const getIcon = (iconName: string) => {
  const className = "h-5 w-5";
  switch (iconName) {
    case "trophy":
      return <Trophy className={`${className} text-amber-500 dark:text-amber-400`} />;
    case "target":
      return <Target className={`${className} text-emerald-500 dark:text-emerald-400`} />;
    case "fileText":
      return <FileText className={`${className} text-blue-500 dark:text-blue-400`} />;
    case "shield":
      return <Shield className={`${className} text-red-500 dark:text-red-400`} />;
    case "mic":
      return <Mic className={`${className} text-indigo-500 dark:text-indigo-400`} />;
    case "sparkles":
      return <Sparkles className={`${className} text-violet-500 dark:text-violet-400`} />;
    case "palette":
      return <Palette className={`${className} text-pink-500 dark:text-pink-400`} />;
    case "award":
      return <Award className={`${className} text-teal-500 dark:text-teal-400`} />;
    case "calendar":
      return <Calendar className={`${className} text-sky-500 dark:text-sky-400`} />;
    default:
      return <Award className={`${className} text-text-secondary`} />;
  }
};

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-bg-secondary p-5 2xl:p-7 3xl:p-9 transition-shadow hover:shadow-md dark:border-border-dark",
        achievement.featured && "border-l-4 border-l-accent-pop p-6 md:p-7 2xl:p-9 3xl:p-11",
        achievement.featured && index === 0 && "sm:col-span-2 lg:col-span-2"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-primary shadow-sm dark:bg-bg-dark border border-border dark:border-border-dark mb-2">
        {getIcon(achievement.icon)}
      </div>
      <h3
        className={cn(
          "font-display font-semibold text-text-primary",
          achievement.featured ? "text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl" : "text-base 2xl:text-lg 3xl:text-xl"
        )}
      >
        {achievement.title}
      </h3>
      <p
        className={cn(
          "mt-1.5 flex-1 text-text-secondary",
          achievement.featured ? "text-sm md:text-base 2xl:text-lg 3xl:text-xl" : "text-sm 2xl:text-base 3xl:text-lg"
        )}
      >
        {(() => {
          const phrases = [
            "Meta PyTorch OpenEnv Hackathon",
            "Scaler",
            "70,000+ participants",
            "Bangalore Office",
            "IIT Madras E-Cell",
            "1000+ submissions",
            "80+ VCs",
            "GNOSIS National Symposium 2025",
            "Level-1 Hackathon",
            "Supraja Technologies",
            "CONNECT WITH AI",
            "Google Developer Groups",
            "IEEE NEXUSVERSE-2K25",
            "Language Club Website Lead",
            "Academic & Extracurricular Excellence",
            "Geethanjali + Vaultsphere AI"
          ];
          const escapedPhrases = phrases.map(p => p.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
          const regex = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
          const parts = achievement.description.split(regex);
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
    </motion.div>
  );
}
