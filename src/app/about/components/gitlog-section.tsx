"use client";

import React, { useRef, useState, useEffect } from "react";
import { Space_Mono } from "next/font/google";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const DISPLAY_SANS = "'Satoshi','Inter',system-ui,sans-serif" as const;

const PRINCIPLES = [
  {
    num: "1",
    title: "Write code with friends",
    text: "No more 'update file' commits on dead solo repos. We build in teams, review each other's terrible first drafts, and learn how real software is actually made.",
  },
  {
    num: "2",
    title: "Escape tutorial hell",
    text: "We stop watching endless crash courses and just start building. When things inevitably break, we figure it out as a group.",
  },
  {
    num: "3",
    title: "From idea to live link",
    text: "We don't just build toy demos that sit on localhost. We take wild late-night ideas, hack them together, and deploy them so anyone can use them.",
  },
  {
    num: "4",
    title: "Learn, then teach",
    text: "You spend hours debugging something stupid, finally figure it out, and then save the next batch from the exact same headache. That's the club loop.",
  },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#";

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame = 0;
    let animationFrameId: number;
    // Speed up or slow down based on length, but keep it snappy
    const totalFrames = Math.max(20, Math.min(40, text.length));
    
    const scramble = () => {
      frame++;
      
      const nextText = text.split("").map((char, i) => {
        if (char === " ") return " ";
        // Reveal threshold is based on index to create a wave effect
        const revealThreshold = (i / text.length) * totalFrames * 0.5; 
        
        if (frame >= revealThreshold) {
            const resolveProgress = (frame - revealThreshold) / (totalFrames * 0.5);
            if (Math.random() < resolveProgress) {
                return char;
            }
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");
      
      setDisplayText(nextText);
      
      if (frame < totalFrames) {
        animationFrameId = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
      }
    };
    
    scramble();
    return () => cancelAnimationFrame(animationFrameId);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

export function GitlogSection({ embedded = false }: { embedded?: boolean } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalSections = PRINCIPLES.length;
      
      // We will move the track horizontally
      // We want the scroll distance to map nicely to the sections
      // Let's use `end: "+=300%"` for 4 sections, meaning we scroll for 3 screens height
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // progress is 0 to 1
            const index = Math.round(self.progress * (totalSections - 1));
            setActiveIndex(Math.min(totalSections - 1, Math.max(0, index)));
          },
        }
      });
      
      // The track translates horizontally by -100% of its width + 1 viewport width 
      // Because we want the last section to stop at the center or fill the screen
      // For 4 items (400vw width), moving it by -300vw brings the 4th item to the screen.
      tl.to(track, {
        xPercent: -100 + (100 / totalSections),
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activePrinciple = PRINCIPLES[activeIndex];

  return (
    <section 
      ref={sectionRef} 
      className={`relative bg-[#080808] text-[#e0e0e0] overflow-hidden ${embedded ? "h-[80vh]" : "h-screen"} w-full flex items-center border-y border-white/[0.04]`}
    >
      {/* Background Track */}
      <div 
        ref={trackRef} 
        className="absolute top-0 left-0 h-full flex items-center will-change-transform"
        style={{ width: `${PRINCIPLES.length * 100}vw` }}
      >
        {PRINCIPLES.map((principle) => (
          <div 
            key={principle.num} 
            className="w-[100vw] h-full flex items-center justify-center relative border-r border-white/[0.02] overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#77CE90]/10 to-transparent opacity-50" />
             {/* Huge background number */}
             <div className={`text-[50vw] font-bold text-[#77CE90]/[0.02] ${spaceMono.className} leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
               0{principle.num}
             </div>
          </div>
        ))}
      </div>

      {/* Pinned Title */}
      {!embedded && (
        <div className="absolute top-12 md:top-24 left-6 md:left-[52px] z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(40px,8vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] text-[rgba(255,255,255,0.82)]">
              how we learn.
            </h2>
          </motion.div>
        </div>
      )}

      {/* Fixed Content that updates with scramble */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[52px] right-6 md:right-[52px] z-10 pointer-events-none mt-[10vh]">
        <div className="max-w-4xl pointer-events-auto bg-[#080808]/40 backdrop-blur-md p-8 md:p-12 rounded-[32px] border border-white/[0.04]">
          <div className={`text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#77CE90] mb-6 md:mb-10 ${spaceMono.className}`}>
            <ScrambleText text={`0${activePrinciple.num}`} />
          </div>
          
          <h3
            className="text-[28px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.1] text-white/90 mb-6 md:mb-8 min-h-[2.2em] md:min-h-[1.1em]"
            style={{ fontFamily: DISPLAY_SANS }}
          >
            <ScrambleText text={activePrinciple.title} />
          </h3>
          
          <p
            className="text-[16px] md:text-[20px] leading-[1.6] text-white/40 min-h-[4.8em] md:min-h-[3.2em]"
            style={{ fontFamily: DISPLAY_SANS }}
          >
            <ScrambleText text={activePrinciple.text} />
          </p>
        </div>
      </div>
    </section>
  );
}
