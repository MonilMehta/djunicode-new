import fs from "node:fs";
import path from "node:path";

const dataRoot = path.join(process.cwd(), "content", "data");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(dataRoot, relativePath), "utf8"));
}

function readCollection(relativeDir) {
  const directory = path.join(dataRoot, relativeDir);

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right))
    .map((file) => readJson(path.join(relativeDir, file)));
}

function toAssetPath(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  return value.replace(/\\/g, "/").replace(/^(\.\.\/)+images\//, "/images/");
}

function formatDateLabel(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function inferEventYear(event) {
  const combinedText = `${event.title ?? ""} ${event.description ?? ""}`;
  const match = combinedText.match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : 0;
}

let profileMapCache;
let projectsCache;
let eventsCache;

function getProfileMap() {
  if (profileMapCache) {
    return profileMapCache;
  }

  profileMapCache = new Map(
    readJson(path.join("profile", "profile.json")).map((profile) => [
      profile.key,
      {
        ...profile,
        github: profile.GitHub,
        linkedIn: profile.LinkedIn,
        profilePic: toAssetPath(profile.profile_pic),
      },
    ])
  );

  return profileMapCache;
}

function resolveContributorGroup(keys = []) {
  const profileMap = getProfileMap();
  const people = [];
  const missingKeys = [];

  keys.forEach((key) => {
    const profile = profileMap.get(key);

    if (profile) {
      people.push(profile);
      return;
    }

    missingKeys.push(key);
  });

  return {
    people,
    missingKeys,
    totalKeys: keys.length,
  };
}

export function getAllProjects() {
  if (projectsCache) {
    return projectsCache;
  }

  projectsCache = readCollection("projects")
    .map((project) => ({
      ...project,
      coverImage: toAssetPath(project.img_cover),
      gallery: [project.img_cover, ...(project.img ?? [])]
        .map(toAssetPath)
        .filter(Boolean),
      stack: (project.stack ?? []).map((item) => item.trim()).filter(Boolean),
      type: (project.tech ?? []).map((item) => item.trim()).filter(Boolean),
      yearLabel: formatDateLabel(project.year),
      contributorsResolved: {
        beMentors: resolveContributorGroup(project.contributors?.BEmentors),
        teMentors: resolveContributorGroup(project.contributors?.TEmentors),
        seMentees: resolveContributorGroup(project.contributors?.SEmentees),
      },
    }))
    .sort(
      (left, right) =>
        new Date(right.year).getTime() - new Date(left.year).getTime()
    );

  return projectsCache;
}

export function getProjectSlugs() {
  return getAllProjects().map((project) => project.slug);
}

export function getProjectBySlug(slug) {
  return getAllProjects().find((project) => project.slug === slug) ?? null;
}

export function getAllEvents() {
  if (eventsCache) {
    return eventsCache;
  }

  eventsCache = readCollection("events")
    .map((event) => {
      const inferredYear = inferEventYear(event);

      return {
        ...event,
        inferredYear,
        yearLabel: inferredYear ? String(inferredYear) : "Archive",
        gallery: (event.images ?? []).map(toAssetPath).filter(Boolean),
        contributorsResolved: {
          guests: resolveContributorGroup(event.contributors?.Externals),
          teMentors: resolveContributorGroup(event.contributors?.TEmentors),
          seMentees: resolveContributorGroup(event.contributors?.SEmentees),
        },
      };
    })
    .sort((left, right) => right.inferredYear - left.inferredYear);

  return eventsCache;
}

export function getEventSlugs() {
  return getAllEvents().map((event) => event.slug);
}

export function getEventBySlug(slug) {
  return getAllEvents().find((event) => event.slug === slug) ?? null;
}

export function getUpcomingEvent() {
  return getAllEvents()[0] ?? null;
}

export function getFeaturedProjects() {
  const featuredTitles = readJson(
    path.join("projects_featured", "featuredProjects.json")
  )[0]?.index;
  const projectMap = new Map(
    getAllProjects().map((project) => [project.title, project])
  );

  return (featuredTitles ?? [])
    .map((title) => projectMap.get(title))
    .filter(Boolean);
}

export function getTechStacks() {
  return readJson(path.join("about", "about.json")).map((item) => ({
    ...item,
    image: toAssetPath(item.image),
  }));
}

export function getAlumniTestimonials() {
  return readJson(path.join("alumni", "alumni.json")).map((item) => ({
    ...item,
    pic: toAssetPath(item.pic),
  }));
}

export function getFacultyTestimonials() {
  return readJson(path.join("faculty", "faculty.json")).map((item) => ({
    ...item,
    pic: toAssetPath(item.pic),
  }));
}

export function getSiteStats() {
  const projects = getAllProjects();
  const events = getAllEvents();
  const startYear = Math.min(
    ...projects
      .map((project) => new Date(project.year).getFullYear())
      .filter((value) => !Number.isNaN(value))
  );

  return [
    {
      label: "Projects shipped",
      value: `${projects.length}+`,
    },
    {
      label: "Event archive",
      value: `${events.length}`,
    },
    {
      label: "Member profiles",
      value: `${getProfileMap().size}`,
    },
    {
      label: "Years of building",
      value: `${new Date().getFullYear() - startYear}`,
    },
  ];
}

export function getContactDetails() {
  return {
    email: "djsceunicode@gmail.com",
    phone: "+91 99202 57681",
    phoneHref: "tel:+919920257681",
    emailHref: "mailto:djsceunicode@gmail.com",
    address: "Dwarkadas J. Sanghvi College of Engineering, Vile Parle, Mumbai 400056",
    mapEmbed:
      "https://www.google.com/maps?q=Dwarkadas%20J.%20Sanghvi%20College%20of%20Engineering&z=15&output=embed",
    socialLinks: [
      {
        label: "GitHub",
        href: "https://github.com/djunicode",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/djunicode/about/",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/djunicode?s=08",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/djunicode/",
      },
    ],
  };
}
