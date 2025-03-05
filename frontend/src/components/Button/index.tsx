"use client";

import { tv } from "tailwind-variants";
import { ButtonHTMLAttributes, ReactNode } from "react";

const button = tv({
  base: "flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-all",
  variants: {
    variant: {
      primary: "bg-[#034EA1] text-white hover:bg-[#004076]",
      secondary: "bg-[#3191D1] text-white hover:bg-[#034EA1]",
      outline: "border border-[#034EA1] text-[#034EA1] hover:bg-[#3191D1] hover:text-white",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode; // Aceita um ícone como ReactNode
}

export function Button({ variant, size, icon, className, children, ...props }: ButtonProps) {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
