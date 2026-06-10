"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const spring = { stiffness: 500, damping: 28, mass: 0.5 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      setIsHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => setIsVisible(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      const active = finePointer.matches;
      setEnabled(active);
      document.documentElement.classList.toggle("has-custom-cursor", active);
    };

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);

    if (!finePointer.matches) {
      return () => {
        finePointer.removeEventListener("change", updateEnabled);
        document.documentElement.classList.remove("has-custom-cursor");
      };
    }

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <div className="h-2.5 w-2.5 rounded-full bg-text-primary shadow-sm dark:bg-accent-pop" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && isHovering ? 1 : 0,
          width: 40,
          height: 40,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full border-2 border-white bg-transparent" />
      </motion.div>
    </>
  );
}
