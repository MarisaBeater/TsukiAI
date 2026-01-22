"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowColor?: string;
  blur?: number;
  spread?: number;
  intensity?: number;
  duration?: number;
}

export function GlowingEffect({
  children,
  className,
  containerClassName,
  glowColor = "rgba(255, 255, 255, 0.15)",
  blur = 40,
  spread = 20,
  intensity = 0.5,
  duration = 2,
}: GlowingEffectProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 ${blur}px ${spread}px ${glowColor}`,
            `0 0 ${blur * 1.5}px ${spread * 1.2}px ${glowColor}`,
            `0 0 ${blur}px ${spread}px ${glowColor}`,
          ],
          opacity: [intensity * 0.8, intensity, intensity * 0.8],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  glowColor?: string;
  duration?: number;
}

export function GlowingBorder({
  children,
  className,
  borderWidth = 1,
  glowColor = "rgba(255, 255, 255, 0.3)",
  duration = 3,
}: GlowingBorderProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Inner content with border */}
      <div
        className="relative bg-background rounded-[inherit]"
        style={{
          margin: borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.56898 -0.56898 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}
