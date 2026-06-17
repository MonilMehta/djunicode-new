"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface Project {
    title: string;
    description: string;
    slug: string;
    coverImage: string;
    type: string[];
}

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Track scroll progress strictly within this section container
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // We want the projects on the right to scroll horizontally
    // 0 = right-aligned, -100% = fully scrolled left
    
    // Removing useSpring entirely for mobile lag issues, using direct scroll progress mapping
    // This perfectly syncs the translation to the scroll container avoiding physics jank
    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

    if (!projects || projects.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="bg-[#050505] relative projects-section"
            style={{ 
                height: `${(projects.length * 100)}vh` 
            }}
        >
            <div className="sticky top-0 h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">

                {/* ── Left Side: Pinned Header ───────────────────────────── */}
                <div className="w-full md:w-[40%] h-auto md:h-full px-6 md:px-12 pt-8 md:pt-32 pb-6 md:pb-32 flex flex-col justify-between shrink-0 z-30 bg-[#050505] shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:shadow-[20px_0_50px_rgba(0,0,0,0.9)] position-relative" style={{ transform: "translateZ(0)" }}>
                    <div>
                        <div className="flex items-center gap-3 mb-4 md:mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#77CE90] shadow-[0_0_8px_rgba(119,206,144,0.6)] animate-pulse" />
                            <span className="text-[#77CE90] font-mono text-xs md:text-sm tracking-widest uppercase font-semibold">
                                Highlighted Work
                            </span>
                        </div>
                        <h2
                            className="text-white"
                            style={{
                                fontFamily: "'Satoshi','Inter',sans-serif",
                                fontSize: "clamp(3.5rem, 6vw, 6rem)",
                                fontWeight: 700,
                                lineHeight: 1.05,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            featured <br /> projects
                        </h2>

                        <p
                            className="text-white/50 mt-4 md:mt-8 max-w-sm text-sm md:text-lg leading-relaxed"
                            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                        >
                            A curated selection of our most impactful technical builds and digital experiences.
                        </p>
                    </div>

                    <div className="hidden md:block mt-auto">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:bg-[#77CE90] hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(119,206,144,0.3)]"
                        >
                            <span>View Archive</span>
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* ── Right Side: Horizontally Scrolling Cards ───────────── */}
                <div className="w-full md:w-[60%] h-full flex items-center relative overflow-hidden bg-[#050505]">
                    <motion.div
                        className="flex items-start md:items-center gap-6 md:gap-16 px-6 md:px-16"
                        style={{
                            x: xTransform,
                            willChange: "transform"
                        }}
                    >
                        {projects.map((project, idx) => (
                            <div
                                key={project.slug}
                                className="w-[85vw] md:w-[600px] shrink-0 group relative"
                            >
                                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                                    <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden relative border border-[#222] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: "translateZ(0)" }}>
                                        {/* Image */}
                                        {project.coverImage && (
                                            <Image
                                                src={project.coverImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:scale-105"
                                                sizes="(max-width: 768px) 85vw, 600px"
                                                priority={idx === 0}
                                                quality={60}
                                            />
                                        )}
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                <ArrowUpRight size={32} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Metadata */}
                                    <div className="mt-6 md:mt-8 flex justify-between items-start">
                                        <div className="pr-4">
                                            <span className="block text-white/50 font-mono text-xs md:text-sm tracking-widest uppercase mb-2">
                                                {String(idx + 1).padStart(2, "0")} — {project.type?.length > 0 ? project.type.join(" + ") : "Featured"}
                                            </span>
                                            <h3
                                                className="text-white text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight"
                                                style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                                            >
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Mobile view arrow */}
                                        <div className="md:hidden mt-2 p-2 sm:p-3 rounded-full border border-[#333] text-white/50 shrink-0">
                                            <ArrowUpRight size={18} className="sm:w-[20px] sm:h-[20px]" />
                                        </div>
                                    </div>

                                    <p
                                        className="text-white/60 text-base mt-4 max-w-lg line-clamp-2 md:line-clamp-none"
                                        style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                                    >
                                        {project.description}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile View Archive Button */}
                <div className="w-full p-6 pb-12 bg-[#050505] md:hidden border-t border-[#222]">
                    <Link
                        href="/projects"
                        className="flex w-full justify-center items-center gap-3 bg-[#111] border border-[#333] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm"
                    >
                        <span>View Archive</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
