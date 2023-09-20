import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import urlFor from "../lib/urlFor";

type Props = {
  dr1: DrType[];
};

function Dr1CategoryList({ dr1 }: Props) {
  return (
    <div>
      <hr className="border-[#f7ab0a] mb-10" />

      <div className="grid grid-cols-1 gap-10 px-10 pb-24 md:grid-cols-2 gap-y-16">
        {dr1.map((dr) => (
            <div key={dr._id} className="flex flex-col cursor-pointer group">
              <div className="relative w-full transition-transform duration-200 ease-out h-80 dr1op-shadow-xl group-hover:scale-105">
                {/* <Image
                  className="object-cover object-left lg:object-center"
                  src={urlFor(dr.image).url()}
                  alt={dr.name}
                  fill
                /> */}
                <div className="absolute bottom-0 flex items-center justify-between w-full p-5 text-white bg-black rounded bg-opacity-20 backdr1op-blur-lg dr1op-shadow-lg ">
                  <div>
                    <p className="font-bold">{dr.name}</p>
                    <p>
                      {new Date(dr._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

             
              <p className="flex items-center mt-5 font-bold group-hover:underline">
                Show more details <ArrowUpRightIcon className="w-4 h-4 ml-2" />
              </p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Dr1CategoryList;
