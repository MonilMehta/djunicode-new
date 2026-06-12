"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

interface ContributorProfile {
  name: string;
  github?: string;
  linkedIn?: string;
  profilePic?: string | null;
}

interface ContributorGroup {
  people: ContributorProfile[];
  missingKeys: number[];
  totalKeys: number;
}

interface Project {
  title: string;
  desc: string;
  slug: string;
  coverImage: string | null;
  gallery: string[];
  stack: string[];
  type: string[];
  yearLabel: string | null;
  links?: string[];
  contributorsResolved?: {
    beMentors?: ContributorGroup;
    teMentors?: ContributorGroup;
    seMentees?: ContributorGroup;
  };
}

function parseLinks(links?: string[]) {
  const github = links?.find((l) => l.includes("github.com")) ?? null;
  const live = links?.find((l) => !l.includes("github.com")) ?? null;
  return { github, live };
}

// ── Floating Dock ────────────────────────────────────────────────────────────
function FloatingDock({ project, onClose }: { project: Project; onClose: () => void }) {
  const { github, live } = useMemo(() => parseLinks(project.links), [project.links]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
    >
      {/* Esc / Close */}
      <button
        onClick={onClose}
        className={`flex items-center gap-2 h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs ${spaceMono.className}`}
      >
        <X size={13} />
        <span className="hidden sm:inline">ESC</span>
      </button>

      {github && (
        <>
          <div className="w-px h-5 bg-white/10" />
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 h-10 px-4 rounded-xl hover:bg-white/10 text-white transition-colors text-xs"
          >
            <Github size={15} className="text-white" />
            <span className={`${spaceMono.className} text-white`}>GitHub</span>
          </a>
        </>
      )}

      {live && (
        <>
          <div className="w-px h-5 bg-white/10" />
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 h-10 px-4 rounded-xl hover:bg-white/10 text-white transition-colors text-xs"
          >
            <ExternalLink size={15} className="text-white" />
            <span className={`${spaceMono.className} text-white`}>Live</span>
          </a>
        </>
      )}

    </motion.div>
  );
}



// ── Full-Screen Detail View ──────────────────────────────────────────────────
function ProjectFullScreen({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [zoomedImage, setZoomedImage] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <motion.div
        key="fullscreen-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
      >
        {/* Hero Image — shared element from card */}
        <motion.div
          layoutId={`card-image-${project.slug}`}
          className="relative w-full overflow-hidden"
          style={{ height: "60svh" }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#111]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050505]" />

          {project.yearLabel && (
            <motion.div
              layoutId={`card-badge-${project.slug}`}
              className={`absolute top-6 left-6 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[#77CE90] text-[10px] uppercase tracking-widest font-semibold ${spaceMono.className}`}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              {project.yearLabel}
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-4 md:px-8 pb-40 relative z-10"
        >
          <div className="bg-[#080808] border border-white/5 shadow-2xl rounded-3xl p-6 md:p-12 -mt-24 md:-mt-32 relative overflow-hidden backdrop-blur-xl">
            {/* Subtle glow effect inside the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#77CE90]/5 blur-[100px] pointer-events-none" />

            {project.type && project.type.length > 0 && (
              <p className={`text-white/40 text-[11px] md:text-[12px] uppercase tracking-[0.2em] mb-4 ${spaceMono.className}`}>
                {project.type.join(" · ")}
              </p>
            )}

            <div className="mt-12 md:mt-20 w-full max-w-[800px] flex flex-col gap-12 pb-24">

              {/* Title & Links */}
              <div>
                <motion.h1
                  layoutId={`card-title-${project.slug}`}
                  className="text-white font-bold mb-6 leading-tight"
                  style={{
                    fontFamily: "'Satoshi','Inter',sans-serif",
                    fontSize: "clamp(2rem, 4vw, 4rem)",
                    letterSpacing: "-0.03em",
                  }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  {project.title}
                </motion.h1>
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {project.links.map((link, i) => {
                      const isGit = link.toLowerCase().includes("github.com");
                      return (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-xs font-medium"
                        >
                          {isGit ? <Github size={14} /> : <ExternalLink size={14} />}
                          {isGit ? "GitHub" : "Live Site"}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-2xl">
                {project.desc}
              </p>

              <div className="w-full h-px bg-white/5" />

              {project.stack && project.stack.length > 0 && (
                <div>
                  <p className={`text-white/30 text-[10px] uppercase tracking-[0.2em] mb-12 ${spaceMono.className}`}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/70 text-[11px] uppercase tracking-wide ${spaceMono.className} hover:bg-white/[0.08] hover:text-white transition-colors cursor-default`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.contributorsResolved && (() => {
                const { beMentors, teMentors, seMentees } = project.contributorsResolved;

                const groups = [
                  { label: "BE Mentors", people: beMentors?.people || [] },
                  { label: "TE Mentors", people: teMentors?.people || [] },
                  { label: "SE Mentees", people: seMentees?.people || [] },
                ].filter(g => g.people.length > 0);

                if (groups.length === 0) return null;

                return (
                  <>
                    <div className="w-full h-px bg-white/5" />
                    <div>
                      <p className={`text-white/30 text-[10px] uppercase tracking-[0.2em] mb-6 ${spaceMono.className}`}>
                        Credits
                      </p>
                      <div className="flex flex-col border-y border-white/[0.04] divide-y divide-white/[0.04]">
                        {groups.map((group, groupIdx) => (
                          <div
                            key={groupIdx}
                            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-5"
                          >
                            <div className="md:w-32 shrink-0 pt-1.5">
                              <p
                                className={`text-[12px] uppercase tracking-widest ${spaceMono.className}`}
                                style={{ color: "#ffffff", fontWeight: 700 }}
                              >
                                {group.label}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {group.people.map((person, i) => (
                                <a
                                  key={i}
                                  href={person.linkedIn || person.github || "#"}
                                  target={person.linkedIn || person.github ? "_blank" : undefined}
                                  rel={person.linkedIn || person.github ? "noreferrer" : undefined}
                                  className="flex items-center gap-2.5 bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#141414] hover:border-white/15 transition-all duration-300 p-1.5 pr-4 rounded-full group/person shadow-sm"
                                >
                                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#1f1f1f] flex items-center justify-center border border-white/5">
                                    {person.profilePic ? (
                                      <Image src={person.profilePic} alt={person.name} fill className="object-cover" />
                                    ) : (
                                      <span className="text-white/40 text-[9px] uppercase font-bold">{person.name.charAt(0)}</span>
                                    )}
                                  </div>
                                  <span className="text-white/60 group-hover/person:text-white text-[13px] font-medium transition-colors tracking-tight">
                                    {person.name}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

              {project.gallery && project.gallery.length > 1 && (
                <>
                  <div className="w-full h-px bg-white/5" />
                  <div>
                    <p className={`text-white/30 text-[10px] uppercase tracking-[0.2em] mb-6 ${spaceMono.className}`}>
                      Gallery
                    </p>
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.slice(1).map((img, i) => {
                        const isZoomed = zoomedImage === i;
                        return (
                          <motion.div
                            layout
                            transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                            key={i}
                            onClick={() => setZoomedImage(isZoomed ? null : i)}
                            className={`relative rounded-xl overflow-hidden border cursor-zoom-${isZoomed ? 'out' : 'in'} group ${isZoomed ? "col-span-full h-[50vh] md:h-[70vh] bg-black/50 border-white/10" : "aspect-video bg-white/5 border-white/5"}`}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${i + 2}`}
                              fill
                              className={isZoomed ? "object-contain p-2" : "object-cover transition-transform duration-700 group-hover:scale-105"}
                            />
                            {!isZoomed && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Dock */}
      <AnimatePresence>
        <FloatingDock project={project} onClose={onClose} />
      </AnimatePresence>
    </>
  );
}

// ── Grid Card ────────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onClick,
  isExpanded,
}: {
  project: Project;
  onClick: () => void;
  isExpanded: boolean;
}) {
  return (
    <motion.div
      onClick={isExpanded ? undefined : onClick}
      className={`group rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/15 transition-colors duration-300 w-full h-full flex flex-col ${isExpanded ? "cursor-default" : "cursor-pointer"}`}
      whileHover={isExpanded ? {} : { y: -5 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <motion.div
        layoutId={`card-image-${project.slug}`}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3" }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            <span className="text-white/10 text-xs font-mono uppercase">No Image</span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 text-white">
          <ArrowUpRight size={14} />
        </div>
        {project.yearLabel && (
          <motion.div
            layoutId={`card-badge-${project.slug}`}
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#77CE90] text-[9px] uppercase tracking-widest font-semibold ${spaceMono.className}`}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            {project.yearLabel}
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <motion.h3
          layoutId={`card-title-${project.slug}`}
          className="text-white font-bold text-base mb-1.5 group-hover:text-[#77CE90] transition-colors"
          style={{ fontFamily: "'Satoshi','Inter',sans-serif", letterSpacing: "-0.02em" }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          {project.title}
        </motion.h3>
        <p className="text-white/40 text-sm line-clamp-2 leading-relaxed mb-4">
          {project.desc}
        </p>
        {project.stack && project.stack.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-auto">
            {project.stack.slice(0, 3).map((tag) => (
              <span key={tag} className={`px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[9px] uppercase tracking-wide border border-white/5 ${spaceMono.className}`}>
                {tag}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className={`px-2 py-0.5 rounded-full bg-white/5 text-white/25 text-[9px] border border-white/5 ${spaceMono.className}`}>
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Showcase ────────────────────────────────────────────────────────────
export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  const handleOpen = useCallback((p: Project) => setSelected(p), []);
  const handleClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <LayoutGroup>
      <div className="w-full bg-[#050505] min-h-screen projects-showcase-root">
        {/* Header — matching events/members style */}
        <section className="relative w-full px-6 md:px-[52px] pt-32 pb-16 md:pt-40 md:pb-20">
          <h1
            className="text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] text-[rgba(255,255,255,0.82)]"
          >
            our works
          </h1>
        </section>

        {/* Uniform grid */}
        <section className="px-6 md:px-[52px] pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onClick={() => handleOpen(project)}
                isExpanded={selected?.slug === project.slug}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Full-Screen + Dock */}
      <AnimatePresence>
        {selected && (
          <ProjectFullScreen
            key={selected.slug}
            project={selected}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
