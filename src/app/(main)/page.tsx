import Link from "next/link";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HorizontalNarrativeScroll } from "@/components/home/horizontal-narrative-scroll";
import { Preloader } from "@/components/home/preloader";
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

export const metadata: Metadata = {
  title: "DJ Unicode | Coding Club of D.J. Sanghvi College of Engineering",
  description:
    "DJ Unicode is the official technical committee of Dwarkadas J. Sanghvi College of Engineering. We are a community of developers, designers, innovators, and problem solvers united by a shared passion for building impactful solutions.",
  keywords: [
    "DJ Unicode",
    "DJSCE coding club",
    "programming community",
    "Dwarkadas J. Sanghvi College of Engineering",
    "student developers",
    "open source Mumbai",
    "tech club Mumbai",
    "hackathons",
    "technical committee",
  ],
  alternates: {
    canonical: "https://www.djunicode.in",
  },
  openGraph: {
    title: "DJ Unicode | Coding Club of DJSCE",
    description:
      "Join DJ Unicode, the official coding club of DJSCE. We are a community united by a shared passion for building impactful solutions.",
    url: "https://www.djunicode.in",
    siteName: "DJ Unicode",
    images: [
      {
        url: "/opengraph-image.png", // Assuming this exists or falls back to standard
        width: 1200,
        height: 630,
        alt: "DJ Unicode - DJSCE Coding Club",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  const stats = getSiteStats();
  const featuredProjects = getFeaturedProjects();
  const upcomingEvent = getUpcomingEvent();
  const recentProjects = getAllProjects().slice(0, 6);
  const alumni = getAlumniTestimonials();
  const faculty = getFacultyTestimonials();
  const stacks = getTechStacks();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DJ Unicode",
    "url": "https://www.djunicode.in",
    "logo": "https://www.djunicode.in/logo.png",
    "description": "The official technical committee of Dwarkadas J. Sanghvi College of Engineering, built by students who love to create, collaborate, and push the boundaries of technology.",
    "sameAs": [
      "https://github.com/djunicode",
      "https://www.linkedin.com/company/djunicode/",
      "https://www.instagram.com/djunicode/"
    ]
  };

  return (
    <Preloader>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      <HorizontalNarrativeScroll />

      <FoundersSection founders={alumni} />
      <FacultySection faculty={faculty} />
      <UpcomingEventsSection event={upcomingEvent} />
      <FeaturedProjectsSection projects={recentProjects.slice(0, 3)} />
    </Preloader>
  );
}
