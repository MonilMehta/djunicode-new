import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogListing } from "./blog-listing";

export const metadata: Metadata = {
  title: "Blog | DJ Unicode",
  description: "Ideas, lessons, and notes from building software together at DJ Unicode. Read articles by our student developers and designers.",
  openGraph: {
    title: "Blog | DJ Unicode",
    description: "Ideas, lessons, and notes from building software together at DJ Unicode.",
    url: "https://www.djunicode.in/blog",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - Blog",
      },
    ],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "DJ Unicode Blog",
    "description": "Ideas, lessons, and notes from building software together at DJ Unicode.",
    "url": "https://www.djunicode.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "DJ Unicode"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListing posts={posts} />
    </>
  );
}
