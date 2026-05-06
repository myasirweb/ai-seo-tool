"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Search,
  FileText,
  BarChart2,
  BookOpen,
  ChevronRight,
  Type,
  History,
  Link2,
  Layers,
  FileDown,
  GitCompare,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/",                           label: "Dashboard",        icon: LayoutDashboard },
  { href: "/dashboard/keyword-research", label: "Keyword Research", icon: Search          },
  { href: "/dashboard/meta-generator",   label: "Meta Generator",   icon: FileText        },
  { href: "/dashboard/content-score",    label: "Content Score",    icon: BarChart2       },
  { href: "/dashboard/readability",      label: "Readability",      icon: BookOpen        },
  { href: "/dashboard/blog-titles",      label: "Blog Titles",      icon: Type            },
  { href: "/dashboard/history",          label: "History",          icon: History         },
  { href: "/dashboard/url-analyzer",     label: "URL Analyzer",     icon: Link2           },
  { href: "/dashboard/bulk-keywords",    label: "Bulk Keywords",    icon: Layers          },
  { href: "/dashboard/seo-report",       label: "SEO Report",       icon: FileDown        },
  { href: "/dashboard/competitor-analysis", label: "Competitor",    icon: GitCompare      },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-[212px] bg-[#0d1117] border-r border-[#21262d] shrink-0">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-[#21262d]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#1D9E75]/10">
            <Zap size={16} className="text-[#1D9E75]" fill="#1D9E75" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">SEO.AI</span>
        </div>
        <p className="mt-1.5 text-[11px] text-[#8b949e] pl-9">AI-Powered Toolkit</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-150 group",
                isActive
                  ? "bg-[#161b22] text-white border-l-2 border-[#1D9E75] pl-[10px]"
                  : "text-[#8b949e] hover:text-white hover:bg-[#161b22] border-l-2 border-transparent pl-[10px]",
              ].join(" ")}
            >
              <Icon size={15} className="shrink-0" />
              <span className="truncate">{label}</span>
              {isActive && (
                <ChevronRight size={13} className="ml-auto text-[#1D9E75] shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#21262d]">
        <p className="text-[11px] text-[#484f58] text-center">Free · Portfolio Project</p>
      </div>
    </aside>
  );
}
