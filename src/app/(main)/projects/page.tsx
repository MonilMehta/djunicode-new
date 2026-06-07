import { getAllProjects } from "@/lib/content";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";

export const metadata = {
  title: "Projects Archive",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <ProjectsShowcase projects={projects} />
  );
}
