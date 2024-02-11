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
        relatedDrones[]->{
          _id,
          "name":aircraft.name
        }
      } | order(_createdAt desc)
    `;
      // Fetch the filtered posts
      const filteredPosts = await client.fetch(filteredQuery);
      setFilteredPosts(filteredPosts);
    }
  };

  return (
    <div className="m-6">
      <BlogList posts={filteredPosts} />
    </div>
  );
};

export default BlogHome;
