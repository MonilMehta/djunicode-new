'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <>
            {/* Main Navbar */}
            <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference px-6 py-4 flex items-center justify-between pointer-events-none">
                {/* Left side: Brand Logo */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <Link href="/" className="flex items-center">
                        <img src="/images/unicode-logo.svg" alt="DJ Unicode" className="h-14 w-auto mix-blend-difference" />
                    </Link>
                </div>

                {/* Middle: Navigation Links (Absolutely centered) */}
                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-[#9e9e9e] text-[11px] font-semibold tracking-widest pointer-events-auto mix-blend-difference">
                    <Link href="/" className="hover:text-white transition-colors pb-1 border-b border-[#9e9e9e]">HOME</Link>
                    <Link href="/about" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">ABOUT</Link>
                    <Link href="/members" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">MEMBERS</Link>
                    <Link href="/projects" className="hover:text-white transition-colors pb-1 border-b border-transparent hover:border-[#9e9e9e]">PROJECTS</Link>
                </nav>

                {/* Right: Meta Info & Menu Button */}
                <div className="flex items-center gap-6 pointer-events-auto mix-blend-difference">
                    <div className="hidden lg:flex flex-col items-end text-[10px] text-[#9e9e9e] leading-tight text-right tracking-wider">
                        <div className="flex gap-3 justify-end w-full">
                            <span>Based in</span>
                            <span>2026.03.08</span>
                        </div>
                        <div className="flex gap-3 justify-end w-full">
                            <span>Mumbai / India</span>
                            <span>14:02:24</span>
                        </div>
                        <div className="flex gap-3 justify-end w-full">
                            <span>— IST</span>
                            <span>GMT+5:30</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="bg-[#5c5c5c] text-white rounded-full px-5 py-2.5 text-[11px] font-bold tracking-widest hover:bg-[#7a7a7a] transition-colors leading-none"
                    >
                        MENU
                    </button>
                </div>
            </header>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-[#F4EFE3] text-[#172033] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {/* Menu header with CLOSE button */}
                <div className="px-6 py-4 flex justify-end items-center h-[88px]">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-[#172033] text-white rounded-full px-5 py-2.5 text-[11px] font-bold tracking-widest hover:bg-[#47506a] transition-colors leading-none"
                    >
                        CLOSE
                    </button>
                </div>

                {/* Menu Body */}
                <div className="flex-1 px-8 md:px-16 flex flex-col justify-between relative pb-10 font-['Satoshi','Inter',sans-serif]">
                    {/* The Menu links */}
                    <div className="flex flex-col gap-2 text-[2.5rem] md:text-[4rem] font-medium tracking-tight mt-0">
                        <Link href="/" className="group relative flex items-center text-[#172033] w-max" onClick={() => setIsMenuOpen(false)}>
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#172033] opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">HOME</span>
                        </Link>
                        <Link href="/about" className="group relative flex items-center text-[#172033] w-max" onClick={() => setIsMenuOpen(false)}>
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#172033] opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">ABOUT</span>
                        </Link>
                        <Link href="/projects" className="group relative flex items-center text-[#172033] w-max" onClick={() => setIsMenuOpen(false)}>
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#172033] opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">PROJECTS</span>
                        </Link>
                        <Link href="/members" className="group relative flex items-center text-[#172033] w-max" onClick={() => setIsMenuOpen(false)}>
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#172033] opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">MEMBERS</span>
                        </Link>
                        <Link href="/contact" className="group relative flex items-center text-[#172033] w-max" onClick={() => setIsMenuOpen(false)}>
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#172033] opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-4">CONTACT</span>
                        </Link>
                    </div>

                    {/* Optional Image Placeholder like in Beatfic */}
                    <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-64 h-80 bg-white shadow-xl rounded-lg overflow-hidden items-center justify-center pointer-events-none">
                        {/* Empty until you want an image here */}
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-end text-[11px] font-normal leading-[1.6] tracking-wide mt-8 border-t border-[#172033]/10 pt-6">
                        <div className="flex flex-col gap-6">
                            <div className="text-[#172033]">
                                <p className="font-semibold">© DJ Unicode</p>
                                <p className="text-[#47506a]">Based in</p>
                                <p className="text-[#47506a]">Mumbai / India</p>
                            </div>
                            <div className="text-[#172033]">
                                <p className="text-[#47506a]">Say Hello</p>
                                <p className="font-semibold">contact@djunicode.in</p>
                            </div>
                        </div>

                        <div className="flex flex-col text-left">
                            <p className="text-[#47506a] mb-2 font-semibold">Social Media</p>
                            <a href="#" className="font-semibold text-[#172033] hover:text-[#098d9c] transition-colors">Instagram</a>
                            <a href="#" className="font-semibold text-[#172033] hover:text-[#098d9c] transition-colors">LinkedIn</a>
                            <a href="#" className="font-semibold text-[#172033] hover:text-[#098d9c] transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
