"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Space_Mono } from 'next/font/google';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { X, MapPin, Briefcase, Github, Linkedin, Mail, ExternalLink, Star, GitFork, Users } from 'lucide-react';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function MembersClient({ membersData }: { membersData: any[] }) {
  // Clean and sort members data
  const sortedMembers = useMemo(() => {
    return [...membersData].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [membersData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isLight } = useTheme();

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
  };

  return (
    <LayoutGroup>
      <div className={`min-h-screen flex flex-col members-page-root ${spaceMono.className}`} style={{ backgroundColor: isLight ? 'var(--bg)' : '#080808', color: isLight ? 'var(--ink)' : '#e0e0e0' }}>
      
      {/* PREMIUM HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-[52px] overflow-hidden">
        {/* Abstract Backgrounds */}
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none -z-10">
          {/* Subtle grid */}
          <div className={`absolute inset-0 bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_40%,transparent_100%)] ${isLight ? 'bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] opacity-50' : 'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] opacity-30'}`} />
          {/* Ambient Glow */}
          <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] blur-[120px] rounded-[100%] pointer-events-none ${isLight ? 'bg-black/[0.02]' : 'bg-white/[0.04]'}`} />
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
          <motion.h1 variants={fadeUpPrimary} className={`text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] ${isLight ? 'text-[rgba(23,32,51,0.92)]' : 'text-[rgba(255,255,255,0.82)]'}`}>
            members
          </motion.h1>
          
          <motion.p variants={fadeUpPrimary} className={`max-w-[500px] mt-6 text-[14px] leading-[1.7] ${isLight ? 'text-[rgba(23,32,51,0.6)]' : 'text-white/40'}`}>
            A collective of students who love to break things, build fun projects, and ship together.
          </motion.p>
        </motion.div>
      </section>

      {/* STICKY FILTER & SEARCH BAR */}
      <div className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled ? (isLight ? 'bg-[#f4efe3]/90 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 py-4') : 'bg-transparent py-4'}`}>
        <div className="px-6 md:px-[52px] flex flex-col lg:flex-row lg:items-center justify-between gap-6 max-w-[1600px] mx-auto">
          
          {/* Alphabet Filter (Desktop: Left, Mobile: Top/Scrollable) */}
          <div className="flex-1 overflow-x-auto no-scrollbar mask-edges-right">
            <div className="flex items-center gap-1.5 w-max pb-2 lg:pb-0">
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.1em] transition-all duration-300 ${!activeLetter ? (isLight ? 'bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.1)]' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]') : (isLight ? 'bg-black/5 text-black/40 hover:bg-black/10 hover:text-black' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white')}`}
              >
                ALL
              </button>
              <div className={`w-px h-4 mx-2 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
              {ALPHABET.map((letter) => {
                const hasMembers = sortedMembers.some(m => m.name.toUpperCase().startsWith(letter));
                return (
                  <button
                    key={letter}
                    onClick={() => hasMembers && setActiveLetter(letter === activeLetter ? null : letter)}
                    disabled={!hasMembers}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-[11px] transition-all duration-300
                      ${activeLetter === letter ? (isLight ? 'bg-black/10 text-black border border-black/20' : 'bg-white/15 text-white border border-white/20') : 'border border-transparent'}
                      ${!hasMembers ? 'opacity-10 cursor-not-allowed' : (isLight ? 'text-black/40 hover:text-black hover:bg-black/5' : 'text-white/40 hover:text-white hover:bg-white/5')}
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
            <div className={`absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md pointer-events-none ${isLight ? 'bg-gradient-to-r from-black/5 to-transparent' : 'bg-gradient-to-r from-white/10 to-transparent'}`} />
            <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${isLight ? 'text-black/30 group-focus-within:text-black/70' : 'text-white/30 group-focus-within:text-white/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`relative w-full h-11 rounded-full pl-11 pr-14 text-[13px] focus:outline-none transition-all duration-300 ${
                isLight 
                ? 'bg-black/[0.03] border border-black/10 shadow-[inset_0_1px_0_rgba(0,0,0,0.02),0_2px_10px_rgba(0,0,0,0.05)] text-black/90 placeholder:text-black/30 focus:border-black/20 focus:bg-black/[0.06]' 
                : 'bg-white/[0.02] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_10px_rgba(0,0,0,0.2)] text-white/90 placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.04]'
              }`}
            />
            {!searchQuery ? (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className={`font-sans text-[10px] px-1.5 py-0.5 rounded border ${isLight ? 'text-black/30 bg-black/5 border-black/10' : 'text-white/30 bg-white/5 border-white/10'}`}>⌘</kbd>
                <kbd className={`font-sans text-[10px] px-1.5 py-0.5 rounded border ${isLight ? 'text-black/30 bg-black/5 border-black/10' : 'text-white/30 bg-white/5 border-white/10'}`}>K</kbd>
              </div>
            ) : (
              <button 
                onClick={() => setSearchQuery("")}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-all z-10 ${isLight ? 'bg-black/10 text-black/60 hover:text-black hover:bg-black/20' : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'}`}
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-10"
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
                onClick={() => setSelectedMember(member)}
              >
                {/* Image Container with Spotlight/Glow effect */}
                <motion.div layoutId={`member-image-${member.key}`} className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-5 border ${isLight ? 'bg-black/[0.02] border-black/5 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)]' : 'bg-white/[0.02] border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-white/80' : 'from-black/80'} via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
                  
                  {/* Image */}
                  <img
                    src={member.profile_pic || ''}
                    alt={member.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />

                  {/* Social Links on Hover (Always visible on mobile) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-2 max-md:translate-y-0 max-md:opacity-100 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    {member.GitHub && member.GitHub !== "-" && (
                      <a href={member.GitHub || undefined} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${isLight ? 'bg-white/80 border-black/10 text-black hover:text-white hover:bg-black' : 'bg-black/80 border-white/20 text-white hover:text-black hover:bg-white'}`} onClick={(e) => e.stopPropagation()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    )}
                    {member.LinkedIn && member.LinkedIn !== "-" && (
                      <a href={member.LinkedIn || undefined} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${isLight ? 'bg-white/80 border-black/10 text-black hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2]' : 'bg-black/80 border-white/20 text-white hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2]'}`} onClick={(e) => e.stopPropagation()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Info */}
                <div className="px-1 text-center flex flex-col items-center">
                  <motion.h3 layoutId={`member-name-${member.key}`} className={`text-[14px] sm:text-[16px] font-bold tracking-tight transition-colors ${isLight ? 'text-black/90 group-hover:text-black' : 'text-white/90 group-hover:text-white'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
                    {member.name}
                  </motion.h3>
                  <p className={`mt-2 text-[12px] leading-[1.5] transition-colors line-clamp-3 max-w-[95%] ${isLight ? 'text-black/50 group-hover:text-black/70' : 'text-white/40 group-hover:text-white/60'}`}>
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
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-2xl ${isLight ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}>
                <svg className={`w-6 h-6 ${isLight ? 'text-black/30' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className={`text-[18px] font-medium ${isLight ? 'text-black/80' : 'text-white/80'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>No match found</h3>
              <p className={`text-[13px] mt-2 ${isLight ? 'text-black/40' : 'text-white/40'}`}>Adjust your filters or try a different search query.</p>
              
              <button 
                onClick={() => { setSearchQuery(""); setActiveLetter(null); }}
                className={`mt-8 px-6 py-2.5 rounded-full text-[12px] font-bold tracking-wide transition-colors ${isLight ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90'}`}
              >
                CLEAR FILTERS
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} isLight={isLight} />

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
    </LayoutGroup>
  );
}

function MemberModal({ member, onClose, isLight }: { member: any; onClose: () => void; isLight: boolean }) {
  const [githubUser, setGithubUser] = useState<any>(null);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!member?.GitHub || member.GitHub === "-") return;
    
    // Extract username
    let username = null;
    try {
      if (member.GitHub.includes('github.com')) {
        const url = new URL(member.GitHub);
        username = url.pathname.split('/').filter(Boolean)[0];
      } else {
        username = member.GitHub.replace('@', ''); // naive fallback
      }
    } catch (e) {
      username = member.GitHub.replace('@', ''); // naive fallback
    }

    if (username) {
      setLoading(true);
      Promise.all([
        fetch(`https://api.github.com/users/${username}`).then(r => r.ok ? r.json() : null),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`).then(r => r.ok ? r.json() : null)
      ]).then(([user, repos]) => {
        if (user) setGithubUser(user);
        if (repos && Array.isArray(repos)) setGithubRepos(repos);
      }).catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [member]);

  // Lock body scroll
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [member]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 backdrop-blur-md ${isLight ? 'bg-white/40' : 'bg-black/60'}`}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`relative w-full max-w-5xl h-[85vh] md:h-[650px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row rounded-3xl shadow-2xl ${
              isLight ? 'bg-[#f4efe3] border border-black/10 text-black' : 'bg-[#0a0a0a] border border-white/10 text-white'
            }`}
          >
            {/* Left Column: Image & Basic Info */}
            <div className={`w-full shrink-0 md:w-[40%] p-8 md:p-10 flex flex-col items-center border-b md:border-b-0 md:border-r relative ${isLight ? 'border-black/10 bg-white/40' : 'border-white/10 bg-[#111]'}`}>
              {/* Subtle glow effect */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 blur-[80px] pointer-events-none ${isLight ? 'bg-[#098d9c]/10' : 'bg-[#77CE90]/10'}`} />
              
              <motion.div layoutId={`member-image-${member.key}`} className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden mb-8 border-4 shadow-xl z-10" style={{ borderColor: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.05)' }}>
                <img src={member.profile_pic} alt={member.name} className="w-full h-full object-cover" />
              </motion.div>

              <motion.h2 layoutId={`member-name-${member.key}`} className={`text-2xl md:text-3xl font-bold text-center tracking-tight mb-2 z-10 ${isLight ? 'text-black' : 'text-white'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
                {member.name}
              </motion.h2>

              <div className="flex flex-col gap-3 w-full mt-6 z-10">
                {member.location && (
                  <div className={`flex items-center gap-3 text-sm font-medium ${isLight ? 'text-black/60' : 'text-white/60'}`}>
                    <MapPin size={16} />
                    <span>{member.location}</span>
                  </div>
                )}
                {member.company && (
                  <div className={`flex items-center gap-3 text-sm font-medium ${isLight ? 'text-black/60' : 'text-white/60'}`}>
                    <Briefcase size={16} />
                    <span>{member.company}</span>
                  </div>
                )}
                {member.email && member.email !== "-" && (
                  <div className={`flex items-center gap-3 text-sm font-medium ${isLight ? 'text-black/60' : 'text-white/60'}`}>
                    <Mail size={16} />
                    <a href={`mailto:${member.email}`} className="hover:underline line-clamp-1">{member.email}</a>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-8 w-full z-10">
                {member.GitHub && member.GitHub !== "-" && (
                  <a href={member.GitHub} target="_blank" rel="noopener noreferrer" className={`group flex-1 flex justify-center items-center gap-2 py-3 rounded-2xl transition-all duration-300 text-sm font-bold shadow-sm border ${isLight ? 'bg-black text-white hover:bg-black/80 border-transparent' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                    <Github size={18} className={isLight ? 'text-white' : 'text-white'} /> GitHub
                  </a>
                )}
                {member.LinkedIn && member.LinkedIn !== "-" && (
                  <a href={member.LinkedIn} target="_blank" rel="noopener noreferrer" className={`group flex-1 flex justify-center items-center gap-2 py-3 rounded-2xl transition-all duration-300 text-sm font-bold shadow-sm border ${isLight ? 'bg-[#0a66c2] text-white hover:bg-[#084e96] border-transparent' : 'bg-[#0a66c2]/20 border-[#0a66c2]/30 text-[#4799eb] hover:bg-[#0a66c2]/30'}`}>
                    <Linkedin size={18} className={isLight ? 'text-white' : 'text-[#4799eb]'} /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Bio & GitHub Integration */}
            <div className="w-full md:w-[60%] p-8 md:p-10 md:overflow-y-auto no-scrollbar relative">
              <h3 className={`text-[10px] font-bold mb-4 uppercase tracking-[0.2em] ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>About</h3>
              <p className={`text-base leading-relaxed mb-10 ${isLight ? 'text-black/80' : 'text-white/80'}`}>
                {member.desc || "Contributor"}
              </p>

              {member.GitHub && member.GitHub !== "-" && (
                <div>
                  <div className={`w-full h-px mb-10 ${isLight ? 'bg-black/5' : 'bg-white/5'}`} />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <Github size={20} className={isLight ? 'text-black' : 'text-white'} />
                    <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>GitHub Activity</h3>
                  </div>

                  {loading ? (
                    <div className="animate-pulse space-y-4">
                      <div className={`h-28 rounded-2xl ${isLight ? 'bg-black/5' : 'bg-white/5'}`} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={`h-36 rounded-2xl ${isLight ? 'bg-black/5' : 'bg-white/5'}`} />
                        <div className={`h-36 rounded-2xl ${isLight ? 'bg-black/5' : 'bg-white/5'}`} />
                      </div>
                    </div>
                  ) : githubUser ? (
                    <div className="space-y-8">
                      {/* GitHub Stats */}
                      <div className={`flex items-center justify-around py-6 px-4 rounded-3xl border shadow-sm ${isLight ? 'bg-white border-black/5' : 'bg-[#161616] border-white/5'}`}>
                        <div className="text-center">
                          <div className="text-3xl font-bold">{githubUser.public_repos}</div>
                          <div className={`text-xs uppercase tracking-wider mt-2 font-semibold ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>Repos</div>
                        </div>
                        <div className={`w-px h-12 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
                        <div className="text-center">
                          <div className="text-3xl font-bold">{githubUser.followers}</div>
                          <div className={`text-xs uppercase tracking-wider mt-2 font-semibold ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>Followers</div>
                        </div>
                        <div className={`w-px h-12 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
                        <div className="text-center">
                          <div className="text-3xl font-bold">{githubUser.following}</div>
                          <div className={`text-xs uppercase tracking-wider mt-2 font-semibold ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>Following</div>
                        </div>
                      </div>

                      {/* Repositories */}
                      {githubRepos.length > 0 && (
                        <div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {githubRepos.map(repo => (
                              <a 
                                key={repo.id} 
                                href={repo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-sm ${isLight ? 'bg-white hover:shadow-md border-black/5 hover:border-black/15' : 'bg-[#161616] border-white/5 hover:border-white/15'}`}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <h5 className={`font-bold text-sm flex-1 mr-2 leading-tight group-hover:underline ${isLight ? 'text-black' : 'text-white'}`}>{repo.name}</h5>
                                  <ExternalLink size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 ${isLight ? 'text-black/40' : 'text-white/40'}`} />
                                </div>
                                <p className={`text-[13px] line-clamp-2 mb-4 flex-1 ${isLight ? 'text-black/50' : 'text-white/50'}`}>
                                  {repo.description || "No description provided."}
                                </p>
                                <div className={`flex items-center gap-4 text-[11px] mt-auto font-bold ${spaceMono.className} ${isLight ? 'text-black/40' : 'text-white/40'}`}>
                                  {repo.language && (
                                    <span className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                                      {repo.language}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1.5"><Star size={12} /> {repo.stargazers_count}</span>
                                  <span className="flex items-center gap-1.5"><GitFork size={12} /> {repo.forks_count}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl text-sm text-center ${isLight ? 'bg-black/5 text-black/50' : 'bg-white/5 text-white/50'}`}>
                      Could not load GitHub data.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Minimal Close Button in corner for fallback (Dock is main) */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-colors md:hidden ${
                isLight ? 'bg-black/5 hover:bg-black/10 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <X size={16} />
            </button>
          </motion.div>

          {/* Floating Dock (kept from projects aesthetic) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className={`fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 hidden md:flex items-center gap-1 p-1.5 rounded-2xl md:backdrop-blur-xl border shadow-[0_0_30px_rgba(0,0,0,0.4)] ${isLight ? 'bg-white/90 border-black/10' : 'bg-[#1a1a1a]/90 border-white/10'}`}
          >
            <button
              onClick={onClose}
              className={`flex items-center gap-2 h-10 px-4 rounded-xl transition-colors text-xs font-bold tracking-wide ${spaceMono.className} ${isLight ? 'bg-black/5 hover:bg-black/10 text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              <X size={14} />
              <span>ESC</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
