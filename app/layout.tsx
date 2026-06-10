import type { Metadata } from "next";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description:
    "Portfolio of Karnam Venkata Chaitanya — AI Engineer, Product Builder, and Full-Stack Developer. Building production-grade AI systems that work in the real world.",
  metadataBase: new URL(SITE_CONFIG.domain),
  icons: {
    icon: "/images/avatar.jpg",
    apple: "/images/avatar.jpg",
  },
  openGraph: {
    title: `${SITE_CONFIG.name} — Portfolio`,
    description: SITE_CONFIG.tagline,
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Portfolio`,
    description: SITE_CONFIG.tagline,
    images: ["/images/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-body antialiased"
        style={
          {
            "--font-clash": "'Clash Display', sans-serif",
            "--font-cabinet": "'Cabinet Grotesk', sans-serif",
            "--font-jetbrains": "'JetBrains Mono', monospace",
          } as React.CSSProperties
        }
      >
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
