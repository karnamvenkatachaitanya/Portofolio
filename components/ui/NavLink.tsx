"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ href, label, onClick, className }: NavLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("/blog");

  const linkClass = cn(
    "group relative text-base xl:text-lg font-semibold tracking-wide text-text-secondary transition-colors hover:text-text-primary px-2 py-1",
    className
  );

  const underline = (
    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full dark:bg-accent-pop" />
  );

  if (isExternal && href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={linkClass}>
        {label}
        {underline}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={linkClass}>
      {label}
      {underline}
    </a>
  );
}
