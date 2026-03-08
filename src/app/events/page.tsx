import { ArchiveCard } from "@/components/archive-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllEvents } from "@/lib/content";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <section className="section-block page-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Event archive"
          title="Workshops, sessions, and community events"
          description="The Gatsby site stored these as individual JSON entries; the new archive keeps the same structure and routes."
        />
        <div className="archive-grid">
          {events.map((event) => (
            <ArchiveCard
              key={event.slug}
              href={`/events/${event.slug}`}
              title={event.title}
              description={event.description}
              image={event.gallery[0]}
              meta={event.yearLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
