"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  FileText, 
  Settings, 
  Rocket,
  Copy,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const CONTRACT_ADDRESS = "GX9EPAAWNrT4ian97vLXircZZYd4oZ7UEUqgVE19pump";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/docs", label: "Docs", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Taskbar() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/5" />
      
      {/* Content */}
      <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
            <Image
              src="/koshinologo.jpg"
              alt="Tsuki"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-semibold tracking-tight hidden sm:block">
            Tsuki
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          {/* Launch App Button */}
          <Link href="/app-shell" className="ml-2">
            <HoverBorderGradient
              containerClassName="rounded-lg"
              className="flex items-center gap-2 px-4 py-2 bg-black text-sm font-medium text-white"
              duration={1.5}
            >
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">Launch App</span>
            </HoverBorderGradient>
          </Link>
        </nav>

        {/* Right: Social Links & CA */}
        <div className="flex items-center gap-2">
          {/* CA Button */}
          <motion.button
            onClick={copyCA}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all overflow-hidden",
              copied 
                ? "bg-emerald-500/20 border border-emerald-500/30" 
                : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 hover:border-white/20 hover:from-purple-500/20 hover:to-pink-500/20"
            )}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            
            <span className="text-white/60">CA</span>
            <span className="text-white/40 hidden sm:inline max-w-[80px] truncate">
              {CONTRACT_ADDRESS.slice(0, 4)}...{CONTRACT_ADDRESS.slice(-4)}
            </span>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-3.5 h-3.5 text-white/40" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* X/Twitter Link */}
          <a
            href="https://x.com/TsukiChan_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center transition-all group"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
