"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const styles: Record<ToastType, string> = {
  success: "bg-[#1D9E75] text-white",
  error:   "bg-red-500 text-white",
  info:    "bg-gray-800 text-white",
};

const Icon: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error:   AlertCircle,
  info:    Info,
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // mount → fade in
    const show = requestAnimationFrame(() => setVisible(true));

    // auto-dismiss after 3 s
    const dismiss = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out transition
    }, 3000);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(dismiss);
    };
  }, [onClose]);

  const TypeIcon = Icon[type];

  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50",
        "flex items-center gap-3",
        "rounded-xl px-4 py-3 shadow-lg text-sm font-medium",
        "transition-all duration-300",
        styles[type],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
      role="alert"
    >
      <TypeIcon size={16} className="shrink-0" />
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-1 opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
