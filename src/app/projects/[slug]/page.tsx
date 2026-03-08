import { notFound } from "next/navigation";

import { ContributorsGrid } from "@/components/contributors-grid";
import { SectionHeading } from "@/components/section-heading";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="section-block page-top">
      <div className="shell">
        <div className="detail-hero">
          <div className="detail-copy">
            <p className="section-eyebrow">Project archive</p>
            <h1>{project.title}</h1>
            <p className="detail-summary">{project.desc}</p>
            <div className="tag-row">
              {project.yearLabel ? <span>{project.yearLabel}</span> : null}
              {project.type.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="detail-cover">
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.title} />
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
                title="What the team built"
                description={project.desc}
              />
            </section>

            {project.gallery.length ? (
              <section className="detail-section">
                <div className="detail-section-head">
                  <p className="section-eyebrow">Gallery</p>
                  <h3>Interface snapshots</h3>
                </div>
                <div className="gallery-grid">
                  {project.gallery.map((image) => (
                    <div key={image} className="gallery-card">
                      <img src={image} alt={project.title} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <ContributorsGrid
              title="BE Mentors"
              group={project.contributorsResolved.beMentors}
            />
            <ContributorsGrid
              title="TE Mentors"
              group={project.contributorsResolved.teMentors}
            />
            <ContributorsGrid
              title="SE Mentees"
              group={project.contributorsResolved.seMentees}
            />
          </div>

          <aside className="detail-sidebar">
            {project.stack.length ? (
              <section className="sidebar-card">
                <p className="card-meta">Tech stack</p>
                <div className="tag-row">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
            ) : null}

            {project.links?.length ? (
              <section className="sidebar-card">
                <p className="card-meta">Related links</p>
                <div className="link-list">
                  {project.links.map((link) => (
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
