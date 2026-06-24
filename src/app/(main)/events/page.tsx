import { Metadata } from "next";
import { getAllEvents } from "@/lib/content";
import { EventsMasonry } from "@/components/events/events-masonry";

export const metadata: Metadata = {
  title: "Events Ecosystem | DJ Unicode",
  description: "Browse the upcoming and past events hosted by DJ Unicode. Join our hackathons, technical workshops, and speaker sessions to learn and grow.",
  openGraph: {
    title: "Events Ecosystem | DJ Unicode",
    description: "Browse the upcoming and past events hosted by DJ Unicode. Join our hackathons, technical workshops, and speaker sessions.",
    url: "https://www.djunicode.in/events",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - Events Ecosystem",
      },
    ],
  },
};

export default function EventsPage() {
  const events = getAllEvents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DJ Unicode Events Ecosystem",
    "description": "Browse the upcoming and past events hosted by DJ Unicode.",
    "url": "https://www.djunicode.in/events",
    "about": {
      "@type": "Thing",
      "name": "Tech Hackathons and Workshops"
    }
  };

  return (
    <main className="bg-background min-h-screen font-sans transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Page Header Matching Home Aesthetics ───────────────────────────── */}
      <section className="relative w-full px-6 md:px-12 pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 z-20 relative">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(13,182,199,0.6)] animate-pulse" />
              <span className="text-accent font-mono text-xs md:text-sm tracking-widest uppercase font-semibold">
                Community & Gatherings
              </span>
            </div>

            <h1
              className="text-foreground"
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
            className="text-muted-foreground max-w-sm text-base md:text-lg leading-relaxed md:pb-4"
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
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-accent/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
