"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { NavLink } from "@/components/ui/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/50 bg-bg-primary/80 backdrop-blur-md dark:border-border-dark/50"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group leading-tight"
            aria-label={`${SITE_CONFIG.name} — Home`}
          >
            <span className="font-display text-xl font-bold tracking-tight text-text-primary">
              {SITE_CONFIG.shortName}
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium text-text-muted xl:block">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <div className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href={SITE_CONFIG.resumeUrl}
              download
              className="hidden sm:inline-flex"
              aria-label="Download resume"
            >
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" />
                Resume
              </Button>
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg-primary dark:bg-bg-dark"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-xl font-bold">
                {SITE_CONFIG.shortName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
