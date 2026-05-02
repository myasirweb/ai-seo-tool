"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Search, FileText, BarChart2, BookOpen } from "lucide-react";

interface NavTab {
  href: string;
  label: string;
  icon: React.ElementType;
}

const TABS: NavTab[] = [
  { href: "/dashboard",                    label: "Home",     icon: LayoutDashboard },
  { href: "/dashboard/keyword-research",   label: "Keywords", icon: Search          },
  { href: "/dashboard/meta-generator",     label: "Meta",     icon: FileText        },
  { href: "/dashboard/content-score",      label: "Score",    icon: BarChart2       },
  { href: "/dashboard/readability",        label: "Read",     icon: BookOpen        },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="flex items-stretch h-16 pb-4">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex flex-col items-center justify-center gap-0.5 flex-1 text-[10px] font-medium transition-colors",
                isActive ? "text-[#1D9E75]" : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
