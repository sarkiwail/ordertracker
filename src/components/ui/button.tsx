"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-xs",
        size === "lg" && "px-5 py-2.5 text-sm",
        variant === "primary" && "bg-accent text-accent-foreground hover:bg-accent-hover",
        variant === "secondary" && "border border-border text-text-secondary hover:bg-surface-hover",
        variant === "ghost" && "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
        variant === "danger" && "bg-status-cancelled-bg text-status-cancelled hover:opacity-80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}