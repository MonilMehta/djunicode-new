import { notFound } from "next/navigation";

import { ContributorsGrid } from "@/components/contributors-grid";
import { SectionHeading } from "@/components/section-heading";
import { getEventBySlug, getEventSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <section className="section-block page-top">
      <div className="shell">
        <div className="detail-hero">
          <div className="detail-copy">
            <p className="section-eyebrow">Event archive</p>
            <h1>{event.title}</h1>
            <p className="detail-summary">{event.description}</p>
            <div className="tag-row">
              <span>{event.yearLabel}</span>
            </div>
          </div>
          <div className="detail-cover">
            {event.gallery[0] ? (
              <img src={event.gallery[0]} alt={event.title} />
            ) : (
              <div className="image-fallback" />
            )}
          </div>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <section className="detail-section">
              <SectionHeading
                eyebrow="Overview"
                title="What happened"
                description={event.description}
              />
            </section>

            {event.gallery.length ? (
              <section className="detail-section">
                <div className="detail-section-head">
                  <p className="section-eyebrow">Gallery</p>
                  <h3>Event visuals</h3>
                </div>
                <div className="gallery-grid">
                  {event.gallery.map((image) => (
                    <div key={image} className="gallery-card">
                      <img src={image} alt={event.title} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <ContributorsGrid
              title="Guests"
              group={event.contributorsResolved.guests}
            />
            <ContributorsGrid
              title="TE Mentors"
              group={event.contributorsResolved.teMentors}
            />
            <ContributorsGrid
              title="SE Mentees"
              group={event.contributorsResolved.seMentees}
            />
          </div>

          <aside className="detail-sidebar">
            {event.links?.length ? (
              <section className="sidebar-card">
                <p className="card-meta">Related links</p>
                <div className="link-list">
                  {event.links.map((link) => (
                    <a key={link} href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
