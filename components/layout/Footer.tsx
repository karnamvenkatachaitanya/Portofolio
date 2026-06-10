import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary dark:border-border-dark">
      <div className="mx-auto max-w-6xl px-6 py-6 md:py-8 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left text-sm text-text-secondary">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-text-primary">
              {SITE_CONFIG.shortName}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-1"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-xs text-text-muted md:text-right">
            <p>Built with Next.js &amp; ☕</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
