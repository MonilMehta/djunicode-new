"use client";

import { motion } from "framer-motion";
import { Space_Mono } from "next/font/google";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { useTheme } from "@/lib/theme-context";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const DISPLAY_SANS = "'Satoshi','Inter',system-ui,sans-serif";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const { isLight } = useTheme();

  return (
    <div className={`w-full min-h-screen ${isLight ? 'bg-[#f4efe3] text-black' : 'bg-[#080808] text-white'}`} style={{ backgroundColor: isLight ? 'var(--bg)' : '#080808' }}>

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`w-full px-6 md:px-[52px] pt-[100px] md:pt-[120px] pb-14 border-b ${isLight ? 'border-black/[0.04]' : 'border-white/[0.04]'}`}
      >
        <div className="max-w-[720px] mx-auto">

          {/* Back */}
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 mb-10 ${spaceMono.className} ${isLight ? 'text-black/30 hover:text-black/50' : 'text-white/25 hover:text-white/50'}`}
          >
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            All posts
          </Link>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex gap-2 flex-wrap mb-6"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${spaceMono.className} ${isLight ? 'bg-black/[0.03] border-black/[0.07] text-black/40' : 'bg-white/[0.04] border-white/[0.07] text-white/30'}`}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`text-[clamp(26px,4.5vw,54px)] font-bold leading-[1.1] mb-8 ${isLight ? 'text-black/85' : 'text-white/88'}`}
            style={{ fontFamily: DISPLAY_SANS, letterSpacing: "-0.03em" }}
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isLight ? 'bg-[#098d9c]/15' : 'bg-[#77CE90]/15'}`}>
                <span className={`text-[9px] font-bold ${isLight ? 'text-[#098d9c]' : 'text-[#77CE90]'}`}>U</span>
              </div>
              <span className={`text-[11px] ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/30'}`}>{post.author}</span>
            </div>
            <span className={`w-px h-3 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
            <span className={`text-[11px] ${spaceMono.className} ${isLight ? 'text-black/35' : 'text-white/25'}`}>{formatDate(post.date)}</span>
            <span className={`w-px h-3 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
            <span className={`text-[11px] ${spaceMono.className} ${isLight ? 'text-black/35' : 'text-white/25'}`}>{post.readingTime} min read</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ── BODY ───────────────────────────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-6 md:px-[52px] py-14 md:py-20"
      >
        <div className="max-w-[720px] mx-auto">

          {/* Pull-quote excerpt */}
          <div className={`border-l-2 pl-6 mb-14 ${isLight ? 'border-[#098d9c]/35' : 'border-[#77CE90]/35'}`}>
            <p
              className={`text-[17px] md:text-[20px] leading-[1.7] italic ${isLight ? 'text-black/55' : 'text-white/45'}`}
              style={{ fontFamily: DISPLAY_SANS }}
            >
              {post.excerpt}
            </p>
          </div>

          {/* Rendered markdown */}
          <div
            className={`blog-prose ${isLight ? 'prose-light' : ''}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <div className={`mt-20 pt-10 border-t flex items-center justify-between flex-wrap gap-6 ${isLight ? 'border-black/[0.05]' : 'border-white/[0.05]'}`}>
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${spaceMono.className} ${isLight ? 'bg-black/[0.04] border-black/[0.06] text-black/30' : 'bg-white/[0.04] border-white/[0.06] text-white/22'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 text-[11px] transition-colors duration-200 ${spaceMono.className} ${isLight ? 'text-black/35 hover:text-black/60' : 'text-white/25 hover:text-white/55'}`}
            >
              ← All posts
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
