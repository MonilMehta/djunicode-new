"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Space_Mono } from 'next/font/google';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import membersData from '../../../content/data/profile/profile.json';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Clean and sort members data
const sortedMembers = [...membersData].sort((a, b) => 
  a.name.localeCompare(b.name)
);

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Parallax background
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredMembers = useMemo(() => {
    return sortedMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = activeLetter 
        ? member.name.toUpperCase().startsWith(activeLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, activeLetter]);

  // Framer Motion Variants
  const fadeUpPrimary = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
  };

  return (
    <div className={`min-h-screen bg-[#080808] text-[#e0e0e0] flex flex-col ${spaceMono.className}`}>
      
      {/* PREMIUM HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-[52px] overflow-hidden">
        {/* Abstract Backgrounds */}
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none -z-10">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_40%,transparent_100%)] opacity-30" />
          {/* Ambient Glow */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-white/[0.04] blur-[120px] rounded-[100%] pointer-events-none" />
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col max-w-4xl"
        >
          <motion.h1 variants={fadeUpPrimary} className="text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] text-[rgba(255,255,255,0.82)]">
            members
          </motion.h1>
          
          <motion.p variants={fadeUpPrimary} className="max-w-[500px] mt-6 text-white/40 text-[14px] leading-[1.7]">
            A collective of students who love to break things, build fun projects, and ship together.
          </motion.p>
        </motion.div>
      </section>

      {/* STICKY FILTER & SEARCH BAR */}
      <div className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled ? 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-4'}`}>
        <div className="px-6 md:px-[52px] flex flex-col lg:flex-row lg:items-center justify-between gap-6 max-w-[1600px] mx-auto">
          
          {/* Alphabet Filter (Desktop: Left, Mobile: Top/Scrollable) */}
          <div className="flex-1 overflow-x-auto no-scrollbar mask-edges-right">
            <div className="flex items-center gap-1.5 w-max pb-2 lg:pb-0">
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.1em] transition-all duration-300 ${!activeLetter ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
              >
                ALL
              </button>
              <div className="w-px h-4 bg-white/10 mx-2" />
              {ALPHABET.map((letter) => {
                const hasMembers = sortedMembers.some(m => m.name.toUpperCase().startsWith(letter));
                return (
                  <button
                    key={letter}
                    onClick={() => hasMembers && setActiveLetter(letter === activeLetter ? null : letter)}
                    disabled={!hasMembers}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-[11px] transition-all duration-300
                      ${activeLetter === letter ? 'bg-white/15 text-white border border-white/20' : 'border border-transparent'}
                      ${!hasMembers ? 'opacity-10 cursor-not-allowed' : 'text-white/40 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box - Linear Style */}
          <div className="relative group lg:w-[320px] flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white/70 transition-colors z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full h-11 bg-white/[0.02] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_10px_rgba(0,0,0,0.2)] rounded-full pl-11 pr-14 text-[13px] text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all duration-300"
            />
            {!searchQuery ? (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="font-sans text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘</kbd>
                <kbd className="font-sans text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">K</kbd>
              </div>
            ) : (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MEMBERS GRID */}
      <section className="flex-grow px-6 py-12 md:px-[52px] md:py-16 max-w-[1600px] mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
        >
          <AnimatePresence mode="wait">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.key}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Container with Spotlight/Glow effect */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 bg-white/[0.02] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                  
                  {/* Image */}
                  <img
                    src={member.profile_pic ? member.profile_pic.replace('../../', '/') : ''}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />

                  {/* Social Links on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    {member.GitHub && member.GitHub !== "-" && (
                      <a href={member.GitHub} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    )}
                    {member.LinkedIn && member.LinkedIn !== "-" && (
                      <a href={member.LinkedIn} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all" onClick={(e) => e.stopPropagation()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="px-1 text-center flex flex-col items-center">
                  <h3 className="text-[14px] sm:text-[16px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors" style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-[1.5] text-white/30 group-hover:text-white/50 transition-colors line-clamp-3 max-w-[95%]">
                    {member.desc || "Contributor"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full flex flex-col items-center justify-center py-32"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
                <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-white/80 text-[18px] font-medium" style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>No match found</h3>
              <p className="text-white/40 text-[13px] mt-2">Adjust your filters or try a different search query.</p>
              
              <button 
                onClick={() => { setSearchQuery(""); setActiveLetter(null); }}
                className="mt-8 px-6 py-2.5 rounded-full bg-white text-black text-[12px] font-bold tracking-wide hover:bg-white/90 transition-colors"
              >
                CLEAR FILTERS
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Fade edges for scrollable alphabet container */
        .mask-edges-right {
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
        @media (min-width: 1024px) {
          .mask-edges-right { mask-image: none; }
        }
      `}</style>
    </div>
  );
}
