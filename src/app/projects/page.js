import { ArchiveCard } from "@/components/archive-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="section-block page-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Project archive"
          title="Every shipped Unicode project in one place"
          description="This page replaces the old Gatsby grid with a cleaner archive while preserving every detail page slug."
        />
        <div className="archive-grid">
          {projects.map((project) => (
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
  );
}
