'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";
import { useGlimm } from "glimm/next";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isLight, toggleTheme } = useTheme();
    const { sweep } = useGlimm();

    // Track scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Prevent body scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Dynamic IST Clock
    const [time, setTime] = useState<Date | null>(null);
    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const dateStr = time ? new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(time).replace(/-/g, '.') : "----.--.--";

    const timeStr = time ? new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(time) : "--:--:--";

    return (
        <>
            {/* Main Navbar */}
            <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference px-6 py-4 flex items-center justify-between pointer-events-none">
                {/* Left side: Brand Logo */}
                <div className={`flex items-center gap-4 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <Link href="/" className="flex items-center">
                        <img src="/images/unicode-logo.svg" alt="DJ Unicode" className="h-14 w-auto mix-blend-difference" />
                    </Link>
                </div>

                {/* Middle: Navigation Links (Absolutely centered) */}
                <nav className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-[#9e9e9e] text-[11px] font-semibold tracking-widest pointer-events-auto mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled ? '-translate-y-[250%] opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <Link href="/" className="hover:text-white transition-colors pb-1 border-b border-[#9e9e9e]">HOME</Link>
                    <Link href="/about" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">ABOUT</Link>
                    <Link href="/members" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">MEMBERS</Link>
                    <Link href="/projects" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">PROJECTS</Link>
                    <Link href="/blog" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">BLOG</Link>
                </nav>

                {/* Right: Meta Info & Menu Button */}
                <div className="flex items-center gap-6 pointer-events-auto mix-blend-difference">
                    <div className={`hidden lg:flex flex-col items-end text-[10px] text-[#9e9e9e] leading-tight text-right tracking-wider transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <div className="flex gap-3 justify-end w-full">
                            <span>Based in</span>
                            <span className="w-[58px] inline-block tabular-nums">{dateStr}</span>
                        </div>
                        <div className="flex gap-3 justify-end w-full">
                            <span>Mumbai / India</span>
                            <span className="w-[58px] inline-block tabular-nums">{timeStr}</span>
                        </div>
                        <div className="flex gap-3 justify-end w-full">
                            <span>— IST</span>
                            <span className="w-[58px] inline-block tabular-nums">GMT+5:30</span>
                        </div>
                    </div>

                    {/* Theme toggle */}
                    <button
                        onClick={() => {
                            sweep(() => {
                                toggleTheme();
                            });
                        }}
                        aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                        title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${isLight ? 'bg-[#e5e0d4] hover:bg-[#d5cfc0] text-[#172033]' : 'bg-[#5c5c5c] hover:bg-[#7a7a7a] text-white'}`}
                        style={{ fontSize: '1.1rem', lineHeight: 1 }}
                    >
                        {isLight ? (
                            /* Moon icon — switch to dark */
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            /* Sun icon — switch to light */
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`h-10 rounded-full px-5 text-[11px] font-bold tracking-widest transition-colors flex items-center justify-center ${isLight ? 'bg-[#e5e0d4] text-[#172033] hover:bg-[#d5cfc0]' : 'bg-[#5c5c5c] text-white hover:bg-[#7a7a7a]'}`}
                    >
                        MENU
                    </button>
                </div>
            </header>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isLight ? 'bg-[#F4EFE3] text-[#172033]' : 'bg-[#050505] text-[#e0e0e0]'} ${isMenuOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {/* Menu header with CLOSE button */}
                <div className="px-6 py-4 flex justify-end items-center h-[88px]">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className={`rounded-full px-5 py-2.5 text-[11px] font-bold tracking-widest transition-colors leading-none ${isLight ? 'bg-[#172033] text-white hover:bg-[#47506a]' : 'bg-white text-black hover:bg-[#e0e0e0]'}`}
                    >
                        CLOSE
                    </button>
                </div>

                {/* Menu Body */}
                <div className="flex-1 px-8 md:px-16 flex flex-col justify-between relative pb-10 font-['Satoshi','Inter',sans-serif]">
                    {/* The Menu links */}
                    <div className="flex flex-col gap-2 text-[2.5rem] md:text-[4rem] font-medium tracking-tight mt-0">
                        <Link href="/" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">HOME</span>
                        </Link>
                        <Link href="/about" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">ABOUT</span>
                        </Link>
                        <Link href="/projects" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">PROJECTS</span>
                        </Link>
                        <Link href="/members" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">MEMBERS</span>
                        </Link>
                        <Link href="/blog" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">BLOG</span>
                        </Link>
                        <Link href="/contact" className={`group relative flex items-center w-max ${isLight ? 'text-[#172033]' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                            <span className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${isLight ? 'bg-[#172033]' : 'bg-white'}`} />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">CONTACT</span>
                        </Link>
                    </div>

                    {/* Optional Image Placeholder like in Beatfic */}
                    <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-64 h-80 bg-white shadow-xl rounded-lg overflow-hidden items-center justify-center pointer-events-none">
                        {/* Empty until you want an image here */}
                    </div>

                    {/* Footer Info */}
                    <div className={`flex justify-between items-end text-[11px] font-normal leading-[1.6] tracking-wide mt-8 border-t pt-6 ${isLight ? 'border-[#172033]/10' : 'border-white/10'}`}>
                        <div className="flex flex-col gap-6">
                            <div className={isLight ? 'text-[#172033]' : 'text-[#e0e0e0]'}>
                                <p className="font-semibold">© DJ Unicode</p>
                                <p className={isLight ? 'text-[#47506a]' : 'text-[#9e9e9e]'}>Based in</p>
                                <p className={isLight ? 'text-[#47506a]' : 'text-[#9e9e9e]'}>Mumbai / India</p>
                            </div>
                            <div className={isLight ? 'text-[#172033]' : 'text-[#e0e0e0]'}>
                                <p className={isLight ? 'text-[#47506a]' : 'text-[#9e9e9e]'}>Say Hello</p>
                                <p className="font-semibold">contact@djunicode.in</p>
                            </div>
                        </div>

                        <div className="flex flex-col text-left">
                            <p className={`mb-2 font-semibold ${isLight ? 'text-[#47506a]' : 'text-[#9e9e9e]'}`}>Social Media</p>
                            <a href="#" className={`font-semibold transition-colors ${isLight ? 'text-[#172033] hover:text-[#098d9c]' : 'text-white hover:text-[#77CE90]'}`}>Instagram</a>
                            <a href="#" className={`font-semibold transition-colors ${isLight ? 'text-[#172033] hover:text-[#098d9c]' : 'text-white hover:text-[#77CE90]'}`}>LinkedIn</a>
                            <a href="#" className={`font-semibold transition-colors ${isLight ? 'text-[#172033] hover:text-[#098d9c]' : 'text-white hover:text-[#77CE90]'}`}>GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
