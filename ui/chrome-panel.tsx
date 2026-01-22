"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChromePanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  titleIcon?: ReactNode;
  actions?: ReactNode;
  variant?: "default" | "subtle" | "glow" | "solid";
  padding?: "none" | "sm" | "md" | "lg";
}

export function ChromePanel({
  children,
  className,
  title,
  titleIcon,
  actions,
  variant = "default",
  padding = "md",
}: ChromePanelProps) {
  const variants = {
    default: "bg-white/[0.02] border-white/10 shadow-lg shadow-black/20",
    subtle: "bg-white/[0.01] border-white/5",
    glow: "bg-white/[0.03] border-white/10 shadow-lg shadow-white/5 ring-1 ring-white/5",
    solid: "bg-zinc-900/90 border-white/10",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-xl border backdrop-blur-sm transition-all duration-200",
        variants[variant],
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            {titleIcon && (
              <span className="text-white/40">{titleIcon}</span>
            )}
            {title && (
              <h3 className="text-sm font-medium text-white/80 tracking-wide">
                {title}
              </h3>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={cn(paddings[padding])}>
        {children}
      </div>
    </div>
  );
}

// Compact variant for dense UIs
export function ChromeCard({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white/[0.02] border border-white/5 p-3 transition-all duration-200",
        hover && "hover:bg-white/[0.04] hover:border-white/10 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

// Status chip for HUD displays
export function StatusChip({
  label,
  value,
  status = "neutral",
}: {
  label: string;
  value: string;
  status?: "success" | "warning" | "error" | "neutral";
}) {
  const statusColors = {
    success: "text-emerald-400",
    warning: "text-amber-400",
    error: "text-red-400",
    neutral: "text-white/60",
  };

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
      <span className={cn("text-xs font-mono", statusColors[status])}>{value}</span>
    </div>
  );
}
