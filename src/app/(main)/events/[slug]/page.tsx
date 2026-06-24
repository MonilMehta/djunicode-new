import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContributorsGrid } from "@/components/contributors-grid";
import { SectionHeading } from "@/components/section-heading";
import { getEventBySlug, getEventSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found | DJ Unicode",
    };
  }

  const defaultImage = event.gallery?.[0] || "/opengraph-image.png";

  return {
    title: `${event.title} | Events | DJ Unicode`,
    description: event.desc || event.description || `Read about the ${event.title} event hosted by DJ Unicode.`,
    openGraph: {
      title: `${event.title} | DJ Unicode Events`,
      description: event.desc || event.description || `Read about the ${event.title} event hosted by DJ Unicode.`,
      url: `https://www.djunicode.in/events/${slug}`,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.desc || event.description,
    "image": event.gallery?.[0] ? `https://www.djunicode.in${event.gallery[0]}` : "https://www.djunicode.in/opengraph-image.png",
    "startDate": event.year ? new Date(event.year).toISOString() : new Date().toISOString(),
    "location": {
      "@type": "Place",
      "name": "Dwarkadas J. Sanghvi College of Engineering",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vile Parle",
        "addressLocality": "Mumbai",
        "postalCode": "400056",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "DJ Unicode",
      "url": "https://www.djunicode.in"
    }
  };

  return (
    <section className="section-block page-top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
