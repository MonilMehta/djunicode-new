"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HomeFadeIn({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // A tiny delay to allow the browser/Next.js to finish restoring the scroll position
    // securely without triggering visually all the intersection observers at opacity 1
    const t = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
