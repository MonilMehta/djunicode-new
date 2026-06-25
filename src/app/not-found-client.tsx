"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Space_Mono } from "next/font/google";
import { useTheme } from "@/lib/theme-context";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function NotFoundClient() {
  const { isLight } = useTheme();

  return (
    <main 
      className={`min-h-[80vh] w-full flex flex-col items-center justify-center relative overflow-hidden pt-20 ${spaceMono.className}`}
      style={{
        backgroundColor: "transparent",
        color: isLight ? "var(--ink)" : "#e0e0e0"
      }}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid */}
        <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] ${isLight ? 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'}`} />
        
        {/* Animated glowing orbs - Fainter in light mode */}
        <motion.div 
          animate={{ 
            x: ["-20%", "20%", "-20%"],
            y: ["-20%", "20%", "-20%"],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px] ${isLight ? 'bg-blue-100/50 opacity-20' : 'bg-blue-900/30 opacity-30'}`}
        />
        <motion.div 
          animate={{ 
            x: ["20%", "-20%", "20%"],
            y: ["20%", "-20%", "20%"],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px] ${isLight ? 'bg-rose-100/50 opacity-20' : 'bg-rose-900/30 opacity-30'}`}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 
            className={`text-[clamp(120px,20vw,240px)] font-bold tracking-[-0.04em] leading-none ${isLight ? 'text-[#111]' : 'text-white'}`}
            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h2 className={`text-xl md:text-2xl font-medium mb-3 tracking-tight ${isLight ? 'text-black' : 'text-white'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
            Page not found
          </h2>
          <p className={`text-[13px] md:text-[14px] max-w-[320px] mb-8 text-center leading-[1.6] ${spaceMono.className} ${isLight ? 'text-black/50' : 'text-white/40'}`}>
            The page you are looking for doesn't exist or has been moved. Let's get you back to the archive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <Link 
              href="/"
              className={`group relative inline-flex h-[42px] items-center justify-center overflow-hidden rounded-full px-7 text-[13px] font-medium transition-all duration-300 active:scale-95 ${
                isLight 
                ? 'bg-[#111] text-white hover:bg-black shadow-[0_0_20px_rgba(0,0,0,0.1)]' 
                : 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
              }`}
            >
              <span className="relative flex items-center gap-2" style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
                Home
                <svg className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/projects"
              className={`group relative inline-flex h-[42px] items-center justify-center overflow-hidden rounded-full border px-7 text-[13px] font-medium transition-all duration-300 active:scale-95 ${
                isLight 
                ? 'border-black/10 bg-black/[0.03] text-[#111] hover:bg-black-[0.06]' 
                : 'border-white/10 bg-[#161616] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="relative" style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>Projects</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}