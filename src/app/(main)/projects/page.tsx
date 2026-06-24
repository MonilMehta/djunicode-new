import { Suspense } from "react";
import { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";

export const metadata: Metadata = {
  title: "Projects | DJ Unicode",
  description: "Explore the innovative projects shipped by DJ Unicode members. From full-stack applications to open-source tools, discover what our technical community has built.",
  openGraph: {
    title: "Projects Archive | DJ Unicode",
    description: "Explore the innovative projects shipped by DJ Unicode members. From full-stack applications to open-source tools.",
    url: "https://www.djunicode.in/projects",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - Projects",
      },
    ],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DJ Unicode Projects Archive",
    "description": "Explore the innovative projects shipped by DJ Unicode members.",
    "url": "https://www.djunicode.in/projects",
    "about": {
      "@type": "Thing",
      "name": "Student Software Projects"
    }
  };

  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <ProjectsShowcase projects={projects} />
      </Suspense>
    </main>
  );
}
