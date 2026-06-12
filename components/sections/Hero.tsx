"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MessageCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { RotatingAchievementBadge } from "@/components/ui/RotatingAchievementBadge";
import { ROTATING_ROLES, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentRole = ROTATING_ROLES[roleIndex];

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <p className="mt-3 min-h-[1.75rem] text-base text-text-secondary sm:mt-4 sm:min-h-[2rem] sm:text-lg lg:text-xl 2xl:text-3xl 3xl:text-4xl">
      I&apos;m a{" "}
      <span className="font-medium text-text-primary">
        {displayText}
        <span
          className={`ml-0.5 inline-block h-[1.1em] w-[2px] 2xl:w-[3px] 3xl:w-[4px] align-middle bg-accent-pop ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </p>
  );
}

const socialLinks = [
  { href: SITE_CONFIG.github, icon: GitHubIcon, label: "GitHub" },
  { href: SITE_CONFIG.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: `mailto:${SITE_CONFIG.email}`, icon: Mail, label: "Email" },
  { href: SITE_CONFIG.whatsapp, icon: MessageCircle, label: "WhatsApp" },
];

const taglineWords = SITE_CONFIG.tagline.split(" ");

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 lg:min-h-[calc(100svh-5rem)] lg:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16 2xl:gap-24 3xl:gap-32">
          {/* Text column */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary dark:border-border-dark 2xl:text-sm 2xl:px-4 2xl:py-1.5 3xl:text-base 3xl:px-5 3xl:py-2"
            >
              <span className="relative flex h-2 w-2 2xl:h-2.5 2xl:w-2.5 3xl:h-3 3xl:w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-green-500" />
              </span>
              Available for opportunities
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-lg font-semibold tracking-tight text-text-primary sm:text-xl md:text-2xl lg:text-3xl 2xl:text-5xl 3xl:text-6xl"
            >
              {SITE_CONFIG.name}
            </motion.p>

            <h1 className="mt-2 font-display text-[1.65rem] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary min-[400px]:text-[1.85rem] sm:text-4xl md:text-[2.5rem] lg:mt-3 lg:text-[2.75rem] xl:text-5xl 2xl:text-[4.5rem] 3xl:text-[5.5rem]">
              <span className="sr-only">Karnam Venkata Chaitanya — </span>
              {taglineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <TypewriterRoles />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:mt-5 sm:text-base lg:max-w-lg xl:max-w-xl 2xl:text-xl 2xl:max-w-3xl 2xl:leading-relaxed 3xl:text-2xl 3xl:max-w-4xl 3xl:leading-relaxed"
            >
              Final-year <span className="highlight-word">Artificial Intelligence &amp; Data Science</span> student at NBKRIST. I <span className="highlight-word">build AI systems</span>, <span className="highlight-word">ship products</span>, and <span className="highlight-word">win hackathons</span>. <span className="highlight-word">Top 2.8% nationwide</span> at <span className="highlight-word">Meta PyTorch</span> × Scaler.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3 lg:mt-8"
            >
              <a href="#projects" aria-label="View my work">
                <Button
                  variant="accent"
                  size="lg"
                  className="h-10 px-5 text-sm sm:h-11 sm:px-6 lg:h-12 lg:px-8 lg:text-base 2xl:h-15 2xl:px-10 2xl:text-xl 3xl:h-18 3xl:px-12 3xl:text-2xl font-bold"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
                </Button>
              </a>
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                aria-label="Download resume"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-10 px-5 text-sm sm:h-11 sm:px-6 lg:h-12 lg:px-8 lg:text-base 2xl:h-15 2xl:px-10 2xl:text-xl 3xl:h-18 3xl:px-12 3xl:text-2xl font-bold"
                >
                  <Download className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
                  Download Resume
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45 }}
              className="mt-6 flex gap-2.5 sm:mt-7 lg:mt-8"
            >
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-text-primary sm:p-2.5 2xl:p-3.5 3xl:p-4 dark:border-border-dark"
                >
                  <Icon className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile column — achievement badge above photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex flex-col items-center justify-center lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-5 w-full flex justify-center sm:mb-6"
            >
              <RotatingAchievementBadge />
            </motion.div>

            <div className="relative rounded-full p-[3px] sm:p-1">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-pop/50 via-border/80 to-accent-pop/20"
                aria-hidden="true"
              />
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-[3px] border-bg-primary bg-bg-secondary shadow-lg sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-56 lg:w-56 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80 3xl:h-[26rem] 3xl:w-[26rem]">
                <Image
                  src={SITE_CONFIG.avatarUrl}
                  alt="Karnam Venkata Chaitanya — AI Engineer and Full-Stack Developer, NBKRIST Andhra Pradesh"
                  fill
                  className="object-cover object-[center_12%]"
                  priority={true}
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1280px) 224px, 384px"
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-4 text-center font-display text-sm font-medium text-text-primary sm:mt-5 sm:text-base 2xl:text-lg 3xl:text-xl"
            >
              {SITE_CONFIG.name}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-0.5 text-center text-xs text-text-muted sm:text-sm 2xl:text-base 3xl:text-lg"
            >
              AI Engineer · NBKRIST
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
