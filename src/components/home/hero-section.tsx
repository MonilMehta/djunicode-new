'use client';

import { useTheme } from '@/lib/theme-context';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const PrismClientWrapper = dynamic(() => import('@/components/prism/PrismClientWrapper'), { ssr: false });
const AuroraClientWrapper = dynamic(() => import('@/components/aurora/AuroraClientWrapper'), { ssr: false });

export function HeroSection() {
    const { isLight } = useTheme();

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#050505]">
            {/* Cross-fade between shaders */}
            <div
                className={isLight ? "pointer-events-none" : "max-md:pointer-events-none"}
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isLight ? 0 : 1,
                    transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                <PrismClientWrapper />
            </div>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isLight ? 1 : 0,
                    transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
                    pointerEvents: isLight ? 'auto' : 'none',
                }}
            >
                <AuroraClientWrapper />
            </div>

            {/* Headline Overlay with Preloader Animation */}
            <motion.div
                initial={{
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    scale: 0.5,
                }}
                animate={{
                    top: '88%',
                    left: '2.5rem',
                    x: '0%',
                    y: '-100%',
                    scale: 1,
                }}
                transition={{
                    duration: 0.8,
                    delay: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 10000,
                    color: isLight ? '#0f1824' : '#fff',
                    textShadow: isLight ? '0 0 40px rgba(247,241,230,0.98), 0 0 80px rgba(247,241,230,0.6)' : 'none',
                    mixBlendMode: isLight ? 'normal' : 'difference',
                }}
            >
                {['code create', 'collaborate'].map((word, i) => (
                    <motion.p
                        key={word}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2 + i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            display: 'block',
                            margin: 0,
                            lineHeight: 1.05,
                            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                            fontWeight: 700,
                            fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
                            letterSpacing: '-0.03em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {word}
                    </motion.p>
                ))}
            </motion.div>
        </section>
    );
}
