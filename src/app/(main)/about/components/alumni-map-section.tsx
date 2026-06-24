'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorldMap from '@/components/ui/world-map';
import { useTheme } from '@/lib/theme-context';

const ALUMNI = [
  // wave 1 - Core tech hubs & India
  [-122.42, 37.77, 'San Francisco', 1],
  [77.59, 12.97, 'Bangalore', 1],
  [73.86, 18.52, 'Pune', 1],
  [-0.12, 51.51, 'London', 1],
  [103.82, 1.35, 'Singapore', 1],

  // wave 2 - Expanding reach
  [-74.0, 40.71, 'New York', 2],
  [-122.33, 47.6, 'Seattle', 2],
  [78.49, 17.38, 'Hyderabad', 2],
  [55.27, 25.2, 'Dubai', 2],
  [13.4, 52.52, 'Berlin', 2],

  // wave 3 - Global coverage
  [-97.74, 30.27, 'Austin', 3],
  [-87.63, 41.88, 'Chicago', 3],
  [4.9, 52.37, 'Amsterdam', 3],
  [2.35, 48.86, 'Paris', 3],
  [139.69, 35.69, 'Tokyo', 3],
  [-46.63, -23.55, 'São Paulo', 3],
] as const;

const MUMBAI = [72.88, 19.08, 'Mumbai'];

export function AlumniMapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { isLight } = useTheme();

  const [waveIdx, setWaveIdx] = useState(0);

  // Handle scroll to update waveIdx
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      
      let newWave = 0;
      if (scrollProgress > 0.75) newWave = 3;
      else if (scrollProgress > 0.5) newWave = 2;
      else if (scrollProgress > 0.25) newWave = 1;

      // Make sure it doesn't trigger outside the section bounds
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        setWaveIdx(newWave);
      } else if (rect.top > 0) {
        setWaveIdx(0);
      } else if (rect.bottom < window.innerHeight) {
        setWaveIdx(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter alumni based on the current scroll wave
  const currentAlumni = ALUMNI.filter(a => a[3] <= waveIdx);
  
  // Create connections from Mumbai to all alumni locations
  const mapDots = currentAlumni.map(alumnus => ({
    start: { lat: MUMBAI[1] as number, lng: MUMBAI[0] as number, label: MUMBAI[2] as string },
    end: { lat: alumnus[1] as number, lng: alumnus[0] as number, label: alumnus[2] as string }
  }));

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-transparent"
      style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
    >
      <div
        ref={stickyRef}
        className={`sticky top-0 h-[100svh] min-h-[600px] overflow-hidden border-y`}
        style={{
          backgroundColor: isLight ? "var(--bg)" : "#080808",
          borderColor: isLight ? "rgba(0,0,0,0.08)" : "#111"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-16 md:mt-24" aria-hidden="true">
          <div className="w-full max-w-7xl mx-auto px-4 opacity-70">
            <WorldMap dots={mapDots} lineColor={isLight ? "#0f1824" : "#ffffff"} />
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-[52px] pt-8 md:pt-[48px] pointer-events-none">
          <h2 className={`text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] ${isLight ? 'text-[rgba(23,32,51,0.92)]' : 'text-[rgba(255,255,255,0.82)]'}`}>
            where are we
          </h2>
        </div>
      </div>
    </section>
  );
}
