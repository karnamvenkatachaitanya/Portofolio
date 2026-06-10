"use client";

import { achievements } from "@/lib/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";

export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading
          title="Achievements"
          subtitle={
            <>
              Competitions, <span className="highlight-word">recognitions</span>, and milestones.
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
