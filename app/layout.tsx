import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "AI SEO Tool — Free AI-Powered SEO Toolkit",
    template: "%s | AI SEO Tool",
  },
  description:
    "Free AI-powered SEO toolkit for bloggers, agencies & businesses. Keyword research, meta title & description generator, content scorer, and readability checker — all in one place.",
  keywords: [
    "SEO tool",
    "free SEO tool",
    "keyword research",
    "meta description generator",
    "content score",
    "readability checker",
    "AI SEO",
    "Next.js SEO tool",
  ],
  openGraph: {
    title: "AI SEO Tool — Free AI-Powered SEO Toolkit",
    description:
      "Free AI-powered SEO toolkit. Keyword research, meta generator, content scorer & readability checker.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "AI SEO Tool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO Tool — Free AI-Powered SEO Toolkit",
    description: "Free AI-powered SEO toolkit for bloggers & agencies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
