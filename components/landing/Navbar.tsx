"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features",     href: "#features"     },
  { label: "How It Works", href: "#how-it-works"  },
  { label: "Tools",        href: "#tools"         },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-white border-b border-gray-100 transition-shadow duration-200",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <div className="flex h-16 items-center justify-between px-6 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1D9E75]/10">
            <Zap size={18} className="text-[#1D9E75]" fill="#1D9E75" />
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">SEO.AI</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="bg-[#1D9E75] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#178a64] transition-colors duration-150"
        >
          Try Free →
        </Link>
      </div>
    </header>
  );
}
