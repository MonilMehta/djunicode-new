import Link from "next/link";

import { ArchiveCard } from "@/components/archive-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllEvents,
  getAllProjects,
  getAlumniTestimonials,
  getFacultyTestimonials,
  getFeaturedProjects,
  getSiteStats,
  getTechStacks,
} from "@/lib/content";

function TestimonialCard({ item, role }) {
  return (
    <article className="testimonial-card">
      <img src={item.pic} alt={item.name} />
      <div>
        <p className="card-meta">{role}</p>
        <h3>{item.name}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  const stats = getSiteStats();
  const featuredProjects = getFeaturedProjects();
  const spotlightEvent = getAllEvents()[0];
  const recentProjects = getAllProjects().slice(0, 6);
  const alumni = getAlumniTestimonials();
  const faculty = getFacultyTestimonials();
  const stacks = getTechStacks();

  return (
    <>
      <section className="hero-block">
        <div className="shell hero-grid">
          <div>
            <p className="section-eyebrow">Student builders club</p>
            <h1>
              A sharper digital home for a club that teaches people to ship.
            </h1>
            <p className="hero-copy">
              DJ Unicode is where students build with mentors, learn by making,
              and leave behind a body of work that keeps compounding across batches.
            </p>
            <div className="hero-actions">
              <Link href="/projects" className="primary-button">
                Explore projects
              </Link>
              <Link href="/events" className="secondary-button">
                Browse events
              </Link>
            </div>
          </div>
          <div className="hero-panel">
            <p className="card-meta">What the archive already proves</p>
            <div className="stats-grid">
              {stats.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured work"
            title="The projects that should anchor the new visual language"
            description="These titles were already hand-picked on the Gatsby homepage, so they remain the strongest starting point for the redesigned showcase."
          />
          <div className="archive-grid archive-grid-featured">
            {featuredProjects.map((project) => (
              <ArchiveCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                title={project.title}
                description={project.desc}
                image={project.coverImage}
                meta={project.yearLabel}
                tags={project.stack}
              />
            ))}
          </div>
        </div>
      </section>

      {spotlightEvent ? (
        <section className="section-block section-accent">
          <div className="shell spotlight-grid">
            <div className="spotlight-copy">
              <SectionHeading
                eyebrow="Event spotlight"
                title={spotlightEvent.title}
                description={spotlightEvent.description}
              />
              <div className="tag-row">
                <span>{spotlightEvent.yearLabel}</span>
                <span>{spotlightEvent.gallery.length} gallery image(s)</span>
              </div>
              <Link href={`/events/${spotlightEvent.slug}`} className="primary-button">
                Open event archive
              </Link>
            </div>
            <div className="spotlight-media">
              {spotlightEvent.gallery[0] ? (
                <img src={spotlightEvent.gallery[0]} alt={spotlightEvent.title} />
              ) : (
                <div className="image-fallback" />
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Build lanes"
            title="The disciplines Unicode already teaches"
            description="These categories come directly from the existing site data and should remain visible in the new experience."
          />
          <div className="stack-grid">
            {stacks.map((stack) => (
              <article key={stack.title} className="stack-card">
                <img src={stack.image} alt={stack.title} />
                <h3>{stack.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Recent archive"
            title="A quick path into the project library"
            description="The full archive remains on the dedicated projects page, but the homepage needs an immediate sample of the work."
          />
          <div className="archive-grid">
            {recentProjects.map((project) => (
              <ArchiveCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                title={project.title}
                description={project.desc}
                image={project.coverImage}
                meta={project.yearLabel}
                tags={project.type}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Founding context"
            title="Why the club exists in the first place"
            description="These testimonials are part of the original home page and should continue to give the site institutional memory."
          />
          <div className="testimonial-grid">
            {alumni.map((item) => (
              <TestimonialCard key={item.name} item={item} role="Founder" />
            ))}
            {faculty.map((item) => (
              <TestimonialCard key={item.name} item={item} role="Faculty" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
