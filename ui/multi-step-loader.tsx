"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const loadingStates = [
  { text: "Initializing..." },
  { text: "Loading assets..." },
  { text: "Preparing model..." },
  { text: "Almost ready..." },
];

interface LoaderProps {
  loading: boolean;
  duration?: number;
  onComplete?: () => void;
}

export function MultiStepLoader({ 
  loading, 
  duration = 2000,
  onComplete 
}: LoaderProps) {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentState((prev) => {
        if (prev >= loadingStates.length - 1) {
          if (onComplete) onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [loading, duration, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Spinner */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              {loadingStates.map((state, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: index <= currentState ? 1 : 0.3,
                    x: 0 
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center border",
                    index < currentState 
                      ? "bg-white border-white" 
                      : index === currentState
                      ? "border-white"
                      : "border-white/30"
                  )}>
                    {index < currentState && (
                      <Check className="w-3 h-3 text-black" />
                    )}
                    {index === currentState && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm",
                    index <= currentState ? "text-white" : "text-white/30"
                  )}>
                    {state.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MinimalLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function DotsLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-white/60 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-12 h-12", className)}>
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
      <div className="absolute inset-2 rounded-full bg-white/40" />
    </div>
  );
}
