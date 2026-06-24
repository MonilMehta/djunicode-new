"use client";

import { useEffect, useRef } from "react";
import { Space_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { GitlogSection } from "./components/gitlog-section";
import { AlumniMapSection } from "./components/alumni-map-section";
import { DirectoryCtaSection } from "./components/directory-cta-section";
import { useTheme } from "@/lib/theme-context";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ABOUT_STATS = [
  { value: "2017", label: "Founded", note: "where this started" },
  { value: "7+", label: "Batches", note: "consistent yearly momentum" },
  { value: "50+", label: "Projects shipped", note: "real builds, not toy demos" },
  { value: "∞", label: "Commits reviewed", note: "feedback loop never ends" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerCards = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function AboutClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLight } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, dpr: number;
    let dots: number[] | null = null;
    let dotI: number[] = [];
    const mouse = { x: -9999, y: -9999 };

    const STEP = 5; // smaller = more dots
    const DR = 1.5; // dot radius CSS px
    const HR = 140; // hover radius CSS px
    const BRIGHT_THRESH = 55; // lower = pick up more dots from image
    const LERP_S = 0.08;

    const BASE = [42, 42, 42];
    const RAMP = [
      [210, 72, 42],
      [240, 145, 65],
      [245, 208, 90],
    ];

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function getColor(i: number) {
      if (i <= 0) return BASE;
      if (i < 0.33) {
        const t = i / 0.33;
        return BASE.map((v, j) => lerp(v, RAMP[0][j], t) | 0);
      }
      if (i < 0.67) {
        const t = (i - 0.33) / 0.34;
        return RAMP[0].map((v, j) => lerp(v, RAMP[1][j], t) | 0);
      }
      const t = (i - 0.67) / 0.33;
      return RAMP[1].map((v, j) => lerp(v, RAMP[2][j], t) | 0);
    }

    let animationFrameId: number;

    function init() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      W = canvas.width = rect.width * dpr;
      H = canvas.height = rect.height * dpr;

      const img = new Image();
      img.onload = () => {
        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const oc = off.getContext("2d");
        if (!oc) return;

        let scale = Math.max(W / img.width, H / img.height);
        
        if (W < H) {
          scale = W / img.width;
        }
        
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;
        
        oc.drawImage(img, dx, dy, dw, dh);

        const pxData = oc.getImageData(0, 0, W, H).data;
        const step = STEP * dpr;
        const rawD: number[] = [];
        const rawI: number[] = [];

        for (let y = step / 2; y < H; y += step) {
          for (let x = step / 2; x < W; x += step) {
            const p = (Math.floor(y) * W + Math.floor(x)) * 4;
            const brightness = (pxData[p] + pxData[p + 1] + pxData[p + 2]) / 3;
            if (pxData[p + 3] > 50 && brightness > BRIGHT_THRESH) {
              rawD.push(x, y);
              rawI.push(0);
            }
          }
        }

        dots = rawD;
        dotI = rawI;
      };
      
      img.src = "/about-hero.jpg";
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);
      
      if (!dots) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const mx = mouse.x * dpr;
      const my = mouse.y * dpr;
      const hr = HR * dpr;
      const dr = DR * dpr;
      const n = dotI.length;

      for (let i = 0; i < n; i++) {
        const x = dots[i * 2];
        const y = dots[i * 2 + 1];
        const dist = Math.hypot(x - mx, y - my);
        const target = dist < hr ? Math.pow(1 - dist / hr, 1.6) : 0;
        dotI[i] += (target - dotI[i]) * LERP_S;
        
        const col = getColor(dotI[i]);
        ctx.beginPath();
        ctx.arc(x, y, dr, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = t.clientX - r.left;
      mouse.y = t.clientY - r.top;
    };

    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onResize = () => {
      init();
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`w-full min-h-screen ${spaceMono.className}`} style={{ backgroundColor: isLight ? "var(--bg)" : "#080808", color: isLight ? "var(--ink)" : "#e0e0e0" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease both;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className={`relative w-full h-[100svh] min-h-[600px] overflow-hidden border-b flex flex-col ${isLight ? 'border-black/10' : 'border-[#161616]'}`}>
        <canvas
          ref={canvasRef}
          id="c"
          className="absolute inset-0 w-full h-full block cursor-crosshair"
        />

        <div className="relative z-10 pt-[100px] md:pt-[52px] px-6 md:px-[52px] pointer-events-none animate-fadeUp">
          <h1 className={`text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] ${isLight ? 'text-[rgba(23,32,51,0.92)]' : 'text-[rgba(255,255,255,0.82)]'}`}>
            about us
          </h1>
        </div>

        <div 
          className="relative z-10 mt-auto px-6 md:px-[52px] pb-[40px] md:pb-[64px] pointer-events-none animate-fadeUp max-w-[800px]" 
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className={`text-[clamp(20px,3vw,36px)] font-medium leading-[1.15] tracking-[-0.02em] ${isLight ? 'text-[rgba(23,32,51,0.5)]' : 'text-white/40'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
              The best way to learn to code is to <span className={isLight ? 'text-black/90' : 'text-white/90'}>ship something real.</span>
            </h3>
            <h3 className={`text-[clamp(20px,3vw,36px)] font-medium leading-[1.15] tracking-[-0.02em] ${isLight ? 'text-[rgba(23,32,51,0.5)]' : 'text-white/40'}`} style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}>
              The best way to master it is to <span className={isLight ? 'text-black/90' : 'text-white/90'}>explain it to someone else.</span>
            </h3>
            <p className={`text-[12px] md:text-[14px] uppercase tracking-[0.2em] mt-4 md:mt-6 ${isLight ? 'text-[#098d9c]' : 'text-[#77CE90]'} ${spaceMono.className}`}>
              That&apos;s the whole thing, really.
            </p>
          </div>
        </div>

        <p 
          className={`absolute bottom-[28px] right-[52px] text-[8px] tracking-[0.35em] uppercase pointer-events-none z-10 animate-fadeUp ${isLight ? 'text-black/20' : 'text-[#1a1a1a]'}`} 
          style={{ animationDelay: "0.8s" }}
        >
          move your cursor
        </p>
      </section>

      <div className="">
        <GitlogSection />
      </div>
      <AlumniMapSection />
      <DirectoryCtaSection />
    </div>
  );
}