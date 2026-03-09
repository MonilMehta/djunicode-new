"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, CalendarDays } from "lucide-react";

interface Event {
    title: string;
    description: string;
    slug: string;
    links?: string[];
    gallery: string[];
    yearLabel: string;
}

export function UpcomingEventsSection({ event }: { event: Event | null }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    // Simple hydration-safe check for mobile window size
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Apply a spring physics layer to the raw scroll progress so it feels
    // butter-smooth and not "harsh" or jumpy when tied directly to the wheel.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 25,
        mass: 0.5,
        restDelta: 0.0001
    });

    if (!event) return null;

    const registrationLink = event.links?.[0] ?? null;
    const coverImage = event.gallery?.[0] ?? null;

    // -- Scroll Transforms (Using smoothProgress) --

    // Image movement: on desktop, starts shifted by 320px (pushing it to center),
    // then transforms to 0 (its natural left-aligned position in the grid).
    const imgXDesktop = useTransform(smoothProgress, [0, 0.45], [260, 0]);
    // Text movement: on desktop, starts shifted by -320px (hidden behind image),
    // then transforms to 0 (natural right-aligned position).
    const textXDesktop = useTransform(smoothProgress, [0, 0.45], [-260, 0]);

    // Text opacity
    const textOpacityDesktop = useTransform(smoothProgress, [0.1, 0.45], [0, 1]);

    // Pill opacity
    const pillOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);

    // Glow opacity
    const glowOpacity = useTransform(smoothProgress, [0.1, 0.4, 0.7], [0, 0.4, 0]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#050505] relative"
            style={{ height: "200vh" }}
        >
            <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
                {/* ── Top Header Row ────────────────────────────────────────── */}
                <div className="w-full px-6 md:px-10 pt-8 md:pt-12 flex justify-between items-start z-20">
                    <h2
                        className="text-white"
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        upcoming events
                    </h2>

                    {/* View Past Events pill (Desktop) */}
                    <motion.div
                        style={{ opacity: pillOpacity }}
                        className="hidden md:block mt-2 md:mt-4"
                    >
                        <Link
                            href="/events"
                            className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 rounded-full px-5 py-2.5 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm"
                            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                        >
                            <span>View past events</span>
                            <ArrowRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Main Content Area (Grid) ──────────────────────────────── */}
                <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-center relative">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 items-center relative z-10 p-4">

                        {/* ── Left: Image Card ──────────────────────────────── */}
                        <motion.div
                            style={{
                                x: isMobile ? 0 : imgXDesktop
                            }}
                            className="w-full flex justify-center md:justify-end will-change-transform"
                        >
                            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[24px] overflow-hidden border border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] group bg-[#0A0A0A]">
                                {coverImage ? (
                                    <Image
                                        src={coverImage}
                                        alt={event.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 460px"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <CalendarDays size={48} className="text-white/10" />
                                    </div>
                                )}

                                {/* Inner glows and overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
                                <div className="absolute shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] inset-0 rounded-[24px] pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* ── Right: Text Content ───────────────────────────── */}
                        <motion.div
                            style={{
                                x: isMobile ? 0 : textXDesktop,
                                opacity: isMobile ? 1 : textOpacityDesktop
                            }}
                            className="w-full flex flex-col items-center text-center md:items-start md:text-left will-change-transform"
                        >
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 text-[#77CE90] font-mono text-xs tracking-widest uppercase font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-[#77CE90] shadow-[0_0_8px_rgba(119,206,144,0.6)] animate-pulse" />
                                    Upcoming Event
                                </span>
                                <span className="h-px w-8 bg-white/20" />
                                <span className="text-white/40 font-mono text-sm tracking-wider">
                                    {event.yearLabel}
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-white mb-6"
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {event.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="text-white/50 text-base md:text-[1.1rem] leading-relaxed mb-20 max-w-lg"
                                style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                            >
                                {event.description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                                {registrationLink && (
                                    <a
                                        href={registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 bg-[#77CE90] text-[#050505] hover:scale-105 hover:shadow-[0_0_24px_rgba(119,206,144,0.3)]"
                                        style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                                    >
                                        <span className="relative font-bold mt-[1px]">Register now</span>
                                        <ExternalLink
                                            size={16}
                                            className="relative transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                                        />
                                    </a>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Mobile View Past Events pill (shown at bottom on mobile) */}
                <div className="md:hidden w-full px-6 pb-12 flex justify-center mt-auto z-20">
                    <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all text-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm"
                    >
                        <span>View past events</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>

                {/* ── Background Event Ambient Glow ─────────────────────────── */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-[1] will-change-transform"
                    style={{
                        opacity: glowOpacity,
                        background: "radial-gradient(circle, rgba(119,206,144,0.08) 0%, transparent 60%)",
                        filter: "blur(60px)",
                    }}
                />
            </div>
        </section>
    );
}
