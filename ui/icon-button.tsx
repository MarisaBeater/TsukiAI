"use client";

import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
}

export function IconButton({
  children,
  className,
  variant = "default",
  size = "md",
  tooltip,
  disabled,
  ...props
}: IconButtonProps) {
  const variants = {
    default: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
    ghost: "bg-transparent border-transparent hover:bg-white/5",
    glow: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10",
  };

  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg border transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-black",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      title={tooltip}
      {...props}
    >
      {children}
    </button>
  );
}

// Action button with label
export function ActionButton({
  children,
  icon,
  className,
  variant = "default",
  size = "md",
  disabled,
  ...props
}: IconButtonProps & { icon?: ReactNode }) {
  const variants = {
    default: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
    ghost: "bg-transparent border-transparent hover:bg-white/5",
    glow: "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 shadow-lg shadow-white/5",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-5 text-base gap-2.5",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg border transition-all duration-200 font-medium",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-black",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-white/60">{icon}</span>}
      {children}
    </button>
  );
}

// Shimmer button for CTAs
export function ShimmerButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-white/40",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E2E2_0%,#4B4B4B_50%,#E2E2E2_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-950 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl gap-2 hover:bg-zinc-900 transition-colors">
        {children}
      </span>
    </button>
  );
}
