import { getAllProjects } from "@/lib/content";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";

export const metadata = {
  title: "Projects Archive",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <ProjectsShowcase projects={projects} />
    </main>
  );
}
