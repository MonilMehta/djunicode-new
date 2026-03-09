"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

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
// Icons spread across the top arc, -30° to +30° from 12-o'clock
const R = 1000;  // px
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

    // ── Phase 1.5: Image stacked animations ──────────────────────
    const img1Y = useTransform(scrollYProgress, [0.05, 0.15], [300, 0]);
    const img1Op = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

    const img2Y = useTransform(scrollYProgress, [0.15, 0.25], [300, 0]);
    const img2Op = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

    const img3Y = useTransform(scrollYProgress, [0.25, 0.35], [300, 0]);
    const img3Op = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

    const img4Y = useTransform(scrollYProgress, [0.35, 0.45], [300, 0]);
    const img4Op = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

    const imagesTransforms = [
        { y: img1Y, opacity: img1Op, rotate: -6, left: "0%", top: "0%", src: "/images/groupPhotos/celestia2025.png" },
        { y: img2Y, opacity: img2Op, rotate: 4, left: "-5%", top: "-5%", src: "/images/groupPhotos/futureplan2025.png" },
        { y: img3Y, opacity: img3Op, rotate: -3, left: "5%", top: "2%", src: "/images/groupPhotos/unihacks2026.png" },
        { y: img4Y, opacity: img4Op, rotate: 5, left: "-2%", top: "-10%", src: "/images/groupPhotos/hackprep2025.png" },
    ];

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
                    <div className="w-screen h-full shrink-0 flex flex-col justify-start pt-[12vh] pl-10 relative">
                        <div className="max-w-4xl z-10">
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

                        {/* ── Stacked Photos ────────────────────────────────────────── */}
                        <div className="absolute right-[20%] bottom-[10vh] md:right-[35%] md:bottom-[15vh] w-[280px] h-[200px] md:w-[450px] md:h-[320px] z-0 pointer-events-none">
                            {imagesTransforms.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    style={{
                                        y: img.y,
                                        opacity: img.opacity,
                                        rotate: img.rotate,
                                        left: img.left,
                                        top: img.top,
                                        WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                                        maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
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
              // The wheel's centre sits far below the panel bottom, horizontally centred.
              // At rotation +120°, every icon is off-screen to the right.
              // Scrolling rotates the wheel CCW to 0° — icons sweep in from the right
              // and settle into their final arc. The bottom value is tuned so the lowest
              // icons (at the arc edges) sit just above the screen bottom.
            */}
                        <motion.div
                            className="absolute"
                            style={{
                                left: "50%",
                                bottom: "-550px",
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
                                        {/* Pure Icon */}
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
                                        {/* Label */}
                                        <p className="mt-2 text-center text-white/70 text-[14px] font-medium tracking-wide group-hover:text-[#77CE90] transition-colors whitespace-nowrap drop-shadow-md">
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
