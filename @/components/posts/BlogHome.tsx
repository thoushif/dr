"use client";
import { client } from "@/lib/sanity/sanity.client";
import { groq } from "next-sanity";
import React, { useState } from "react";
import BlogList from "./BlogList";

const BlogHome = ({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(); // State to track selected category
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts); // State to store filtered posts

  const handleCategoryClick = async (category: Category) => {
    if (category.title.toLowerCase() === "all".toLowerCase()) {
      setFilteredPosts(posts);
    } else {
      setSelectedCategory(category);

      // Modify the query based on the selected category
      const filteredQuery = groq`
      *[_type == "post"  && "${category._id}" in  categories[]->._id] {
        ...,
        author->,
        categories[]->,
      } | order(_createdAt desc)
    `;
      // Fetch the filtered posts
      const filteredPosts = await client.fetch(filteredQuery);
      setFilteredPosts(filteredPosts);
    }
  };

  return (
    <div className="m-6">
      <div className="flex flex-col items-center md:flex-row gap-y-2 md:gap-x-2">
        {categories &&
          categories
            .filter((category) => category.title !== "homepage")
            .map((category) => (
              <div
                key={category._id}
                className={`px-3 py-1 text-sm font-semibold text-center rounded-full text-zinc-200 bg-slate-700 ${
                  selectedCategory?.title === category.title
                    ? "bg-slate-900"
                    : "bg-slate-400"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <p>{category.title}</p>
              </div>
            ))}
      </div>
      <BlogList posts={filteredPosts} />
    </div>
  );
};

export default BlogHome;
