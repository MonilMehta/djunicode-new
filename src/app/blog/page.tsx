import { getAllBlogPosts } from "@/lib/blog";
import { BlogListing } from "./blog-listing";

export const metadata = {
  title: "Blog — DJ Unicode",
  description: "Ideas, lessons, and notes from building software together at DJ Unicode.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return <BlogListing posts={posts} />;
}
