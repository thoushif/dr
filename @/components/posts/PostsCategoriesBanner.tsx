"use client";
import { getPostCategories } from "@/lib/sanity/sanity.util";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";

const PostsCategoriesBanner = () => {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const loadCategories = async () => {
      const categories: Category[] = await getPostCategories();
      setCategories(categories);
    };

    loadCategories();
  }, []);

  return (
    <>
      <div
        className={cn(
          " flex  items-center justify-center py-4  gap-6 bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase text-slate-900",
          roboto_mono.className
        )}
      >
        {categories &&
          categories
            .filter((category) => category.title !== "homepage")
            .map((category) => (
              <div
                key={category._id}
                // onClick={() => handleCategoryClick(category)}
              >
                <p>{category.title.toLocaleUpperCase()}</p>
              </div>
            ))}
      </div>
    </>
  );
};

export default PostsCategoriesBanner;
