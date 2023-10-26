import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import urlFor from "../lib/urlFor";

type Props = {
  drones: DrType[];
};

function dronesCategoryList({ drones }: Props) {
  return (
    <div>
      <hr className="border-[#f7ab0a] mb-10" />

      <div className="grid grid-cols-1 gap-6 px-8 pb-24 md:grid-cols-3 gap-y-6">
        {drones.map((dr) => (
          <div key={dr._id} className="flex flex-col cursor-pointer group">
            <div className="relative w-full h-40 transition-transform duration-200 ease-out dronesop-shadow-xl group-hover:scale-105">
              <Image
                className="object-cover object-left rounded-md lg:object-center"
                src={urlFor(dr.drone_image.image).url()}
                alt={dr.name}
                fill
              />

              <div className="absolute bottom-0 flex items-center justify-between w-full p-3 text-white bg-black rounded bg-opacity-20 backdronesop-blur-lg dronesop-shadow-lg ">
                <div>
                  <p className="font-bold">{dr.name}</p>
                  {/* <p className="font-bold">{dr.drone_image.image.asset}</p> */}
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

            {/* <p className="flex items-center mt-5 font-bold group-hover:underline">
              Show more details <ArrowUpRightIcon className="w-4 h-4 ml-2" />
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default dronesCategoryList;
