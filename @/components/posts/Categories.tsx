import { getPostCategories } from "@/lib/sanity/sanity.util";
import React from "react";

const Categories = async () => {
  const categories: Category[] = await getPostCategories();
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row gap-y-2 md:gap-x-2">
        {categories &&
          categories
            .filter((category) => category.title !== "homepage")
            .map((category) => (
              <div
                className="px-3 py-1 text-sm font-semibold text-center rounded-full text-zinc-200 bg-slate-700"
                key={category._id}
              >
                <p>{category.title}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categories;
