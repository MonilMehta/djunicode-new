"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/lib/theme-context";

// ─── Data ────────────────────────────────────────────────────────────────────
const TECH_STACKS = [
    { name: "React", desc: "UI Library", logo: "/images/techStacks/react.svg", placeholder: false },
    { name: "Node.js", desc: "Runtime", logo: "/images/techStacks/nodejs.svg", placeholder: false },
    { name: "Figma", desc: "Interface Design", logo: "/images/techStacks/Figma.svg", placeholder: false },
    { name: "Git", desc: "Version Control", logo: "/images/techStacks/git.svg", placeholder: false },
    { name: "Django", desc: "Backend Framework", logo: "/images/techStacks/django.svg", placeholder: false },
    { name: "Python", desc: "General Purpose", logo: "/images/techStacks/python.svg", placeholder: false },
    { name: "JavaScript", desc: "Web Language", logo: "/images/techStacks/javascript.svg", placeholder: false },
    { name: "Flutter", desc: "Mobile Framework", logo: "/images/techStacks/Flutter.svg", placeholder: false },
    { name: "React Native", desc: "Mobile Framework", logo: "/images/techStacks/react.svg", placeholder: false },
    { name: "Expo", desc: "React Native Tool", logo: "/images/techStacks/expo.svg", placeholder: false },
    { name: "Next.js", desc: "React Framework", logo: "/images/techStacks/nextjs.svg", placeholder: false },
];

// ─── Wheel geometry ───────────────────────────────────────────────────────────
const ICON_COUNT = TECH_STACKS.length;

// Desktop Geometry
const R_DESKTOP = 1000;
const START_DEG_DESKTOP = -40;
const END_DEG_DESKTOP = 40;
const ICON_POSITIONS_DESKTOP = Array.from({ length: ICON_COUNT }, (_, i) => {
    const t = ICON_COUNT === 1 ? 0 : i / (ICON_COUNT - 1);
    const deg = START_DEG_DESKTOP + t * (END_DEG_DESKTOP - START_DEG_DESKTOP);
    const rad = (deg * Math.PI) / 180;
    return {
        x: R_DESKTOP * Math.sin(rad),
        y: -R_DESKTOP * Math.cos(rad),
    };
});

// Mobile Geometry (Full Circle)
const R_MOBILE = 160;
const START_DEG_MOBILE = 0;
// We want an even spread across 360 degrees. 
// If there are 11 icons, the step is 360 / 11. 
// The last icon should be at 360 - step, which is 360 * (10 / 11).
const END_DEG_MOBILE = 360 * ((ICON_COUNT - 1) / ICON_COUNT);
const ICON_POSITIONS_MOBILE = Array.from({ length: ICON_COUNT }, (_, i) => {
    const t = ICON_COUNT === 1 ? 0 : i / (ICON_COUNT - 1);
    const deg = START_DEG_MOBILE + t * (END_DEG_MOBILE - START_DEG_MOBILE);
    const rad = (deg * Math.PI) / 180;
    return {
        x: R_MOBILE * Math.sin(rad),
        y: -R_MOBILE * Math.cos(rad),
    };
});

// ─── Vignette shared style ───────────────────────────────────────────────────
const vignette = {
    background: "linear-gradient(to bottom, #050505 0%, transparent 18%, transparent 82%, #050505 100%)",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function HorizontalNarrativeScroll() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isLight } = useTheme();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const baseColor = isLight ? "rgba(15,24,36,0.35)" : "rgba(255,255,255,0.35)";

    // ── Phase 1 (0 → 0.40): readme.md colour highlights ──────────────────────
    const c1 = useTransform(scrollYProgress, [0.05, 0.18], [baseColor, "#FF6B6B"]);
    const c2 = useTransform(scrollYProgress, [0.18, 0.28], [baseColor, "#38BDF8"]);
    const c3 = useTransform(scrollYProgress, [0.28, 0.36], [baseColor, "#34D399"]);
    const c4 = useTransform(scrollYProgress, [0.36, 0.44], [baseColor, "#F59E0B"]);

    // ── Phase 1.5: Image stacked animations ──────────────────────
    const img1Y = useTransform(scrollYProgress, [0.05, 0.15], [300, 0]);
    const img1Op = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

    const img2Y = useTransform(scrollYProgress, [0.15, 0.25], [300, 0]);
    const img2Op = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

    const img3Y = useTransform(scrollYProgress, [0.25, 0.35], [300, 0]);
    const img3Op = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

    const img4Y = useTransform(scrollYProgress, [0.35, 0.45], [300, 0]);
    const img4Op = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

    // To prevent z-index issues and physical overlap occlusion:
    // we use a slight scale offset so that smaller cards stack up
    const img1Scale = useTransform(scrollYProgress, [0.05, 0.15], [1, 1]);
    const img2Scale = useTransform(scrollYProgress, [0.15, 0.25], [1.2, 1]);
    const img3Scale = useTransform(scrollYProgress, [0.25, 0.35], [1.2, 1]);
    const img4Scale = useTransform(scrollYProgress, [0.35, 0.45], [1.2, 1]);

    // Mobile specific animation: both come together and scale up simultaneously
    const mobY = useTransform(scrollYProgress, [0.05, 0.25], [150, 0]);
    const mobOp = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
    const mobScale = useTransform(scrollYProgress, [0.05, 0.25], [0.5, 1]);

    const imagesTransforms = [
        { y: img1Y, opacity: img1Op, scale: img1Scale, rotate: -6, left: "0%", top: "0%", zIndex: 1, src: "/images/groupPhotos/celestia2025.png" },
        { y: img2Y, opacity: img2Op, scale: img2Scale, rotate: 4, left: "-5%", top: "-5%", zIndex: 2, src: "/images/groupPhotos/futureplan2025.png" },
        { y: img3Y, opacity: img3Op, scale: img3Scale, rotate: -3, left: "5%", top: "2%", zIndex: 3, src: "/images/groupPhotos/unihacks2026.png" },
        { y: img4Y, opacity: img4Op, scale: img4Scale, rotate: 5, left: "-2%", top: "-10%", zIndex: 4, src: "/images/groupPhotos/hackprep2025.png" },
    ];

    // ── Phase 2 (0.40 → 0.56): horizontal pan ─────────────────────────────
    // Strip shifts left by 1 screen width
    const stripX = useTransform(scrollYProgress, [0.40, 0.56], ["0vw", "-100vw"]);

    // ── Phase 3 (0.56 → 0.96): wheel rotates ─────────────────
    // Desktop: arc rolls in from right (120 -> 0)
    const wheelRotateDesktop = useTransform(scrollYProgress, [0.56, 0.96], [120, 0]);
    
    // Mobile: Full circle spins (360 degrees spin while scrolling)
    const wheelRotateMobile = useTransform(scrollYProgress, [0.56, 0.96], [360, 0]);

    // Each icon counter-rotates to stay upright
    const iconRotateDesktop = useTransform(wheelRotateDesktop, (v) => -v);
    const iconRotateMobile = useTransform(wheelRotateMobile, (v) => -v);

    return (
        <section
            ref={sectionRef}
            className="relative h-[400vh] md:h-[1000vh] bg-[#050505]"
            id="narrative-section"
        >
            <div className="sticky top-0 h-[100dvh] overflow-hidden">
                {/* vignette */}
                <div className="absolute inset-0 z-20 pointer-events-none narrative-vignette" style={vignette} />

                {/* ── Horizontal strip ─────────────────────────────────────────── */}
                <motion.div
                    style={{ x: stripX }}
                    className="flex flex-row h-full w-max relative z-10"
                >

                    {/* ── Panel 1: README ─────────────────────────────────────── */}
                    <div className="w-screen h-full shrink-0 flex flex-col justify-start pt-[12vh] pl-6 md:pl-10 relative">
                        <div className="max-w-4xl z-10 pr-6">
                            <h2
                                className="text-white"
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontSize: "clamp(3rem, 8vw, 6.5rem)",
                                    fontWeight: 700,
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                readme.md
                            </h2>

                            <div
                                className="text-[1.1rem] md:text-2xl font-medium leading-relaxed md:leading-[1.7] mt-6 md:mt-10 space-y-6 md:space-y-8 text-white"
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

                        {/* ── Stacked Photos (Desktop) ──────────────────────────────── */}
                        <div className="hidden md:block absolute right-[20%] bottom-[15vh] w-[450px] h-[320px] z-0 pointer-events-none">
                            {imagesTransforms.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    style={{
                                        y: img.y,
                                        opacity: img.opacity,
                                        rotate: img.rotate,
                                        scale: img.scale,
                                        left: img.left,
                                        top: img.top,
                                        zIndex: img.zIndex,
                                        WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
                                        maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
                                    }}
                                    className="absolute w-full h-full overflow-hidden bg-black/50"
                                >
                                    <Image
                                        src={img.src}
                                        alt={`Group photo ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* ── Side-by-Side Photos (Mobile) ───────────────────────────── */}
                        <motion.div 
                            className="flex md:hidden absolute right-[5%] bottom-[12vh] gap-3 sm:gap-4 z-0 pointer-events-none origin-bottom-right"
                            style={{
                                y: mobY,
                                opacity: mobOp,
                                scale: mobScale
                            }}
                        >
                            {imagesTransforms.slice(0, 2).map((img, idx) => (
                                <div
                                    key={`mob-side-${idx}`}
                                    style={{
                                        transform: `rotate(${idx === 0 ? -4 : 4}deg)`,
                                        borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
                                    }}
                                    className="relative w-[140px] h-[100px] sm:w-[180px] sm:h-[130px] rounded-[16px] overflow-hidden border shadow-xl bg-black/50"
                                >
                                    <Image
                                        src={img.src}
                                        alt={`Group photo ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Panel 2: OUR STACK ──────────────────────────────────── */}
                    <div className="w-screen h-full shrink-0 relative overflow-visible">

                        {/* Title — top-left, never moves */}
                        <div className="absolute top-[10vh] left-6 md:left-10 z-30 pr-6">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className="text-white"
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontSize: "clamp(3rem, 8vw, 6.5rem)",
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
                                className="mt-3 text-white/50 text-base md:text-2xl font-light"
                                style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                            >
                                Technologies we explore and build with.
                            </motion.p>
                        </div>

                        {/* ── DESKTOP WHEEL ──────────────────────────────────────────────── */}
                        <motion.div
                            className="hidden md:block absolute"
                            style={{
                                left: "50%",
                                bottom: "-550px",
                                x: "-50%",
                                rotate: wheelRotateDesktop,
                                transformOrigin: "0px 0px",
                            }}
                        >
                            {ICON_POSITIONS_DESKTOP.map((pos, i) => {
                                const tech = TECH_STACKS[i];
                                return (
                                    <motion.div
                                        key={`desktop-${tech.name}`}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            x: pos.x,
                                            y: pos.y,
                                            rotate: iconRotateDesktop,
                                            translateX: "-50%",
                                            translateY: "-50%",
                                        }}
                                    >
                                        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(119,206,144,0.4)] transition-all duration-300">
                                            {tech.placeholder ? (
                                                <span className="text-white/80 font-mono font-bold text-3xl select-none">
                                                    {tech.name === "Next.js" ? "▲" : "~"}
                                                </span>
                                            ) : (
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={70}
                                                    height={70}
                                                    className="w-[70%] h-[70%] object-contain"
                                                />
                                            )}
                                        </div>
                                        <p className="mt-2 text-center text-white/70 text-[14px] font-medium tracking-wide group-hover:text-[#77CE90] transition-colors whitespace-nowrap drop-shadow-md">
                                            {tech.name}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* ── MOBILE WHEEL ──────────────────────────────────────────────── */}
                        <motion.div
                            className="block md:hidden absolute"
                            style={{
                                left: "50%",
                                top: "50%",
                                x: "-50%",
                                y: "-50%",
                                rotate: wheelRotateMobile,
                                transformOrigin: "0px 0px",
                            }}
                        >
                            {ICON_POSITIONS_MOBILE.map((pos, i) => {
                                const tech = TECH_STACKS[i];
                                return (
                                    <motion.div
                                        key={`mobile-${tech.name}`}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            x: pos.x,
                                            y: pos.y,
                                            rotate: iconRotateMobile,
                                            translateX: "-50%",
                                            translateY: "-50%",
                                        }}
                                    >
                                        <div className="w-[60px] h-[60px] flex items-center justify-center overflow-hidden drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(119,206,144,0.4)] transition-all duration-300">
                                            {tech.placeholder ? (
                                                <span className="text-white/80 font-mono font-bold text-xl select-none">
                                                    {tech.name === "Next.js" ? "▲" : "~"}
                                                </span>
                                            ) : (
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-[70%] h-[70%] object-contain"
                                                />
                                            )}
                                        </div>
                                        <p className="mt-2 text-center text-white/70 text-[12px] font-medium tracking-wide group-hover:text-[#77CE90] transition-colors whitespace-nowrap drop-shadow-md">
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
