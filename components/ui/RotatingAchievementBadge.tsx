"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievements } from "@/lib/achievements";
import { Trophy, Target, Award, Shield, Mic, Sparkles, Palette, FileText, Calendar } from "lucide-react";

const HERO_ACHIEVEMENTS = achievements.slice(0, 6);

const getIcon = (iconName: string) => {
  const className = "inline-block mr-1.5 h-4 w-4 align-text-bottom";
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

export function RotatingAchievementBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_ACHIEVEMENTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const current = HERO_ACHIEVEMENTS[index];

  return (
    <div
      className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm 2xl:max-w-md 3xl:max-w-lg"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="min-h-[3.25rem] 2xl:min-h-[4rem] 3xl:min-h-[4.5rem] overflow-hidden rounded-full border border-border bg-bg-primary px-4 py-2 2xl:px-6 2xl:py-3 shadow-sm dark:border-border-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-xs font-semibold leading-tight text-text-primary sm:text-sm 2xl:text-base 3xl:text-lg">
              {getIcon(current.icon)}
              {current.title}
            </p>
            <p className="mt-0.5 line-clamp-1 text-[10px] text-text-muted sm:text-xs 2xl:text-sm 3xl:text-base">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="mt-2 flex justify-center gap-1">
        {HERO_ACHIEVEMENTS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show achievement: ${item.title}`}
            className={`h-1 rounded-full transition-all ${
              i === index
                ? "w-4 bg-accent-pop"
                : "w-1 bg-border dark:bg-border-dark"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
