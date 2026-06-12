import type { Metadata } from "next";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { JsonLd } from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://chaitanya.qzz.io"),
  title: {
    default: "Karnam Venkata Chaitanya — AI Engineer & Full-Stack Developer",
    template: "%s | Karnam Venkata Chaitanya",
  },
  description:
    "Karnam Venkata Chaitanya (Chaitanya Karnam) — Agentic AI Developer, Full-Stack Engineer, and NBKRIST AI&DS student. Top 2.8% at Meta PyTorch Hackathon. Building production-grade AI systems in Andhra Pradesh.",
  keywords: [
    "Karnam Venkata Chaitanya",
    "Venkata Chaitanya Karnam",
    "Chaitanya Karnam",
    "chaitanya",
    "venkata karnam",
    "nbkrist",
    "best ai&ds student",
    "best ai product developer in Andhra Pradesh",
    "AI Engineer",
    "Portfolio",
    "Agentic AI Developer",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Karnam Venkata Chaitanya", url: "https://chaitanya.qzz.io" }],
  creator: "Karnam Venkata Chaitanya",
  publisher: "Karnam Venkata Chaitanya",
  alternates: { canonical: "https://chaitanya.qzz.io" },
  verification: {
    google: "rhHPf6zBEwImKJDrzzPSlANMps4CxMmzPbDgegEz_MA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/avatar.jpg",
    apple: "/images/avatar.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chaitanya.qzz.io",
    siteName: "Karnam Venkata Chaitanya",
    title: "Karnam Venkata Chaitanya — AI Engineer & Agentic AI Developer",
    description:
      "Final-year AI&DS student at NBKRIST. Building agentic AI systems, full-stack products, and winning hackathons. Top 2.8% at Meta PyTorch × Scaler (70k+ participants).",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karnam Venkata Chaitanya — AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karnam Venkata Chaitanya — AI Engineer & Agentic AI Developer",
    description:
      "Agentic AI Developer · Full-Stack Engineer · NBKRIST AI&DS · Top 2.8% Meta PyTorch Hackathon",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
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
