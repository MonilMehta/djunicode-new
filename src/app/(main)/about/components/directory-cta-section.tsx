'use client';

import React from 'react';
import Link from 'next/link';
import { Space_Mono } from 'next/font/google';
import { useTheme } from '@/lib/theme-context';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const ROW_1_AVATARS = [
  '/images/profile/AdityaJ42.JPG',
  '/images/profile/AniketShahane.jpg',
  '/images/profile/ArnavParekhji.jpg',
  '/images/profile/Aryan-1.jpg',
  '/images/profile/Deepika_Muchhala.jpeg',
  '/images/profile/Dev_Shah.png',
  '/images/profile/Devansh_Ashar.jpg',
  '/images/profile/DhruvBhagadia.jpg',
];

const ROW_2_AVATARS = [
  '/images/profile/Dhyeythumar.jpg',
  '/images/profile/GT.jpeg',
  '/images/profile/Gaurang_Singhania.jpg',
  '/images/profile/Gauri_Bhosle.jpg',
  '/images/profile/Harsh.jpg',
  '/images/profile/HuM4NoiD.jpg',
  '/images/profile/20k.jpg',
  '/images/profile/Bruh.jpeg',
];

export function DirectoryCtaSection() {
  const { isLight } = useTheme();
  
  return (
    <section 
      className={`relative w-full overflow-hidden border-t py-24 md:py-32 flex flex-col items-center justify-center`}
      style={{
        backgroundColor: isLight ? "var(--bg-strong)" : "#050505",
        borderColor: isLight ? "rgba(0,0,0,0.08)" : "#111"
      }}
    >
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>

      {/* Radial Glow Behind Text */}
      <div className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,${isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)'}_0%,transparent_60%)] pointer-events-none`} />

      {/* Marquee Background */}
      <div className={`absolute inset-0 z-0 flex flex-col justify-center gap-6 ${isLight ? 'opacity-[0.15]' : 'opacity-[0.25]'} pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]`}>
        {/* Row 1 */}
        <div className="flex w-[200%] animate-scroll-left">
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {ROW_1_AVATARS.map((src, i) => (
              <img key={i} src={src} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover saturate-50 blur-[1px] transition-all duration-700" alt={`DJ Unicode Member ${i + 1}`} />
            ))}
          </div>
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {ROW_1_AVATARS.map((src, i) => (
              <img key={'dup-' + i} src={src} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover saturate-50 blur-[1px] transition-all duration-700" alt={`DJ Unicode Member Duplicate ${i + 1}`} />
            ))}
          </div>
        </div>
        
        {/* Row 2 */}
        <div className="flex w-[200%] animate-scroll-right -ml-[20%]">
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {ROW_2_AVATARS.map((src, i) => (
              <img key={i} src={src} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover saturate-50 blur-[1px] transition-all duration-700" alt={`DJ Unicode Member Row 2 ${i + 1}`} />
            ))}
          </div>
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {ROW_2_AVATARS.map((src, i) => (
              <img key={'dup-' + i} src={src} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover saturate-50 blur-[1px] transition-all duration-700" alt={`DJ Unicode Member Row 2 Duplicate ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Extreme Vignette overlay to fade out the edges completely */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          boxShadow: isLight ? "inset 0 0 150px 100px var(--bg-strong)" : "inset 0 0 150px 100px #050505"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-4">
        <h2 className={`text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] mb-12 ${isLight ? 'text-[rgba(23,32,51,0.92)]' : 'text-[rgba(255,255,255,0.82)]'}`}>
          Looking for<br className="hidden md:block" />
          <span className="md:hidden"> </span>
          <span className={`italic font-medium tracking-tight ${isLight ? 'text-black/40' : 'text-white/40'}`}>someone?</span>
        </h2>
        
        <Link 
          href="/members" 
          className={`group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full border px-10 backdrop-blur-md transition-all duration-300 active:scale-95 ${
            isLight 
            ? 'bg-black/[0.03] border-black/10 hover:bg-black/[0.08] hover:border-black/20'
            : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
          }`}
        >
          <span className={`relative flex items-center gap-3 transition-colors ${isLight ? 'text-black/90 group-hover:text-black' : 'text-white/90 group-hover:text-white'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
            Member Directory
            <svg className="w-5 h-5 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
      </div>

    </section>
  );
}
