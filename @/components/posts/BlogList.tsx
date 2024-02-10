import urlFor from "@/lib/sanity/urlFor";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import DisplayDroneDescription from "../drones/DisplayDroneDescription";

type Props = {
  posts: Post[];
};

function BlogList({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 pb-24 md:gap-y-8 gap-y-4">
      {posts.map((post) => (
        <div className="flex flex-row w-full h-60 drop-shadow-xl">
          <div className="w-1/3">
            <Link href={`/journal/${post.slug.current}`}>
              <Image
                className="w-full h-full "
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                width={"600"}
                height={"600"}
              />
            </Link>
          </div>
          <div className="flex flex-col w-2/3 px-5 mb-2 rounded bg-opacity-5">
            <div>
              {post.categories &&
                post.categories
                  .filter((cat) => cat.title !== "homepage")
                  .filter((cat) => _.has(cat, "name"))
                  .map((category) => (
                    <div
                      className="px-3 py-1 text-sm font-semibold rounded-full w-fit bg-slate-700 text-zinc-100 "
                      key={category._id}
                    >
                      <p>{category.title}</p>
                    </div>
                  ))}
            </div>
            <Link
              className="text-2xl font-bold "
              href={`/journal/${post.slug.current}`}
            >
              {post.title}
            </Link>
            <div className="flex items-center mr-4">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                  className="rounded-full"
                  style={{ display: "inline-block" }}
                />
              )}
              {post.author.name && (
                <span className="m-4">
                  {post.author.name} |{" "}
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <p className="mt-4 text-base text-black content-fit line-clamp-2">
              <DisplayDroneDescription
                description={post.description}
                limit={250}
                showMoreAllowed={false}
              />
            </p>

            {post.relatedDrones && (
              <div className="flex flex-row gap-2 mt-4 text-xs italic text-black">
                mentioning:
                {post.relatedDrones.map((drone) => {
                  return (
                    <div key={drone._id}>
                      <Link className="font-bold" href={`/drones/${drone._id}`}>
                        {drone.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
