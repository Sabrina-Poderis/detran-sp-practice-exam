import { createContext, useContext } from "react";
import ToastContextInterface from "./ToastContextInterface";

export const ToastContext = createContext<ToastContextInterface | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}