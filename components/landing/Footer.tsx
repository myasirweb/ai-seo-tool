import Link from "next/link";
import { Zap } from "lucide-react";

const TOOLS = [
  { label: "Keyword Research", href: "/dashboard/keyword-research" },
  { label: "Meta Generator",   href: "/dashboard/meta-generator"   },
  { label: "Content Score",    href: "/dashboard/content-score"    },
  { label: "Readability",      href: "/dashboard/readability"      },
];

const PROJECT = [
  { label: "Dashboard", href: "/dashboard",                                       external: false },
  { label: "GitHub",    href: "https://github.com/YOUR_USERNAME/ai-seo-tool",     external: true  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto py-12 px-6">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1D9E75]/10">
                <Zap size={16} className="text-[#1D9E75]" fill="#1D9E75" />
              </div>
              <span className="text-white font-bold text-base tracking-tight">SEO.AI</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              A free AI-powered SEO toolkit built for everyone.
            </p>
            <p className="text-xs text-gray-600 mt-1">Built with Next.js 14 + OpenAI</p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12">
            {/* Tools */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Tools
              </p>
              <ul className="space-y-2.5">
                {TOOLS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Project
              </p>
              <ul className="space-y-2.5">
                {PROJECT.map(({ label, href, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2025 AI SEO Tool. Free to use. Built for the community.
          </p>
        </div>

      </div>
    </footer>
  );
}
