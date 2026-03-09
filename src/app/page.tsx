import Link from "next/link";
import PrismClientWrapper from "@/components/prism/PrismClientWrapper";
import { HorizontalNarrativeScroll } from "@/components/home/horizontal-narrative-scroll";
import { FoundersSection } from "@/components/home/founders-section";
import { FacultySection } from "@/components/home/faculty-section";
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllProjects,
  getAlumniTestimonials,
  getFacultyTestimonials,
  getFeaturedProjects,
  getSiteStats,
  getTechStacks,
  getUpcomingEvent,
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
  const upcomingEvent = getUpcomingEvent();
  const recentProjects = getAllProjects().slice(0, 6);
  const alumni = getAlumniTestimonials();
  const faculty = getFacultyTestimonials();
  const stacks = getTechStacks();

  return (
    <>
      <section className="relative w-full h-screen">
        <PrismClientWrapper />
      </section>

      <HorizontalNarrativeScroll />

      <FoundersSection founders={alumni} />
      <FacultySection faculty={faculty} />
      <UpcomingEventsSection event={upcomingEvent} />
      <FeaturedProjectsSection projects={recentProjects.slice(0, 3)} />
    </>
  );
}
