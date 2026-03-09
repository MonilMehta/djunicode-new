"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Faculty {
    name: string;
    pic: string;
    text: string;
}

export function FacultySection({ faculty }: { faculty: Faculty[] }) {
    if (!faculty || faculty.length === 0) return null;

    // Since it's a single image of our teacher, we just grab the first item
    const teacher = faculty[0];

    return (
        <section className="bg-[#050505] relative pt-12 pb-32">
            <div className="w-full px-10 mb-6 text-left">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                    faculty advisor
                </motion.h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full bg-[#0A0A0A] border border-[#222] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative"
                >
                    {/* Left: Text & Quote */}
                    <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-br from-[#111] to-[#050505] border-b md:border-b-0 md:border-r border-[#222]">
                        <span className="text-[#77CE90] font-mono text-sm tracking-widest uppercase mb-6 block">
                            faculty advisor
                        </span>
                        <h3
                            className="mb-8 md:mb-10 text-white"
                            style={{
                                fontFamily: "'Satoshi','Inter',sans-serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                lineHeight: 1.05,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            {teacher.name}
                        </h3>

                        <p
                            className="text-lg md:text-xl md:leading-[1.7] text-white/70 font-light max-w-2xl"
                            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
                        >
                            "{teacher.text}"
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-[45%] h-[50vh] md:h-auto min-h-[500px] relative shrink-0 bg-[#111]">
                        {teacher.pic ? (
                            <Image
                                src={teacher.pic}
                                alt={teacher.name}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 45vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
                        )}
                        {/* Subtle vignette over the image bottom to blend it in */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none hidden md:block" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
