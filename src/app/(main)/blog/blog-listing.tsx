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

function PostItem({ post, index }: { post: BlogPost; index: number }) {
  const { isLight } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group block py-10 border-b transition-colors duration-300 ${isLight ? 'border-black/[0.05] hover:border-black/[0.15]' : 'border-white/[0.05] hover:border-white/[0.15]'}`}
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
          {/* Date on the left for desktop */}
          <div
            className={`md:w-48 shrink-0 text-[11px] uppercase tracking-[0.15em] ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/30'}`}
          >
            {formatDate(post.date)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2
              className={`text-[22px] md:text-[28px] font-semibold mb-3 transition-colors duration-200 ${isLight ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}
              style={{ fontFamily: DISPLAY_SANS, letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h2>
            <p
              className={`text-[15px] md:text-[16px] leading-[1.65] mb-5 ${isLight ? 'text-black/50' : 'text-white/40'}`}
              style={{ fontFamily: DISPLAY_SANS }}
            >
              {post.excerpt}
            </p>
            
            {/* Meta tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${spaceMono.className} ${isLight ? 'bg-black/[0.03] border-black/[0.06] text-black/40' : 'bg-white/[0.03] border-white/[0.06] text-white/30'}`}
                >
                  {tag}
                </span>
              ))}
              <span className={`w-px h-3 mx-2 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
              <span className={`text-[10px] ${spaceMono.className} ${isLight ? 'text-black/30' : 'text-white/20'}`}>
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const { isLight } = useTheme();

  return (
    <div className={`w-full min-h-screen ${isLight ? 'bg-[#f4efe3] text-black' : 'bg-[#080808] text-white'}`} style={{ backgroundColor: isLight ? 'var(--bg)' : '#080808' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <section className={`w-full px-6 md:px-[52px] pt-[120px] md:pt-[140px] pb-14 border-b ${isLight ? 'border-black/[0.04]' : 'border-white/[0.04]'}`}>
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] ${isLight ? 'text-black/85' : 'text-white/85'}`}
            style={{ fontFamily: DISPLAY_SANS }}
          >
            blog
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:items-end gap-3 pb-1"
          >
            <p
              className={`text-[14px] max-w-[280px] md:text-right leading-relaxed ${isLight ? 'text-black/50' : 'text-white/40'}`}
              style={{ fontFamily: DISPLAY_SANS }}
            >
              Ideas and lessons from building software together.
            </p>
            <a
              href="/api/rss"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 text-[10px] uppercase tracking-[0.16em] w-fit ${spaceMono.className} ${isLight ? 'border-black/[0.07] bg-black/[0.03] hover:bg-black/[0.06] hover:border-black/[0.12] text-black/40 hover:text-black/60' : 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] text-white/30 hover:text-white/55'}`}
            >
              <svg className="w-3 h-3 text-[#f97316]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
              RSS
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── POSTS ─────────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-[52px] pb-24">
        <div className="max-w-[1000px] mx-auto">
          {posts.map((post, i) => (
            <PostItem key={post.slug} post={post} index={i} />
          ))}

          {posts.length === 0 && (
            <p className={`py-24 text-center text-base ${isLight ? 'text-black/30' : 'text-white/20'}`} style={{ fontFamily: DISPLAY_SANS }}>
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
