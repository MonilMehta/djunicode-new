import { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { BlogPostView } from "./blog-post-view";
import { notFound } from "next/navigation";
import { marked } from "marked";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found | DJ Unicode",
    };
  }
  
  return {
    title: `${post.title} | DJ Unicode Blog`,
    description: post.excerpt || `Read the latest insights from DJ Unicode members on ${post.title}.`,
    openGraph: {
      title: `${post.title} | DJ Unicode Blog`,
      description: post.excerpt || `Read the latest insights from DJ Unicode members on ${post.title}.`,
      url: `https://www.djunicode.in/blog/${slug}`,
      images: [
        {
          url: post.coverImage || "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Parse markdown to HTML server-side
  const html = await marked(post.content, { breaks: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage ? `https://www.djunicode.in${post.coverImage}` : "https://www.djunicode.in/opengraph-image.png",
    "datePublished": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "DJ Unicode Member"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DJ Unicode",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.djunicode.in/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView post={{ ...post, content: html }} />
    </>
  );
}
