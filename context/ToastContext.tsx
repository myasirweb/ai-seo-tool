"use client";

import { createContext, useContext } from "react";

type ToastType = "success" | "error" | "info";

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToastContext() {
  return useContext(ToastContext);
}
