"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";

export function Preloader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "complete">("loading");
  const [mounted, setMounted] = useState(false);
  const { isLight } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // The text animates from center to bottom-left at 1.8s.
    // We'll fade out the solid background right after it starts moving, say at 2.0s,
    // so it reveals the loaded WebGL behind it.
    const timer = setTimeout(() => {
      setPhase("complete");
    }, 2000);

    return () => clearTimeout(timer);
  }, [mounted]);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (phase !== "complete") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // We render instantly during SSR to prevent a flash of the footer.
  // We use CSS variables/classes for the background color to avoid hydration mismatch.
  return (
    <>
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="preloader-solid-bg"
            className="fixed inset-0 z-[9999] flex items-center justify-center preloader-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Main Content wrapped in opacity fade based on mounted state (like HomeFadeIn) */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
