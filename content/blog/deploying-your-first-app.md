---
title: "Deploying Your First App — A Survival Guide"
slug: "deploying-your-first-app"
date: "2024-11-05"
author: "DJ Unicode"
tags: ["devops", "beginners", "deployment"]
excerpt: "localhost:3000 is not a product. Here's everything we wish someone had told us about getting code off your laptop and onto the internet."
coverImage: ""
---

# Deploying Your First App — A Survival Guide

The gap between `npm run dev` and a real live link is the gap between a hobby and a product. It's also where most college projects go to die.

This is the guide we give every new batch at Unicode.

## Step 0: What Are You Even Deploying?

Before you touch a server, answer these:

- Is this a **static site** (HTML/CSS/JS, no backend)? → Vercel or Netlify, done in 5 minutes.
- Does it have a **backend with a database**? → You need to think about this more carefully.
- Is the database something a stranger's data will live in? → Please read about environment variables first.

## The Vercel Path (Easiest)

If you're using Next.js, React, or any modern frontend framework, Vercel is the answer. Connect your GitHub repo, it builds and deploys on every push. That's it.

```bash
npm i -g vercel
vercel
```

You get a live URL, preview deploys on every PR, and it scales automatically. For a college project, this is almost always enough.

## The "Oh No, I Have A Database" Path

This is where it gets real. A few things you need to handle:

**Environment variables** — never commit your database URL or API keys to Git. Ever. Use `.env.local` locally and set them in your hosting dashboard.

**Connection limits** — if you're using a Postgres database on a free tier, you have maybe 5 concurrent connections. If you're using an ORM that opens a connection per request, you'll hit this limit fast. Use connection pooling.

**Migrations** — your local schema and your production schema will drift if you're not careful. Use a migration tool from day one.

## The Things That Will Catch You

- CORS errors when your frontend is on Vercel and your backend is somewhere else
- `NODE_ENV` not being set to `production` on your server
- Forgetting that your `public/` folder doesn't get served automatically on Express
- Build succeeding locally, failing in CI because you committed a file you shouldn't have

Every one of these has caused a 2 AM debugging session for someone in this club.

---

Deployment is a skill. It gets easier. Start simple and add complexity only when you need it.
