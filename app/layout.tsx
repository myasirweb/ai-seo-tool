import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI SEO Tool",
  description: "AI-powered SEO analysis and optimization tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
