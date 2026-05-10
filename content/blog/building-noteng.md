---
title: "Building Noteng — A Collaborative Note-Taking App"
slug: "building-noteng"
date: "2025-03-12"
author: "DJ Unicode"
tags: ["react", "firebase", "collaboration"]
excerpt: "How we took a late-night idea to a live product in one semester — the architecture decisions, the hard parts, and what we learned shipping our first real-time app."
coverImage: "/images/groupPhotos/oc.png"
---

# Building Noteng — A Collaborative Note-Taking App

Every semester the question is the same: *"Wait, what did sir say about that sorting algorithm?"*. Notes get lost in WhatsApp chats. Someone screenshots the board but it's blurry. Someone else has a perfect handout but only shares it three hours before the exam.

Noteng started as a rant in a 2 AM commit message and ended up being one of our most-used internal projects.

## The Problem

College note-sharing is broken in a very specific way. It's not that students don't want to share — they do. It's that there's no good *place* to do it. Google Drive folders get disorganised. WhatsApp groups get noisy. Notion is too heavy for casual sharing.

We wanted something with zero friction: open the link, see the notes, done.

## Architecture Decisions

We chose **React** for the frontend and **Firebase** for the backend — not because it was the most interesting stack, but because it let us move fast and deploy instantly. The real-time sync came for free with Firestore.

```javascript
const notesRef = collection(db, "courses", courseId, "notes");
const q = query(notesRef, orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  setNotes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
});
```

The hardest part wasn't the tech — it was the **access model**. Who can edit? Who can just view? We went through three different permission models before landing on something that felt right.

## What We Learned

Shipping is humbling. The first version had a bug where notes would duplicate themselves on every refresh. We found it two hours before a demo and fixed it in the worst possible way (localStorage as a dedup cache). It held up.

The real lesson: **done is better than perfect**, especially when your users are your friends who will roast you mercilessly if it breaks.

---

If you want to dig into the code, the repository is open. PRs welcome.
