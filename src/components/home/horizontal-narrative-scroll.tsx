"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────
const TECH_STACKS = [
    { name: "React", desc: "UI Library", logo: "/images/techStacks/react.svg", placeholder: false },
    { name: "Node.js", desc: "Runtime", logo: "/images/techStacks/nodejs.svg", placeholder: false },
    { name: "Figma", desc: "Interface Design", logo: "/images/techStacks/Figma.svg", placeholder: false },
    { name: "Django", desc: "Backend Framework", logo: "/images/techStacks/django.svg", placeholder: false },
    { name: "Git", desc: "Version Control", logo: "/images/techStacks/git.svg", placeholder: false },
    { name: "Flask", desc: "Microframework", logo: "", placeholder: true },
    { name: "Next.js", desc: "React Framework", logo: "", placeholder: true },
];

// ─── Wheel geometry ───────────────────────────────────────────────────────────
// Icons spread across the top arc, -30° to +30° from 12-o'clock
const R = 800;  // px
const ICON_COUNT = TECH_STACKS.length;
const START_DEG = -40;
const END_DEG = 40;

const ICON_POSITIONS = Array.from({ length: ICON_COUNT }, (_, i) => {
    const t = ICON_COUNT === 1 ? 0 : i / (ICON_COUNT - 1);
    const deg = START_DEG + t * (END_DEG - START_DEG);
    const rad = (deg * Math.PI) / 180;
    return {
        x: R * Math.sin(rad),   // + = right
        y: -R * Math.cos(rad),  // + = down  (negative so icons go UP from center)
    };
});

// ─── Vignette shared style ───────────────────────────────────────────────────
const vignette = {
    background: "linear-gradient(to bottom, #050505 0%, transparent 18%, transparent 82%, #050505 100%)",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function HorizontalNarrativeScroll() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // ── Phase 1 (0 → 0.40): readme.md colour highlights ──────────────────────
    const c1 = useTransform(scrollYProgress, [0.05, 0.18], ["rgba(255,255,255,0.35)", "#FF6B6B"]);
    const c2 = useTransform(scrollYProgress, [0.18, 0.28], ["rgba(255,255,255,0.35)", "#38BDF8"]);
    const c3 = useTransform(scrollYProgress, [0.28, 0.36], ["rgba(255,255,255,0.35)", "#34D399"]);
    const c4 = useTransform(scrollYProgress, [0.36, 0.44], ["rgba(255,255,255,0.35)", "#F59E0B"]);

    // ── Phase 2 (0.40 → 0.56): horizontal pan —  ─────────────────────────────
    // Strip shifts left so "our stack" panel slides in
    const stripX = useTransform(scrollYProgress, [0.40, 0.56], ["0vw", "-100vw"]);

    // ── Phase 3 (0.56 → 0.96): wheel rotates from +120° → 0° ─────────────────
    // At +120°: all icons are off-screen to the right.
    // At   0°: icons sit in their final arc (top of the wheel = visible screen).
    const wheelRotate = useTransform(scrollYProgress, [0.56, 0.96], [120, 0]);
    // Each icon counter-rotates to stay upright
    const iconRotate = useTransform(wheelRotate, (v) => -v);

    return (
        <section
            ref={sectionRef}
            className="relative h-[1000vh] bg-[#050505]"
            id="narrative-section"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* vignette */}
                <div className="absolute inset-0 z-20 pointer-events-none" style={vignette} />

                {/* ── Horizontal strip ─────────────────────────────────────────── */}
                <motion.div
                    style={{ x: stripX }}
                    className="flex flex-row h-full w-max relative z-10"
                >

                    {/* ── Panel 1: README ─────────────────────────────────────── */}
                    <div className="w-screen h-full shrink-0 flex flex-col justify-start pt-[12vh] pl-10">
                        <div className="max-w-4xl">
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
                                readme.md
                            </h2>

                            <div
                                className="text-xl md:text-2xl font-medium leading-[1.7] mt-10 space-y-8 text-white"
                                style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                            >
                                <p>
                                    DJ Unicode is a{" "}
                                    <motion.span style={{ color: c1 }} className="font-semibold">
                                        student-run community
                                    </motion.span>{" "}
                                    of developers at Dwarkadas J. Sanghvi College of Engineering, Mumbai.
                                </p>
                                <p>
                                    We're a small group of builders exploring{" "}
                                    <motion.span style={{ color: c2 }} className="font-semibold">software engineering</motion.span>
                                    {" "}through{" "}
                                    <motion.span style={{ color: c3 }} className="font-semibold">projects, workshops, and collaborative learning</motion.span>.
                                </p>
                                <p>
                                    From{" "}
                                    <motion.span style={{ color: c4 }} className="font-semibold">first commits to full-stack systems</motion.span>,
                                    {" "}we grow by building together and teaching each other.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Panel 2: OUR STACK ──────────────────────────────────── */}
                    <div className="w-screen h-full shrink-0 relative overflow-visible">

                        {/* Title — top-left, never moves */}
                        <div className="absolute top-[10vh] left-10 z-30">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className="text-white"
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                                    fontWeight: 700,
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                our stack. 🚀
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                                viewport={{ once: true }}
                                className="mt-3 text-white/50 text-lg md:text-2xl font-light"
                                style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                            >
                                Technologies we explore and build with.
                            </motion.p>
                        </div>

                        {/* ── WHEEL ──────────────────────────────────────────────── */}
                        {/*
              The wheel's centre sits 180px below the panel bottom, horizontally centred.
              At rotation +120°, every icon is off-screen to the right.
              Scrolling rotates the wheel CCW to 0° — icons sweep in from the right
              and settle into their final arc at the top of the circle.
            */}
                        <motion.div
                            className="absolute"
                            style={{
                                left: "50%",
                                bottom: "-180px",
                                x: "-50%", // keep centre at 50% of panel
                                rotate: wheelRotate,
                                transformOrigin: "0px 0px", // rotate around the point itself
                            }}
                        >
                            {ICON_POSITIONS.map((pos, i) => {
                                const tech = TECH_STACKS[i];
                                return (
                                    <motion.div
                                        key={tech.name}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            x: pos.x,
                                            y: pos.y,
                                            rotate: iconRotate,       // counter-rotate to stay upright
                                            translateX: "-50%",
                                            translateY: "-50%",
                                        }}
                                    >
                                        {/* Card */}
                                        <div className="w-[100px] h-[100px] rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center shadow-lg group-hover:border-[#77CE90] group-hover:shadow-[0_0_24px_rgba(119,206,144,0.4)] transition-all duration-300 overflow-hidden">
                                            {tech.placeholder ? (
                                                <span className="text-white/80 font-mono font-bold text-xl select-none">
                                                    {tech.name === "Next.js" ? "▲" : "~"}
                                                </span>
                                            ) : (
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={42}
                                                    height={42}
                                                    className="w-[58%] h-[58%] object-contain"
                                                />
                                            )}
                                        </div>
                                        {/* Label */}
                                        <p className="mt-2 text-center text-white/50 text-[13px] font-medium tracking-wide group-hover:text-[#77CE90] transition-colors whitespace-nowrap">
                                            {tech.name}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
