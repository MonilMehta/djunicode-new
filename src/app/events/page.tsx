import { getAllEvents } from "@/lib/content";
import { EventsMasonry } from "@/components/events/events-masonry";

export const metadata = {
  title: "Events Ecosystem",
};

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <main className="bg-[#050505] min-h-screen font-sans">
      {/* ── Page Header Matching Home Aesthetics ───────────────────────────── */}
      <section className="relative w-full px-6 md:px-12 pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-20 relative">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#77CE90] shadow-[0_0_8px_rgba(119,206,144,0.6)] animate-pulse" />
              <span className="text-[#77CE90] font-mono text-xs md:text-sm tracking-widest uppercase font-semibold">
                Community & Gatherings
              </span>
            </div>

            <h1
              className="text-white"
              style={{
                fontFamily: "'Satoshi','Inter',sans-serif",
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              unicode <br /> events
            </h1>
          </div>

          <p
            className="text-white/50 max-w-sm text-base md:text-lg leading-relaxed md:pb-4"
            style={{ fontFamily: "'Satoshi','Inter',sans-serif" }}
          >
            A curated archive of hackathons, workshops, sessions, and the moments that bring our community together.
          </p>
        </div>
      </section>

      {/* ── Masonry Grid Timeline ──────────────────────────────────────────── */}
      <EventsMasonry events={events} />

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#77CE90]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-[#77CE90]/[0.02] rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
