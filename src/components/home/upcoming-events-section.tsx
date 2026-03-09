"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";

interface Event {
    title: string;
    description: string;
    time?: string;
    venue?: string;
    slug: string;
    links?: string[];
    gallery: string[];
    yearLabel: string;
    imageAspect?: "portrait" | "landscape"; // optional hint; auto-detected if omitted
}

// ── Utility: slice a MotionValue into a sub-range ────────────────────────────
function useSlice(
    mv: MotionValue<number>,
    inStart: number,
    inEnd: number,
    outStart: number,
    outEnd: number
) {
    return useTransform(mv, [inStart, inEnd], [outStart, outEnd], { clamp: true });
}

// ── LineReveal: horizontal rule draws left to right ──────────────────────────
function LineReveal({
    progress,
    className,
}: {
    progress: MotionValue<number>;
    className?: string;
}) {
    const scaleX = useTransform(progress, [0, 1], [0, 1]);
    return (
        <motion.div
            style={{ scaleX, transformOrigin: "left center" }}
            className={`h-px bg-white/15 ${className ?? ""}`}
        />
    );
}

// ── TitleLines: title split into line groups, each slides up individually ────
function TitleLines({
    title,
    titleP,
    fontSize = "clamp(2.4rem, 5vw, 4rem)",
}: {
    title: string;
    titleP: MotionValue<number>;
    fontSize?: string;
}) {
    const words = title.split(" ");
    const lines: string[][] = [];
    for (let i = 0; i < words.length; i += 2) {
        lines.push(words.slice(i, i + 2));
    }

    return (
        <div className="flex flex-col overflow-hidden">
            {lines.map((line, i) => {
                // Each line has a slightly offset entry window within titleP [0→1]
                const fraction = 1 / lines.length;
                const start = i * fraction * 0.6;
                const end = Math.min(start + fraction + 0.25, 1);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const lineP = useTransform(titleP, [start, end], [0, 1], { clamp: true });
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(lineP, [0, 1], [32, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const op = useTransform(lineP, [0, 1], [0, 1]);

                return (
                    <div key={i} className="overflow-hidden">
                        <motion.div
                            style={{ y, opacity: op }}
                            className="will-change-transform"
                        >
                            <span
                                className="text-white block"
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontSize,
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: "-0.025em",
                                }}
                            >
                                {line.join(" ")}
                            </span>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}

export function UpcomingEventsSection({ event }: { event: Event | null }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [imgAspect, setImgAspect] = useState<"portrait" | "landscape">("portrait");

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Auto-detect image orientation
    useEffect(() => {
        if (event?.imageAspect) { setImgAspect(event.imageAspect); return; }
        const src = event?.gallery?.[0];
        if (!src) return;
        const img = new window.Image();
        img.onload = () =>
            setImgAspect(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
        img.src = src;
    }, [event]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smooth = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.4,
        restDelta: 0.0001,
    });

    if (!event) return null;

    const registrationLink = event.links?.[0] ?? null;
    const coverImage = event.gallery?.[0] ?? null;
    const isLandscape = imgAspect === "landscape" && !isMobile;

    // ── Build pipeline timing ─────────────────────────────────────────────────
    //
    //  [0.00 → 0.12]  top rule draws
    //  [0.10 → 0.28]  image clip wipe
    //  [0.26 → 0.38]  eyebrow snaps in
    //  [0.36 → 0.54]  title lines slide up (staggered internally)
    //  [0.60 → 0.72]  CTA snaps in
    //  [0.70 → 0.80]  bottom rule draws + pill fades

    const ruleTopP = useSlice(smooth, 0.00, 0.12, 0, 1);
    const imageP = useSlice(smooth, 0.10, 0.28, 0, 1);
    const eyebrowP = useSlice(smooth, 0.26, 0.38, 0, 1);
    const titleP = useSlice(smooth, 0.35, 0.55, 0, 1);
    const ctaP = useSlice(smooth, 0.5, 0.65, 0, 1);
    const ruleBottomP = useSlice(smooth, 0.70, 0.80, 0, 1);
    const pillP = useSlice(smooth, 0.72, 0.82, 0, 1);

    const imageClip = useTransform(
        imageP,
        [0, 1],
        ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
    );

    const eyebrowY = useTransform(eyebrowP, [0, 1], [10, 0]);
    const eyebrowOp = useTransform(eyebrowP, [0, 1], [0, 1]);
    const ctaY = useTransform(ctaP, [0, 1], [14, 0]);
    const ctaOp = useTransform(ctaP, [0, 1], [0, 1]);
    const pillOp = useTransform(pillP, [0, 1], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#050505] relative"
            style={{ height: "340vh" }}
        >
            <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="w-full px-6 md:px-12 pt-8 md:pt-12 flex justify-between items-start z-20 relative">
                    <h2
                        className="text-white"
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontSize: "clamp(3rem, 7vw, 6rem)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        upcoming events
                    </h2>

                    <motion.div style={{ opacity: pillOp }} className="hidden md:block mt-2 md:mt-4">
                        <Link
                            href="/events"
                            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-md transition-all duration-200"
                            style={{
                                fontFamily: "'Satoshi','Inter',sans-serif",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "#ffffff",
                                border: "1px solid rgba(255, 255, 255, 0.22)",
                            }}
                        >
                            <span>View past events</span>
                            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Top Rule ─────────────────────────────────────────────── */}
                <div className="px-6 md:px-12 mt-5 md:mt-7">
                    <LineReveal progress={ruleTopP} />
                </div>

                {/* ── Main Content ─────────────────────────────────────────── */}
                <div className="flex-1 w-full px-6 md:px-12 flex flex-col justify-center relative z-10 py-6">

                    {isLandscape ? (
                        // ── LANDSCAPE: full-width cinematic strip ─────────────
                        <div className="w-full flex flex-col gap-6">

                            {/* Strip image */}
                            <motion.div
                                style={{ clipPath: imageClip }}
                                className="relative w-full rounded-xl overflow-hidden will-change-transform"
                            >
                                <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
                                    {coverImage ? (
                                        <Image
                                            src={coverImage}
                                            alt={event.title}
                                            fill
                                            className="object-cover object-center"
                                            sizes="100vw"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center">
                                            <CalendarDays size={48} className="text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Eyebrow + title below strip */}
                            <motion.div
                                style={{ opacity: eyebrowOp, y: eyebrowY }}
                                className="flex items-center gap-3 will-change-transform"
                            >
                                <span className="inline-flex items-center gap-2 text-[#77CE90] font-mono text-xs tracking-widest uppercase font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#77CE90] shadow-[0_0_6px_rgba(119,206,144,0.7)] animate-pulse" />
                                    Upcoming Event
                                </span>
                                <span className="h-px w-6 bg-white/20" />
                                <span className="text-white/40 font-mono text-xs tracking-wider">{event.yearLabel}</span>
                            </motion.div>

                            {/* Title + View Details on same row */}
                            <div className="flex items-start justify-between gap-6 mt-2">
                                <TitleLines
                                    title={event.title}
                                    titleP={titleP}
                                    fontSize="clamp(2rem, 4vw, 3.5rem)"
                                />

                                <motion.div
                                    style={{ opacity: ctaOp, y: ctaY }}
                                    className="flex-shrink-0 will-change-transform self-center pt-2"
                                >
                                    <Link
                                        href={`/events/${event.slug}`}
                                        className="group/det inline-flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 shadow-md"
                                        style={{
                                            backgroundColor: "rgba(119, 206, 144, 0.15)",
                                            border: "1px solid rgba(119, 206, 144, 0.4)",
                                        }}
                                        title="View event details"
                                    >
                                        <ArrowUpRight
                                            size={24}
                                            style={{ color: "#77CE90" }}
                                            className="transition-transform duration-300 group-hover/det:translate-x-0.5 group-hover/det:-translate-y-0.5 group-hover/det:scale-110"
                                        />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                    ) : (
                        // ── PORTRAIT (or mobile): two-column grid ─────────────
                        <div className="w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-y-8 md:gap-x-12 items-center">

                            {/* Image */}
                            <motion.div
                                style={{ clipPath: imageClip }}
                                className="w-[60vw] md:w-[400px] lg:w-[480px] will-change-transform"
                            >
                                <div
                                    className="relative w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/[0.06]"
                                    style={{ aspectRatio: "3/4" }}
                                >
                                    {coverImage ? (
                                        <Image
                                            src={coverImage}
                                            alt={event.title}
                                            fill
                                            className="object-cover object-center"
                                            sizes="(max-width: 768px) 100vw, 320px"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <CalendarDays size={40} className="text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Text column */}
                            <div className="flex flex-col gap-4 pt-0 md:pt-1">

                                <motion.div
                                    style={{ opacity: eyebrowOp, y: eyebrowY }}
                                    className="flex items-center gap-3 will-change-transform"
                                >
                                    <span className="inline-flex items-center gap-2 text-[#77CE90] font-mono text-xs tracking-widest uppercase font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#77CE90] shadow-[0_0_6px_rgba(119,206,144,0.7)] animate-pulse" />
                                        Upcoming Event
                                    </span>
                                    <span className="h-px w-6 bg-white/20" />
                                    <span className="text-white/40 font-mono text-xs tracking-wider">{event.yearLabel}</span>
                                </motion.div>

                                {/* Title + View Details on same row */}
                                <div className="flex items-start justify-between gap-4">
                                    <TitleLines title={event.title} titleP={titleP} />

                                    <motion.div
                                        style={{ opacity: ctaOp, y: ctaY }}
                                        className="flex-shrink-0 will-change-transform self-center"
                                    >
                                        <Link
                                            href={`/events/${event.slug}`}
                                            className="group/det inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 shadow-md"
                                            style={{
                                                backgroundColor: "rgba(119, 206, 144, 0.15)",
                                                border: "1px solid rgba(119, 206, 144, 0.4)",
                                            }}
                                            title="View event details"
                                        >
                                            <ArrowUpRight
                                                size={20}
                                                style={{ color: "#77CE90" }}
                                                className="transition-transform duration-300 group-hover/det:translate-x-0.5 group-hover/det:-translate-y-0.5 group-hover/det:scale-110"
                                            />
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Description & Details */}
                                <motion.div
                                    style={{ opacity: ctaOp, y: ctaY }}
                                    className="flex flex-col gap-3 mt-2 md:max-w-md lg:max-w-lg"
                                >
                                    <p className="text-white/70 text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none font-medium">
                                        {event.description}
                                    </p>

                                    {(event.time || event.venue) && (
                                        <div className="flex flex-col gap-1.5 mt-2 text-sm text-white/50 font-mono">
                                            {event.time && (
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}
                                            {event.venue && (
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                    <span>{event.venue}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>



                {/* Mobile pill */}
                <div className="md:hidden w-full px-6 pb-10 flex justify-center mt-6">
                    <motion.div style={{ opacity: pillOp, zIndex: 100 }}>
                        <Link
                            href="/events"
                            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium shadow-md transition-all duration-200"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.12)",
                                color: "#ffffff",
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                                backdropFilter: "blur(8px)"
                            }}
                        >
                            <span>View past events</span>
                            <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}