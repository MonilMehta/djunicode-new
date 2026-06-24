"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
interface Founder {
    name: string;
    pic: string;
    text: string;
    github?: string;
    linkedin?: string;
}

// ─── Single Stacking Card ────────────────────────────────────────────────────
function FounderCard({
    founder,
    index,
    totalCards,
    scrollYProgress,
}: {
    founder: Founder;
    index: number;
    totalCards: number;
    scrollYProgress: MotionValue<number>;
}) {
    const startDim = index / totalCards;
    const endDim = (index + 1) / totalCards;
    const scale = useTransform(scrollYProgress, [startDim, endDim], [1, 0.92]);

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <motion.div
            className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center p-6 md:p-10 origin-top"
            style={{
                top: `calc(${index * (isMobile ? 20 : 40)}px)`,
                scale: isMobile ? 1 : scale,
                zIndex: index + 10,
                transform: "translateZ(0)",
                willChange: "transform"
            }}
        >
            {/* The title sits inside the FIRST card's sticky layer so it scrolls out naturally */}
            {index === 0 && (
                <div className="absolute top-8 md:top-8 left-6 md:left-10 text-left pointer-events-none z-50">
                    <h2
                        className="text-white drop-shadow-lg"
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        founding context
                    </h2>
                </div>
            )}

            <div
                className="w-full max-w-6xl bg-[#0A0A0A] border border-[#222] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[75vh] md:h-[70vh]"
                style={{
                    marginTop: index === 0 ? "12vh" : "0",
                }}
            >
                {/* Image (Mobile Only - Top) */}
                <div className="w-full h-[35%] md:hidden relative shrink-0 bg-[#111]">
                    {founder.pic ? (
                        <Image
                            src={founder.pic}
                            alt={founder.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 42vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
                </div>

                {/* Text & Quote */}
                <div className="flex-1 p-6 md:p-14 flex flex-col justify-center relative bg-gradient-to-br from-[#111] to-[#050505] border-t md:border-t-0 md:border-r border-[#222] overflow-y-auto md:overflow-visible">
                    <span className="text-[#77CE90] font-mono text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6 block shrink-0">
                        0{index + 1} / FOUNDER
                    </span>
                    <h3
                        className="mb-3 md:mb-4 text-white shrink-0"
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        {founder.name}
                    </h3>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 mb-4 md:mb-6 shrink-0">
                        {founder.github && (
                            <a
                                href={founder.github || undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:scale-110"
                                aria-label={`${founder.name} GitHub`}
                                style={{ color: "#a371f7" }}
                            >
                                <Github size={20} className="md:w-[24px] md:h-[24px]" color="#a371f7" />
                            </a>
                        )}
                        {founder.linkedin && (
                            <a
                                href={founder.linkedin || undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:scale-110"
                                aria-label={`${founder.name} LinkedIn`}
                                style={{ color: "#0a66c2" }}
                            >
                                <Linkedin size={20} className="md:w-[24px] md:h-[24px]" color="#0a66c2" fill="#0a66c2" />
                            </a>
                        )}
                    </div>

                    <p
                        className="text-base md:text-xl leading-snug md:leading-[1.7] text-white/70 font-light max-w-2xl"
                        style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                    >
                        "{founder.text}"
                    </p>
                </div>

                {/* Right: Image (Desktop Only) */}
                <div className="hidden md:block w-[42%] h-full relative shrink-0 bg-[#111]">
                    {founder.pic ? (
                        <Image
                            src={founder.pic}
                            alt={founder.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 42vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none hidden md:block" />
                </div>
            </div>
        </motion.div>
    );
}

// ─── Component ───────────────────────────────────────────────────────────────
export function FoundersSection({ founders }: { founders: Founder[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section className="bg-[#050505] relative pb-32 founders-section">
            <div
                ref={containerRef}
                className="relative w-full"
                style={{ height: `${founders.length * 100}vh` }}
            >
                {founders.map((founder, i) => (
                    <FounderCard
                        key={founder.name}
                        founder={founder}
                        index={i}
                        totalCards={founders.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
}
