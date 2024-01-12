import { client } from "@/lib/sanity/sanity.client";
import { groq } from "next-sanity";
import React from "react";
import BlogList from "./BlogList";
const query = groq`
*[_type == "post" && ("news" in categories[] || "homepage" in categories[])] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc) [0]
`;

export const revalidate = 60;
const HomepageBlog = async () => {
  const post = await client.fetch(query);
  const posts = Array(post);
  return <BlogList posts={posts} />;
};

export default HomepageBlog;
