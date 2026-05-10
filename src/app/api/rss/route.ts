import { getAllBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

const SITE_URL = "https://djunicode.in";
const SITE_TITLE = "DJ Unicode Blog";
const SITE_DESC = "Ideas, culture, and lessons from building software together at DJ Unicode.";

export async function GET() {
  const posts = getAllBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const tags = post.tags.map((t) => `<category>${t}</category>`).join("");
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>contact@djunicode.in (${post.author})</author>
      <pubDate>${pubDate}</pubDate>
      ${tags}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESC}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
