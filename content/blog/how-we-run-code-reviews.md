---
title: "How We Run Code Reviews (And Why Most Clubs Don't)"
slug: "how-we-run-code-reviews"
date: "2025-01-20"
author: "DJ Unicode"
tags: ["culture", "process", "learning"]
excerpt: "Code review is the most underrated teaching tool in software. Here's the system we built over three years and why it matters more than any workshop we've ever run."
coverImage: ""
---

# How We Run Code Reviews (And Why Most Clubs Don't)

The first code review I got at Unicode was brutal. Not mean — just honest. Three comments on my PR before anyone looked at the logic: variable names, unnecessary re-renders, and a missing edge case I'd been wilfully ignoring.

It changed how I wrote code.

## The Basics

Every project at Unicode goes through PR review before it merges. No exceptions. Not even for mentors. This sounds obvious until you've seen how most college projects work — one person commits directly to main, everyone else pulls and prays.

The rules are simple:

1. **No merge without a review** — even if it's just a config change
2. **Review the thinking, not just the code** — ask *why* before asking *what*
3. **Leave at least one genuine question** — not "LGTM", but something you actually want to understand

## The Hard Part

The hard part isn't teaching people to review. It's teaching people to *receive* reviews without getting defensive.

We do a thing called **review standups** — quick 10-minute sessions where someone walks through feedback they got and what they changed. It normalises the process. When everyone sees everyone else's code getting torn apart (kindly), it stops feeling personal.

## What Actually Changes

Students who go through a full project cycle at Unicode write different kinds of commit messages. They think about interfaces before implementation. They write functions that do one thing.

Not because we teach those things in a lecture. Because they've been on both sides of a review and they've *felt* the difference.

---

This is the bet we make: that a slow, feedback-heavy process produces better engineers than any number of fast workshops.

So far, the data agrees.
