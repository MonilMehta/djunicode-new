# DJ Unicode Website Migration Spec

## Goal

Build the redesigned DJ Unicode website in this separate Next.js app while using the Gatsby site in the parent repo as the source of truth for content, routes, and media.

## Existing Site Inventory

### Current top-level routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/events`
- `/events/[slug]`
- `/contact`
- `/404`

### Content sources

- `content/data/projects/*.json`: 19 project detail records
- `content/data/events/*.json`: 4 event detail records
- `content/data/profile/profile.json`: 153 member profile records used for project/event contributors
- `content/data/alumni/alumni.json`: 4 founder testimonials
- `content/data/faculty/faculty.json`: 1 faculty testimonial
- `content/data/about/about.json`: 7 tech stack icons/titles
- `content/data/projects_featured/featuredProjects.json`: featured project titles for the homepage
- `public/images/**`: migrated static assets from the Gatsby site

## Page Requirements

### Home

Required sections from the current site:

- Hero / club intro
- Upcoming event highlight
- Founders / alumni testimonials
- Faculty testimonial
- Featured projects
- Tech stacks

Recommended additions in the redesign:

- Club metrics / proof points
- Recent project archive preview
- Strong CTA paths to projects, events, and contact

### Projects Index

Required:

- Full project archive
- Project cards with cover image, title, short description, and link to detail page
- Sort newest to oldest using the `year` field

### Project Detail

Required:

- Title
- Cover image + gallery
- Project description
- Tech stack list
- Related links
- Contributor groups:
  - BE Mentors
  - TE Mentors
  - SE Mentees

### Events Index

Required:

- Full event archive
- Event cards with image, title, short description, and link to detail page

### Event Detail

Required:

- Title
- Event gallery
- Event description
- Related links
- Contributor groups:
  - Guests
  - TE Mentors
  - SE Mentees

### Contact

Required:

- Contact information block:
  - Email
  - Phone
  - Campus address
  - Embedded map or location treatment
- Contact form:
  - Name
  - Email
  - Message

## Migration Rules

- Preserve all existing project and event slugs.
- Keep the site static-content friendly: content should come from the copied JSON files in this app.
- Convert legacy relative image paths like `../../images/...` to Next-friendly public paths under `/images/...`.
- Keep contributor relationships intact by resolving profile keys from `profile.json`.
- Replace the Gatsby contact form implementation with a Next-compatible request flow.
- Carry over social links and key contact details from the existing footer/contact page.

## Known Data Notes

- The old homepage "Upcoming Events" block is hardcoded to Celestia 2.0 rather than driven by the event JSON archive.
- Event records do not currently include a dedicated date field; ordering will need inference or a new explicit field later.
- The current contact submission flow posts to a Google Apps Script endpoint and should remain environment-configurable.

## New App Deliverables

- Redesigned Next.js application shell
- New homepage, projects, project detail, events, event detail, contact, and not-found routes
- Shared content utilities for reading local JSON
- Migrated image assets in `public/images`
- `spec.md` maintained as the migration checklist for this repo
