import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  content: string;
  readingTime: number;
}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? filename.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        author: data.author ?? "DJ Unicode",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage ?? "",
        content,
        readingTime: calcReadingTime(content),
      } satisfies BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find((p) => p.slug === slug) ?? null;
}
