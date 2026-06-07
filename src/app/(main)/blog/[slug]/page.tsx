import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { BlogPostView } from "./blog-post-view";
import { notFound } from "next/navigation";
import { marked } from "marked";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — DJ Unicode Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Parse markdown to HTML server-side
  const html = await marked(post.content, { breaks: true });

  return <BlogPostView post={{ ...post, content: html }} />;
}
