import BlogHome from "@/components/posts/BlogHome";
import { getPostCategories, getPosts } from "@/lib/sanity/sanity.util";

import React from "react";

export const revalidate = 60;

export default async function HomePage() {
  const categories: Category[] = await getPostCategories();
  const posts: Post[] = await getPosts();

  return <BlogHome posts={posts} categories={categories} />;
}
