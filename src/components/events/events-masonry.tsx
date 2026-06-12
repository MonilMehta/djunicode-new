"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";

interface Event {
    title: string;
    description: string;
    slug: string;
    links?: string[];
    gallery: string[];
    yearLabel: string;
}

function EventCard({ event, index }: { event: Event; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const coverImage = event.gallery?.[0] ?? null;

    // Use intersection observer to trigger animation slightly before scrolling into view
    const isInView = useInView(cardRef, { once: true, margin: "0px 0px -10% 0px" });

    // Different staggers for columns to give it that organic masonry entry
    const delay = (index % 3) * 0.15;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            className="w-full mb-8 md:mb-12"
        >
            <Link href={`/events/${event.slug}`} className="group block w-full h-full">
                <div className="w-full h-full flex flex-col bg-[#050505] border border-white/5 hover:border-white/15 rounded-[24px] p-4 md:p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

                    {/* Image Container */}
                    <div
                        className="relative w-full rounded-[16px] overflow-hidden bg-[#111] mb-6"
                        style={{ aspectRatio: index % 2 === 0 ? "4/3" : "1/1" }}
                    >
                        {coverImage ? (
                            <Image
                                src={coverImage}
                                alt={event.title}
                                fill
                                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <CalendarDays size={40} className="text-white/10" />
                            </div>
                        )}

                        {/* Hover Overlay Icon */}
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full p-2.5 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col flex-1 px-2 pb-2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 text-[#77CE90] font-mono text-xs tracking-widest uppercase font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#77CE90] shadow-[0_0_6px_rgba(119,206,144,0.7)]" />
                                {event.yearLabel}
                            </span>
                        </div>

                        <h3
                            className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[#77CE90] transition-colors duration-300"
                            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                        >
                            {event.title}
                        </h3>

                        <p className="text-white/50 text-base line-clamp-2 md:line-clamp-3 leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function EventsMasonry({ events }: { events: Event[] }) {
    const [cols, setCols] = useState(3);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 768) setCols(1);
            else if (window.innerWidth < 1024) setCols(2);
            else setCols(3);
        };

        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    // Split events into columns
    const columns: Event[][] = Array.from({ length: cols }, () => []);
    events.forEach((event, i) => {
        columns[i % cols].push(event);
    });

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32 events-masonry-root">
            <div className="flex gap-6 md:gap-8 lg:gap-12 w-full">
                {columns.map((colEvents, colIdx) => (
                    <div key={colIdx} className="flex-1 flex flex-col w-full">
                        {/* 
                            Offset the middle column slightly downwards on desktop
                            to enhance the masonry stagger look
                        */}
                        <div className={cols >= 3 && colIdx === 1 ? "md:mt-16 lg:mt-24" : cols >= 3 && colIdx === 2 ? "md:mt-8 lg:mt-12" : ""}>
                            {colEvents.map((event, idx) => {
                                // Calculate global index for staggering animations properly
                                const globalIdx = idx * cols + colIdx;
                                return <EventCard key={event.slug} event={event} index={globalIdx} />;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
