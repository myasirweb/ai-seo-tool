"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Toast from "@/components/ui/Toast";
import MobileNav from "@/components/layout/MobileNav";
import { ToastContext } from "@/context/ToastContext";
import { useToast } from "@/hooks/useToast";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":                    "Dashboard",
  "/dashboard/keyword-research":   "Keyword Research",
  "/dashboard/meta-generator":     "Meta Generator",
  "/dashboard/content-score":      "Content Score",
  "/dashboard/readability":        "Readability",
  "/dashboard/blog-titles":        "Blog Title Generator",
  "/dashboard/history":            "Search History",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const currentTitle = PAGE_TITLES[pathname] ?? "Dashboard";
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="flex h-screen bg-gray-50 font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar title={currentTitle} />
          <main className="flex-1 overflow-y-auto p-6 pb-16 md:pb-6">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}
